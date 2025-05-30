import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { SNCF } from './sncf.js';
import { toSNCFDateTime } from './utils/dateTime.js';
import { Hono } from 'hono';
const app = new Hono();
// Check for --mock flag in command line arguments
const useMockApi = process.argv.includes('--mock');
// Import either the real API or the mock API based on the flag
let findEarliestArrivingJourneys, findStations, findDepartures;
if (useMockApi) {
    console.log('🔶 Using MOCK SNCF API - No API calls will be made to the real SNCF API');
    const mockApi = await import('./sncf-mock.js');
    findEarliestArrivingJourneys = mockApi.findEarliestArrivingJourneys;
    findStations = mockApi.findStations;
    findDepartures = mockApi.findDepartures;
}
else {
    console.log('🔷 Using REAL SNCF API - API calls will be made to the actual SNCF API');
    const realApi = await import('./sncf.js');
    findEarliestArrivingJourneys = realApi.findEarliestArrivingJourneys;
    findStations = realApi.findStations;
    findDepartures = realApi.findDepartures;
}
// Validation schema for train journey queries
const trainJourneySchema = z.object({
    query: z.object({
        from: z.string()
            .min(1, 'From station ID is required')
            .regex(/^stop_area:SNCF:\d+$/, 'Invalid SNCF station ID format. Expected format: stop_area:SNCF:XXXXXXX'),
        to: z.string()
            .min(1, 'To station ID is required')
            .regex(/^stop_area:SNCF:\d+$/, 'Invalid SNCF station ID format. Expected format: stop_area:SNCF:XXXXXXX')
    })
});
app.get('/train-journeys', zValidator('query', trainJourneySchema.shape.query), async (c) => {
    // Query parameters are now validated and typed
    const { from: fromStationId, to: toStationId } = c.req.valid('query');
    console.log(`[SERVER] Searching journeys from ${fromStationId} to ${toStationId}`);
    try {
        // Format current time for API
        const now = new Date();
        const currentDateTimeForAPI = toSNCFDateTime(now);
        // Call SNCF API directly
        const response = await SNCF.journeys(fromStationId, toStationId, currentDateTimeForAPI);
        if (!response.ok) {
            // Attempt to get more detailed error from SNCF if possible
            try {
                const errorData = await response.json();
                if (errorData.error) {
                    throw new Error(`${errorData.error.id}: ${errorData.error.message}`);
                }
            }
            catch {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
        }
        // Parse and return the raw response
        const data = await response.json();
        if (data.error) {
            throw new Error(`SNCF API Error: ${data.error.id} - ${data.error.message}`);
        }
        return c.json(data);
    }
    catch (error) {
        console.error('[SERVER] Error fetching train journeys:', error);
        // Check for rate limiting error
        if (error instanceof Error && error.message.includes('429')) {
            return c.json({
                error: 'Rate limit exceeded',
                message: 'The SNCF API rate limit has been exceeded. Please try again in a few moments.',
                code: 'RATE_LIMIT_EXCEEDED'
            }, 429);
        }
        // Handle other errors
        return c.json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
            code: 'INTERNAL_SERVER_ERROR'
        }, 500);
    }
});
// Validation schema for station search
const stationSearchSchema = z.object({
    query: z.object({
        q: z.string().min(2, 'Search query must be at least 2 characters long')
    })
});
app.get('/stations', zValidator('query', stationSearchSchema.shape.query), async (c) => {
    const { q: query } = c.req.valid('query');
    console.log(`[SERVER] Searching stations with query: "${query}"`);
    try {
        const stations = await findStations(query);
        console.log(`[SERVER] Found ${stations.length} stations`);
        return c.json(stations);
    }
    catch (error) {
        console.error('[SERVER] Error searching stations:', error);
        // Check for rate limiting error
        if (error instanceof Error && error.message.includes('429')) {
            return c.json({
                error: 'Rate limit exceeded',
                message: 'The SNCF API rate limit has been exceeded. Please try again in a few moments.',
                code: 'RATE_LIMIT_EXCEEDED'
            }, 429);
        }
        // Handle other errors
        return c.json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
            code: 'INTERNAL_SERVER_ERROR'
        }, 500);
    }
});
// Validation schema for departures query
const departuresSchema = z.object({
    query: z.object({
        stop_id: z.string()
            .min(1, 'Stop area ID is required')
            .regex(/^stop_area:SNCF:\d+$/, 'Invalid SNCF station ID format. Expected format: stop_area:SNCF:XXXXXXX'),
        from_datetime: z.string().datetime().optional(),
        count: z.coerce.number().min(1).max(50).optional().default(10),
        data_freshness: z.enum(['base_schedule', 'realtime']).optional()
    })
});
app.get('/departures', zValidator('query', departuresSchema.shape.query), async (c) => {
    const { stop_id: stopId, from_datetime: fromDateTime, count } = c.req.valid('query');
    console.log(`[SERVER] Fetching departures for ${stopId}`);
    try {
        const departures = await findDepartures(stopId, fromDateTime ? new Date(fromDateTime) : undefined, count);
        return c.json({
            departures,
            pagination: {
                total_count: departures.length,
                items_per_page: count,
                start_page: 0
            }
        });
    }
    catch (error) {
        console.error('[SERVER] Error fetching departures:', error);
        // Check for rate limiting error
        if (error instanceof Error && error.message.includes('429')) {
            return c.json({
                error: 'Rate limit exceeded',
                message: 'The SNCF API rate limit has been exceeded. Please try again in a few moments.',
                code: 'RATE_LIMIT_EXCEEDED'
            }, 429);
        }
        // Handle other errors
        return c.json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
            code: 'INTERNAL_SERVER_ERROR'
        }, 500);
    }
});
export { app };
//# sourceMappingURL=sncf-api.js.map