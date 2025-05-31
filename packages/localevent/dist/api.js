import { Hono } from 'hono';
import { z } from 'zod';
import { PrismaClient } from './generated/prisma/client.js';
import { dateRangeSchema, eventSchema } from './validator.js';
import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import config from './config.js';
import { imageApi } from './image-api.js';
import stringSimilarity from 'string-similarity';
const app = new Hono();
const prisma = new PrismaClient();
const SIMILARITY_THRESHOLD = 0.8; // Jaro-Winkler similarity threshold
// Helper function to normalize text for comparison
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}
// Check if date arrays overlap
function datesOverlap(dates1, dates2) {
    const start1 = Math.min(...dates1.map(d => d.getTime()));
    const end1 = Math.max(...dates1.map(d => d.getTime()));
    const start2 = Math.min(...dates2.map(d => d.getTime()));
    const end2 = Math.max(...dates2.map(d => d.getTime()));
    return start1 <= end2 && end1 >= start2;
}
// Find potential duplicates for an event
async function findPotentialDuplicates(event) {
    // Find events in the same city with overlapping dates
    const candidateEvents = await prisma.event.findMany({
        where: {
            city: event.city,
            dates: {
                hasSome: event.dates
            }
        }
    });
    const potentialDuplicates = [];
    for (const candidate of candidateEvents) {
        // Skip if it's the same event
        if (candidate.id === event.id)
            continue;
        // Check if dates overlap
        if (!datesOverlap(candidate.dates, event.dates))
            continue;
        // Calculate title similarity
        const similarity = stringSimilarity.compareTwoStrings(normalizeText(event.title), normalizeText(candidate.title));
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
function formatDate(date) {
    return date.toISOString().split('T')[0];
}
// Format event response by converting dates to YYYY-MM-DD format
const formatEventResponse = (event) => {
    return {
        ...event,
        dates: event.dates.map((d) => formatDate(d)),
        startTime: event.startTime || undefined,
        endTime: event.endTime || undefined,
        city: event.city || undefined,
        description: event.description || undefined,
        duplicateOfId: event.duplicateOfId || null
    };
};
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
                    hasSome: Array.from({ length: (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1 }, (_, i) => new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24)))
                }
            },
            orderBy: {
                dates: 'asc'
            }
        });
        return c.json({
            events: events.map(formatEventResponse),
            count: events.length,
            dateRange: { start, end }
        });
    }
    catch (error) {
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
            where: { id }
        });
        if (!event) {
            return c.json({ error: 'Event not found' }, 404);
        }
        return c.json(formatEventResponse(event));
    }
    catch (error) {
        console.error('Error fetching event:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});
// Create a new event
app.post('/events', async (c) => {
    try {
        const body = await c.req.json();
        const validatedData = eventSchema.parse(body);
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
            }
        });
        // If there are potential duplicates, include them in the response
        // @TODO: This code is a mess
        const response = {
            event: formatEventResponse(event),
            ...(potentialDuplicates.length > 0 && {
                potentialDuplicates: await Promise.all(potentialDuplicates.map(async (dup) => ({
                    event: formatEventResponse((await prisma.event.findUnique({ where: { id: dup.id } }))),
                    similarityScore: dup.similarityScore
                })))
            })
        };
        return c.json(response, 201);
    }
    catch (error) {
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
        const validatedData = eventSchema.parse(body);
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
            }
        });
        return c.json(formatEventResponse(updatedEvent));
    }
    catch (error) {
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
        await prisma.event.delete({ where: { id } });
        return c.json({ message: 'Event deleted successfully' }, 200);
    }
    catch (error) {
        console.error('Error deleting event:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});
// Handle image upload for event creation
app.post('/events/upload', async (c) => {
    try {
        const formData = await c.req.formData();
        const file = formData.get('file');
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
    }
    catch (error) {
        console.error('Error handling image upload:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});
export { app };
