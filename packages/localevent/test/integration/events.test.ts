import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '../../src/generated/prisma/client';
import { app } from '../../src/api';
import { serve } from '@hono/node-server';

interface Event {
  id: number;
  title: string;
  dates: string[];
  location: string;
  city?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  duplicateOfId?: number | null;
}

interface DuplicateInfo {
  event: Event;
  similarityScore: number;
}

interface CreateEventResponse {
  event: Event;
  potentialDuplicates?: DuplicateInfo[];
}

interface EventResponse {
  events: Event[];
  count: number;
  dateRange: {
    start: string;
    end: string;
  };
}

interface ErrorResponse {
  error: string;
  details?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}

interface DeleteResponse {
  message: string;
}

const prisma = new PrismaClient();
const TEST_PORT = 3001;
let server: ReturnType<typeof serve>;



describe('Events API Integration Tests', () => {
  beforeAll(async () => {
    // Start the server
    server = serve({
      fetch: app.fetch,
      port: TEST_PORT
    });

    // Create test events
    await prisma.event.createMany({
      data: [
        {
          title: 'Past Event',
          dates: [new Date('2025-05-01')],
          location: 'Test Location 1',
          startTime: '10:00',
          endTime: '12:00',
        },
        {
          title: 'Current Event',
          dates: [new Date('2025-05-30')],
          location: 'Test Location 2',
          startTime: '14:00',
          endTime: '16:00',
        },
        {
          title: 'Future Event',
          dates: [new Date('2025-06-15')],
          location: 'Test Location 3',
          startTime: '18:00',
          endTime: '20:00',
        },
        {
          title: 'Multi-day Event',
          dates: [
            new Date('2025-05-29'),
            new Date('2025-05-30'),
            new Date('2025-05-31')
          ],
          location: 'Test Location 4',
          startTime: '09:00',
          endTime: '17:00',
        },
      ],
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.event.deleteMany({
      where: {
        title: {
          in: ['Past Event', 'Current Event', 'Future Event', 'Multi-day Event', 'Test Event'],
        },
      },
    });
    await prisma.$disconnect();
    
    // Close the server
    server.close();
  });

  it('should return events within the specified date range', async () => {
    const response = await fetch(
      `http://localhost:${TEST_PORT}/events?start=2025-05-29&end=2025-05-31`
    );
    expect(response.status).toBe(200);

    const data = await response.json() as EventResponse;
    expect(data.count).toBeGreaterThanOrEqual(2); // Should find Current Event and Multi-day Event
    expect(data.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Current Event',
        }),
        expect.objectContaining({
          title: 'Multi-day Event',
        }),
      ])
    );
  });

  it('should return 400 for invalid date format', async () => {
    const response = await fetch(
      `http://localhost:${TEST_PORT}/events?start=invalid&end=2025-05-31`
    );
    expect(response.status).toBe(400);

    const data = await response.json() as { error: unknown };
    expect(data.error).toBeDefined();
  });

  it('should return 400 when end date is before start date', async () => {
    const response = await fetch(
      `http://localhost:${TEST_PORT}/events?start=2025-05-31&end=2025-05-29`
    );
    expect(response.status).toBe(400);

    const data = await response.json() as { error: string };
    expect(data.error).toBe('End date must be after start date');
  });

  it('should return empty events array when no events in range', async () => {
    const response = await fetch(
      `http://localhost:${TEST_PORT}/events?start=2024-01-01&end=2024-01-31`
    );
    expect(response.status).toBe(200);

    const data = await response.json() as EventResponse;
    expect(data.count).toBe(0);
    expect(data.events).toHaveLength(0);
  });

  describe('POST /events', () => {
    it('should create a new event', async () => {
      const newEvent = {
        title: 'Test Event',
        dates: ['2025-06-01'],
        location: 'Test Location',
        startTime: '10:00',
        endTime: '12:00',
        city: 'Test City',
      };

      const response = await fetch(`http://localhost:${TEST_PORT}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      expect(response.status).toBe(201);
      const data = await response.json() as CreateEventResponse;
      expect(data.event).toMatchObject({
        ...newEvent,
        id: expect.any(Number),
      });
    });

    it('should return 400 for invalid event data', async () => {
      const invalidEvent = {
        title: '', // Empty title should fail validation
        dates: ['invalid-date'],
        location: 'Test Location',
      };

      const response = await fetch(`http://localhost:${TEST_PORT}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidEvent),
      });

      expect(response.status).toBe(400);
      const data = await response.json() as ErrorResponse;
      expect(data.error).toBeDefined();
    });

    describe('Duplicate Detection', () => {
      it('should create event without duplicates when no similar events exist', async () => {
        const newEvent = {
          title: 'Unique Concert Event',
          dates: ['2025-07-01'],
          location: 'Concert Hall',
          city: 'New York',
          startTime: '19:00',
          endTime: '22:00'
        };

        const response = await fetch(`http://localhost:${TEST_PORT}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent)
        });

        expect(response.status).toBe(201);
        const data = await response.json() as CreateEventResponse;
        expect(data.event).toMatchObject({
          ...newEvent,
          id: expect.any(Number)
        });
        expect(data.potentialDuplicates).toBeUndefined();
      });

      it('should detect duplicates when similar events exist', async () => {
        // First create an event
        const existingEvent = {
          title: 'Rock Music Festival 2025',
          dates: ['2025-08-01', '2025-08-02'],
          location: 'Central Park',
          city: 'New York',
          startTime: '12:00',
          endTime: '23:00'
        };

        const existingResponse = await fetch(`http://localhost:${TEST_PORT}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(existingEvent)
        });

        const existing = await existingResponse.json() as CreateEventResponse;
        expect(existingResponse.status).toBe(201);

        // Now try to create a similar event
        const similarEvent = {
          title: 'Rock Music Fest 2025', // Very similar title
          dates: ['2025-08-02', '2025-08-03'], // Overlapping dates
          location: 'Central Park',
          city: 'New York', // Same city
          startTime: '14:00',
          endTime: '23:00'
        };

        const response = await fetch(`http://localhost:${TEST_PORT}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(similarEvent)
        });

        expect(response.status).toBe(201);
        const data = await response.json() as CreateEventResponse;
        
        // Verify duplicate detection
        expect(data.potentialDuplicates).toBeDefined();
        if (!data.potentialDuplicates) {
          throw new Error('Expected potentialDuplicates to be defined');
        }
        expect(data.potentialDuplicates).toHaveLength(1);
        const duplicate = data.potentialDuplicates[0];
        expect(duplicate).toMatchObject({
          event: expect.objectContaining({
            id: existing.event.id,
            title: existingEvent.title
          }),
          similarityScore: expect.any(Number)
        });
        expect(duplicate.similarityScore).toBeGreaterThanOrEqual(0.8);

        // Verify the new event was created and marked as a duplicate
        expect(data.event).toMatchObject({
          ...similarEvent,
          id: expect.any(Number),
          duplicateOfId: existing.event.id
        });
      });

      it('should not detect duplicates when events are in different cities', async () => {
        // First create an event in New York
        const existingEvent = {
          title: 'Summer Music Festival',
          dates: ['2025-09-01'],
          location: 'Central Park',
          city: 'New York',
          startTime: '12:00',
          endTime: '22:00'
        };

        const existingResponse = await fetch(`http://localhost:${TEST_PORT}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(existingEvent)
        });
        expect(existingResponse.status).toBe(201);

        // Create similar event in a different city
        const similarEvent = {
          title: 'Summer Music Festival', // Same title
          dates: ['2025-09-01'], // Same date
          location: 'Grant Park',
          city: 'Chicago', // Different city
          startTime: '12:00',
          endTime: '22:00'
        };

        const response = await fetch(`http://localhost:${TEST_PORT}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(similarEvent)
        });

        expect(response.status).toBe(201);
        const data = await response.json() as CreateEventResponse;
        expect(data.potentialDuplicates).toBeUndefined();
        expect(data.event.duplicateOfId).toBeNull();
      });

      it('should not detect duplicates when dates do not overlap', async () => {
        // First create an event
        const existingEvent = {
          title: 'Annual Tech Conference',
          dates: ['2025-10-01', '2025-10-02'],
          location: 'Convention Center',
          city: 'New York',
          startTime: '09:00',
          endTime: '17:00'
        };

        const existingResponse = await fetch(`http://localhost:${TEST_PORT}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(existingEvent)
        });
        expect(existingResponse.status).toBe(201);

        // Create similar event with non-overlapping dates
        const similarEvent = {
          title: 'Annual Tech Conference', // Same title
          dates: ['2025-10-15', '2025-10-16'], // Different dates
          location: 'Convention Center',
          city: 'New York',
          startTime: '09:00',
          endTime: '17:00'
        };

        const response = await fetch(`http://localhost:${TEST_PORT}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(similarEvent)
        });

        expect(response.status).toBe(201);
        const data = await response.json() as CreateEventResponse;
        expect(data.potentialDuplicates).toBeUndefined();
        expect(data.event.duplicateOfId).toBeNull();
      });
    });
  });

  describe('PUT /events/:id', () => {
    it('should update an existing event', async () => {
      // First, create an event
      const createResponse = await fetch(`http://localhost:${TEST_PORT}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Event',
          dates: ['2025-06-01'],
          location: 'Test Location',
        }),
      });
      const data = await createResponse.json() as CreateEventResponse;
      if (!data.event) {
        throw new Error('Expected event to be defined in response');
      }
      const created = data.event;

      // Now update it
      const updateResponse = await fetch(`http://localhost:${TEST_PORT}/events/${created.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Updated Test Event',
          dates: ['2025-06-02'],
          location: 'Updated Location',
          // API requires these fields
          startTime: '09:00',
          endTime: '17:00'
        }),
      });

      expect(updateResponse.status).toBe(200);
      const updated = await updateResponse.json() as Event;
      expect(updated.title).toBe('Updated Test Event');
      expect(updated.location).toBe('Updated Location');
    });

    it('should return 404 for non-existent event', async () => {
      const response = await fetch(`http://localhost:${TEST_PORT}/events/99999`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Updated Test Event',
          dates: ['2025-06-02'],
          location: 'Updated Location',
        }),
      });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /events/:id', () => {
    it('should delete an existing event', async () => {
      // First, create an event
      const createResponse = await fetch(`http://localhost:${TEST_PORT}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Event',
          dates: ['2025-06-01'],
          location: 'Test Location',
        }),
      });
      const data = await createResponse.json() as CreateEventResponse;
      if (!data.event) {
        throw new Error('Expected event to be defined in response');
      }
      const created = data.event;

      // Now delete it
      const deleteResponse = await fetch(`http://localhost:${TEST_PORT}/events/${created.id}`, {
        method: 'DELETE',
      });

      expect(deleteResponse.status).toBe(200);
      const deleteResult = await deleteResponse.json() as DeleteResponse;
      expect(deleteResult.message).toBe('Event deleted successfully');

      // Verify it's gone
      const getResponse = await fetch(`http://localhost:${TEST_PORT}/events/${created.id}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent event', async () => {
      const response = await fetch(`http://localhost:${TEST_PORT}/events/99999`, {
        method: 'DELETE',
      });

      expect(response.status).toBe(404);
    });
  });
});
