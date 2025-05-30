"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const hono_1 = require("hono");
const zod_1 = require("zod");
const client_1 = require("./generated/prisma/client");
const app = new hono_1.Hono();
exports.app = app;
const prisma = new client_1.PrismaClient();
// Format date as YYYY-MM-DD
function formatDate(date) {
    return date.toISOString().split('T')[0];
}
// Format event response by converting dates to YYYY-MM-DD format
function formatEventResponse(event) {
    return {
        ...event,
        dates: event.dates.map((d) => formatDate(d)),
    };
}
// Validation schemas
const dateRangeSchema = zod_1.z.object({
    start: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    end: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});
const eventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    dates: zod_1.z.array(zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Dates must be in YYYY-MM-DD format')),
    startTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:MM format').optional(),
    endTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, 'End time must be in HH:MM format').optional(),
    location: zod_1.z.string().min(1, 'Location is required'),
    city: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    organizer: zod_1.z.string().optional(),
    price: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    rawText: zod_1.z.string().optional(),
});
// Get events within a date range
app.get('/events', async (c) => {
    try {
        const { start, end } = dateRangeSchema.parse({
            start: c.req.query('start'),
            end: c.req.query('end'),
        });
        const startDate = new Date(start);
        const endDate = new Date(end);
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
        if (error instanceof zod_1.z.ZodError) {
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
        const event = await prisma.event.create({
            data: {
                ...validatedData,
                dates: validatedData.dates.map(date => new Date(date)),
            }
        });
        return c.json(formatEventResponse(event), 201);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
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
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                ...validatedData,
                dates: validatedData.dates.map(date => new Date(date)),
            }
        });
        return c.json(formatEventResponse(updatedEvent));
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
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
