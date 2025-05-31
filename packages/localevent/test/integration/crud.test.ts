import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '../../src/api';
import { PrismaClient } from '../../src/generated/prisma/client';

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

interface DeleteResponse {
  message: string;
}

const prisma = new PrismaClient();

describe('Event CRUD Operations', () => {
  const testEvent = {
    title: 'Test Event',
    dates: ['2025-06-01'],
    location: 'Test Location',
    description: 'Test Description',
    startTime: '09:00',
    endTime: '17:00',
    city: 'Test City',
    organizer: 'Test Organizer',
    category: 'Test Category',
    email: 'test@example.com',
  };

  let createdEventId: number;

  // Clean up the database before and after tests
  beforeAll(async () => {
    await prisma.event.deleteMany();
  });

  afterAll(async () => {
    await prisma.event.deleteMany();
    await prisma.$disconnect();
  });

  it('should create a new event', async () => {
    const res = await app.request('/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testEvent),
    });

    expect(res.status).toBe(201);
    const data = await res.json() as CreateEventResponse;
    expect(data.event).toMatchObject({
      ...testEvent,
      dates: testEvent.dates.map(d => expect.any(String)),
    });
    createdEventId = data.event.id;
  });

  it('should fail to create an event with invalid data', async () => {
    const invalidEvent = {
      title: '', // Empty title should fail validation
      dates: ['invalid-date'],
      location: 'Test Location',
    };

    const res = await app.request('/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidEvent),
    });

    expect(res.status).toBe(400);
    const error = await res.json();
    expect(error).toHaveProperty('error', 'Validation error');
  });

  it('should get an event by ID', async () => {
    const res = await app.request(`/events/${createdEventId}`);
    expect(res.status).toBe(200);
    const event = await res.json() as Event;
    expect(event).toMatchObject({
      ...testEvent,
      id: expect.any(Number),
      dates: testEvent.dates.map(d => expect.any(String)),
    });
  });

  it('should update an event', async () => {
    const updatedEvent = {
      ...testEvent,
      title: 'Updated Test Event',
      description: 'Updated Description',
    };

    const res = await app.request(`/events/${createdEventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent),
    });

    expect(res.status).toBe(200);
    const event = await res.json() as Event;
    expect(event).toMatchObject({
      ...updatedEvent,
      id: expect.any(Number),
      dates: updatedEvent.dates.map(d => expect.any(String)),
    });
  });

  it('should fail to update a non-existent event', async () => {
    const res = await app.request('/events/999999', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testEvent),
    });

    expect(res.status).toBe(404);
    const error = await res.json();
    expect(error).toHaveProperty('error', 'Event not found');
  });

  it('should delete an event', async () => {
    const res = await app.request(`/events/${createdEventId}`, {
      method: 'DELETE',
    });

    expect(res.status).toBe(200);
    const result = await res.json() as DeleteResponse;
    expect(result.message).toBe('Event deleted successfully');

    // Verify the event was deleted
    const getRes = await app.request(`/events/${createdEventId}`);
    expect(getRes.status).toBe(404);
  });

  it('should fail to delete a non-existent event', async () => {
    const res = await app.request('/events/999999', {
      method: 'DELETE',
    });

    expect(res.status).toBe(404);
    const error = await res.json();
    expect(error).toHaveProperty('error', 'Event not found');
  });
});
