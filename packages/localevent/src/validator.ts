import { z } from 'zod';

// Validation schemas

export const dateRangeSchema = z.object({
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const eventSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Dates must be in YYYY-MM-DD format'))
        .min(1, 'At least one date is required'),
    location: z.string().min(1, 'Location is required'),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Start time must be in HH:mm format').optional(),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'End time must be in HH:mm format').optional(),
    city: z.string().optional(),
    description: z.string().optional(),
    organizer: z.string().optional(),
    price: z.string().optional(),
    category: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    rawText: z.string().nullish(),
});
