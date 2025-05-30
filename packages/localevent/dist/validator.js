import { z } from 'zod';
// Validation schemas
export const dateRangeSchema = z.object({
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});
export const eventSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Dates must be in YYYY-MM-DD format')),
    startTime: z.string().nullish(),
    endTime: z.string().nullish(),
    location: z.string().nullish(),
    city: z.string().nullish(),
    description: z.string().nullish(),
    organizer: z.string().nullish(),
    price: z.string().nullish(),
    category: z.string().nullish(),
    email: z.string().nullish(),
    phone: z.string().nullish(),
    rawText: z.string().nullish(),
});
//# sourceMappingURL=validator.js.map