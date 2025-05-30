import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '../../src/generated/prisma/client';
import { app } from '../../src/api';
import { serve } from '@hono/node-server';

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
      const data = await response.json() as Event;
      expect(data).toMatchObject({
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
      const created = (await createResponse.json()) as Event;

      // Now update it
      const updateResponse = await fetch(`http://localhost:${TEST_PORT}/events/${created.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Updated Test Event',
          dates: ['2025-06-02'],
          location: 'Updated Location',
        }),
      });

      expect(updateResponse.status).toBe(200);
      const updated = (await updateResponse.json()) as Event;
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
      const created = (await createResponse.json()) as Event;

      // Now delete it
      const deleteResponse = await fetch(`http://localhost:${TEST_PORT}/events/${created.id}`, {
        method: 'DELETE',
      });

      expect(deleteResponse.status).toBe(200);
      const data = (await deleteResponse.json()) as DeleteResponse;
      expect(data.message).toBe('Event deleted successfully');

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
