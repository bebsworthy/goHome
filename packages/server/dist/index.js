// Load environment variables first
import * as dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { lookup } from 'mime-types';
dotenv.config();
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
// Check for --mock flag in command line arguments
const useMockApi = process.argv.includes('--mock');
// Import either the real API or the mock API based on the flag
let findEarliestArrivingJourneys, findStations;
if (useMockApi) {
    console.log('🔶 Using MOCK SNCF API - No API calls will be made to the real SNCF API');
    const mockApi = await import('./sncf-mock.js');
    findEarliestArrivingJourneys = mockApi.findEarliestArrivingJourneys;
    findStations = mockApi.findStations;
}
else {
    console.log('🔷 Using REAL SNCF API - API calls will be made to the actual SNCF API');
    const realApi = await import('./sncf.js');
    findEarliestArrivingJourneys = realApi.findEarliestArrivingJourneys;
    findStations = realApi.findStations;
}
const app = new Hono();
// Add CORS middleware with detailed logging
app.use('/*', async (c, next) => {
    console.log(`[SERVER] Received request: ${c.req.method} ${c.req.url}`);
    console.log(`[SERVER] Request headers:`, Object.fromEntries(c.req.raw.headers.entries()));
    // Apply CORS
    const corsMiddleware = cors({
        origin: '*', // Allow all origins
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization'],
        exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
        maxAge: 600,
        credentials: true,
    });
    await corsMiddleware(c, next);
    console.log(`[SERVER] Response status: ${c.res.status}`);
    console.log(`[SERVER] Response headers:`, Object.fromEntries(c.res.headers.entries()));
});
// Define the public directory path
const publicDir = join(process.cwd(), 'packages/server/public');
console.log(`[SERVER] Serving static files from: ${publicDir}`);
// API Routes
app.get('/api', (c) => {
    return c.text('Hello Api!');
});
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
app.get('/api/train-journeys', zValidator('query', trainJourneySchema.shape.query), async (c) => {
    // Query parameters are now validated and typed
    const { from: fromStationId, to: toStationId } = c.req.valid('query');
    console.log(`[SERVER] Searching journeys from ${fromStationId} to ${toStationId}`);
    try {
        const journeys = await findEarliestArrivingJourneys(fromStationId, toStationId);
        console.log(`[SERVER] Found ${journeys.length} journeys`);
        return c.json(journeys);
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
app.get('/api/stations', zValidator('query', stationSearchSchema.shape.query), async (c) => {
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
// Custom static file handler - must be last to not interfere with API routes
app.get('/*', async (c) => {
    const path = c.req.path;
    try {
        // Default to index.html for the root path or if the file doesn't exist
        const filePath = path === '/' ? 'index.html' : path.slice(1);
        const fullPath = join(publicDir, filePath);
        try {
            const content = await readFile(fullPath);
            const mimeType = lookup(filePath) || 'application/octet-stream';
            // Set appropriate content type
            return new Response(content, {
                headers: {
                    'Content-Type': mimeType
                }
            });
        }
        catch (error) {
            // If file not found, serve index.html for client-side routing
            const indexHtml = await readFile(join(publicDir, 'index.html'), 'utf-8');
            return c.html(indexHtml);
        }
    }
    catch (error) {
        console.error('Error serving file:', error);
        return c.text('Internal Server Error', 500);
    }
});
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
    console.log(`API Mode: ${useMockApi ? 'MOCK (offline development)' : 'REAL (production)'}`);
    if (useMockApi) {
        console.log('To use the real SNCF API, restart the server without the --mock flag');
    }
    else {
        console.log('To use the mock SNCF API, restart the server with the --mock flag');
    }
});
//# sourceMappingURL=index.js.map