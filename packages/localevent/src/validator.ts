import { z } from 'zod';

// Validation schemas

export const dateRangeSchema = z.object({
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const eventSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Dates must be in YYYY-MM-DD format')),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:MM format').optional(),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, 'End time must be in HH:MM format').optional(),
    location: z.string().min(1, 'Location is required'),
    city: z.string().optional(),
    description: z.string().optional(),
    organizer: z.string().optional(),
    price: z.string().optional(),
    category: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    rawText: z.string().optional(),
});
