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
    // Location is optional, but if provided, it should be a string
    location: z.string().nullish(),
    // WE DO NOT validate time as it can be optional and vary widely
    time: z.string().nullish(),
    // Start and end times are optional, but if provided, they should be in HH:mm format
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Start time must be in HH:mm format').nullish(),
    // End time is optional, but if provided, it should be in HH:mm format
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'End time must be in HH:mm format').nullish(),
    // City is optional, but if provided, it should be a string
    city: z.string().nullish(),
    // Description is optional, but if provided, it should be a string
    description: z.string().nullish(),
    // Organizer is optional, but if provided, it should be a string
    organizer: z.string().nullish(),
    // Price is optional, but if provided, it should be a string
    price: z.string().nullish(),
    // Category is optional, but if provided, it should be a string
    category: z.string().nullish(),
    // WE DO NOT validate email and phone as they can be nullish and vary widely
    email: z.string().nullish(),
    // WE DO NOT validate email and phone as they can be nullish and vary widely
    phone: z.string().nullish(),
    // latitude is optional, but if provided, they should be numbers
    latitude: z.number().nullish(),
    // longitude is optional, but if provided, it should be a number
    longitude: z.number().nullish(),
    // Raw text is optional, but if provided, it should be a string
    rawText: z.string().nullish(),
});
