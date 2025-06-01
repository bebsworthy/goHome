import { Hono } from 'hono';
import { z } from 'zod';
import { Prisma, PrismaClient, type Event as DbEvent } from './generated/prisma/client.js';
import { dateRangeSchema, CreateEventInputSchema } from './validator.js';
import { writeFile, mkdir, readFile, rm, unlink, rmdir } from 'fs/promises';
import { dirname, join } from 'path';
import config from './config.js';
import { imageApi } from './image-api.js';
import stringSimilarity from 'string-similarity';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const app = new Hono();
const prisma = new PrismaClient();

const SIMILARITY_THRESHOLD = 0.8; // Jaro-Winkler similarity threshold

interface PotentialDuplicate {
  id: number;
  similarityScore: number;
}

// Helper function to normalize text for comparison
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Check if date arrays overlap
function datesOverlap(dates1: Date[], dates2: Date[]): boolean {
  const start1 = Math.min(...dates1.map(d => d.getTime()));
  const end1 = Math.max(...dates1.map(d => d.getTime()));
  const start2 = Math.min(...dates2.map(d => d.getTime()));
  const end2 = Math.max(...dates2.map(d => d.getTime()));
  
  return start1 <= end2 && end1 >= start2;
}

// Find potential duplicates for an event
async function findPotentialDuplicates(event: any): Promise<PotentialDuplicate[]> {
  // Find events in the same city with overlapping dates
  const candidateEvents = await prisma.event.findMany({
    where: {
      city: event.city,
      dates: {
        hasSome: event.dates
      }
    }
  });

  const potentialDuplicates: PotentialDuplicate[] = [];

  for (const candidate of candidateEvents) {
    // Skip if it's the same event
    if (candidate.id === event.id) continue;

    // Check if dates overlap
    if (!datesOverlap(candidate.dates, event.dates)) continue;

    // Calculate title similarity
    const similarity = stringSimilarity.compareTwoStrings(
      normalizeText(event.title),
      normalizeText(candidate.title)
    );

    if (similarity >= SIMILARITY_THRESHOLD) {
      potentialDuplicates.push({
        id: candidate.id,
        similarityScore: similarity
      });
    }
  }

  return potentialDuplicates.sort((a, b) => b.similarityScore - a.similarityScore);
}

// Mount the image API routes
app.route('/', imageApi);

// Format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const EventIncludeDuplicates = {
  duplicates: {
    select: {
      id: true,
    }
  }
};
export type DbEventWithDuplicatesId = Prisma.EventGetPayload<{ include: typeof EventIncludeDuplicates }>

// Format event response by converting dates to YYYY-MM-DD format
const formatEventResponse = (event: DbEventWithDuplicatesId) => {
  return {
    ...event,
    dates: event.dates.map((d: Date) => formatDate(d)),
    startTime: event.startTime || undefined,
    endTime: event.endTime || undefined,
    city: event.city || undefined,
    description: event.description || undefined,
    duplicateOfId: event.duplicateOfId || null
  };
}

export type EventResponse = ReturnType<typeof formatEventResponse>;

// Get events within a date range
app.get('/events', async (c) => {
  try {
    const { start, end } = dateRangeSchema.parse({
      start: c.req.query('start'),
      end: c.req.query('end'),
    });

    const startDate = new Date(start);
    const endDate = new Date(end);

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return c.json({ error: 'Invalid date format' }, 400);
    }

    // Validate that end date is after start date
    if (endDate < startDate) {
      return c.json({ error: 'End date must be after start date' }, 400);
    }

    const events = await prisma.event.findMany({
      where: {
        dates: {
          hasSome: Array.from(
            { length: (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1 },
            (_, i) => new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24))
          )
        }
      },
      orderBy: {
        dates: 'asc'
      },
      include: EventIncludeDuplicates
    });

    return c.json({
      events: events.map(formatEventResponse),
      count: events.length,
      dateRange: { start, end }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error('Error fetching events:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get a single event by ID
app.get('/events/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid event ID' }, 400);
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: EventIncludeDuplicates
    });

    if (!event) {
      return c.json({ error: 'Event not found' }, 404);
    }

    return c.json(formatEventResponse(event));
  } catch (error) {
    console.error('Error fetching event:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});


// Create a new event
app.post('/events', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = CreateEventInputSchema.parse(body);
    
    // Convert string dates to Date objects and ensure they are valid
    const eventDates = validatedData.dates.map(date => {
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        throw new Error(`Invalid date: ${date}`);
      }
      return d;
    });
    
    // Check for potential duplicates before creating
    const potentialDuplicates = await findPotentialDuplicates({
      ...validatedData,
      dates: eventDates
    });

    // Create the event with duplicate information if found
    const event = await prisma.event.create({
      data: {
        ...validatedData,
        dates: eventDates,
        ...(potentialDuplicates.length > 0 && {
          duplicateOfId: potentialDuplicates[0].id,
          similarityScore: potentialDuplicates[0].similarityScore
        })
      },
      include: EventIncludeDuplicates
    });
    
    // If there are potential duplicates, include them in the response
    // @TODO: This code is a mess
    const response = formatEventResponse(event)

    return c.json(response, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    console.error('Error creating event:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update an event
app.put('/events/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid event ID' }, 400);
    }

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({ where: { id } });
    if (!existingEvent) {
      return c.json({ error: 'Event not found' }, 404);
    }

    const body = await c.req.json();
    const validatedData = CreateEventInputSchema.parse(body);
    
    // Convert and validate dates
    const eventDates = validatedData.dates.map(date => {
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        throw new Error(`Invalid date: ${date}`);
      }
      return d;
    });
    
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...validatedData,
        dates: eventDates,
      },
      include: EventIncludeDuplicates
    });
    
    return c.json(formatEventResponse(updatedEvent));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    console.error('Error updating event:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// DELETE /events/:id - Delete an event
app.delete('/events/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid event ID' }, 400);
    }

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({ where: { id } });
    if (!existingEvent) {
      return c.json({ error: 'Event not found' }, 404);
    }

    // Delete event's images directory if it exists
    if (existingEvent.images?.length) {
      const imageDir = join(config.dataPath, 'images', id.toString());
      try {
        await rm(imageDir, { recursive: true });
      } catch (error) {
        console.error('Error deleting image directory:', error);
        // Continue even if image deletion fails - we still want to delete the event
      }
    }

    // Delete the event from database
    await prisma.event.delete({ where: { id } });
    return c.json({ message: 'Event deleted successfully' }, 200);
  } catch (error) {
    console.error('Error deleting event:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Handle image upload for event creation
app.post('/events/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: 'File must be an image' }, 400);
    }

    // Create unique filename using timestamp
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const inputPath = config.imageInputPath(filename);

    // Ensure directory exists
    await mkdir(dirname(inputPath), { recursive: true });

    // Convert File to Buffer and save it
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(inputPath, buffer);

    console.log(`Image uploaded successfully: ${inputPath}`);

    return c.json({ 
      message: 'Image uploaded successfully. The event will be created shortly.',
      filename 
    }, 202);
  } catch (error) {
    console.error('Error handling image upload:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Validate image mime type
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Add image to event endpoint
app.post('/events/:id/image', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid event ID' }, 400);
    }

    // Check if event exists
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return c.json({ error: 'Event not found' }, 404);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return c.json({ 
        error: 'Invalid file type. Only JPEG, PNG and WebP images are allowed.' 
      }, 400);
    }

    // Create a unique filename with UUID while preserving the extension
    const ext = file.name.substring(file.name.lastIndexOf('.'));
    const filename = `${uuidv4()}${ext}`;
    
    // Create the event's image directory if it doesn't exist
    const eventImageDir = join(config.dataPath, 'images', id.toString());
    await mkdir(eventImageDir, { recursive: true });
    
    // Save the file
    const imagePath = join(eventImageDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(imagePath, buffer);

    // Update the event's images array
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        images: {
          push: filename
        }
      },
      include: EventIncludeDuplicates
    });

    return c.json({ 
      message: 'Image uploaded successfully',
      event: formatEventResponse(updatedEvent)
    }, 200);
  } catch (error) {
    console.error('Error uploading image:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Serve event images
app.get('/events/:id/images/:filename', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const filename = c.req.param('filename');

    if (isNaN(id)) {
      return c.json({ error: 'Invalid event ID' }, 400);
    }

    // Check if event exists and is the owner of the image
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return c.json({ error: 'Event not found' }, 404);
    }

    if (!event.images?.includes(filename)) {
      return c.json({ error: 'Image not found' }, 404);
    }

    // Construct the image path
    const imagePath = join(config.dataPath, 'images', id.toString(), filename);

    // Set content type based on file extension
    const ext = filename.toLowerCase().split('.').pop() || '';
    const contentType = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'webp': 'image/webp'
    }[ext];

    if (!contentType) {
      return c.json({ error: 'Invalid image format' }, 400);
    }

    try {
      const buffer = await readFile(imagePath);
      return new Response(buffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    } catch (error) {
      console.error('Error reading image file:', error);
      return c.json({ error: 'Image file not found' }, 404);
    }
  } catch (error) {
    console.error('Error serving image:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete an image from an event
app.delete('/events/:id/images/:filename', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const filename = c.req.param('filename');

    if (isNaN(id)) {
      return c.json({ error: 'Invalid event ID' }, 400);
    }

    // Check if event exists and has the image
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return c.json({ error: 'Event not found' }, 404);
    }

    if (!event.images?.includes(filename)) {
      return c.json({ error: 'Image not found' }, 404);
    }

    // Remove image file from disk
    const imagePath = join(config.dataPath, 'images', id.toString(), filename);
    try {
      await unlink(imagePath);
    } catch (error) {
      console.error('Error deleting image file:', error);
      // Continue even if file deletion fails - we still want to update the DB
    }

    // Update event in database to remove image reference
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        images: {
          set: event.images.filter(img => img !== filename)
        }
      },
      include: EventIncludeDuplicates
    });

    return c.json({ 
      message: 'Image deleted successfully',
      event: formatEventResponse(updatedEvent)
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Handle URL-based event creation (stub)
app.post('/events/by-url', async (c) => {
  try {
    const body = await c.req.json();
    const url = body.url;
    
    if (!url) {
      return c.json({ error: 'No URL provided' }, 400);
    }

    // For now, just create a stub event with the URL as title
    // TODO: Implement proper URL parsing and event extraction
    const stubEvent = await prisma.event.create({
      data: {
        title: `Event from: ${url}`,
        dates: [new Date()], // Today's date as placeholder
        location: 'To be determined',
        description: `Shared from URL: ${url}\n\nThis event was automatically created from a shared URL. Please edit to add correct details.`,
      },
      include: EventIncludeDuplicates
    });

    return c.json({ 
      message: 'Event created from URL. Please edit to add correct details.',
      event: formatEventResponse(stubEvent)
    }, 201);
  } catch (error) {
    console.error('Error creating event from URL:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export { app };
