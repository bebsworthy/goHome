// Load environment variables first
import * as dotenv from 'dotenv';
dotenv.config();

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { SNCF, findEarliestArrivingJourneys, findStations } from './sncf.js';

const app = new Hono()

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
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api', (c) => {
  return c.text('Hello Api!')
})

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
})

// Type inference from the schema
type TrainJourneyQuery = z.infer<typeof trainJourneySchema>['query']

app.get('/api/train-journeys', 
  zValidator('query', trainJourneySchema.shape.query),
  async (c) => {
    // Query parameters are now validated and typed
    const { from: fromStationId, to: toStationId } = c.req.valid('query');
    console.log(`[SERVER] Searching journeys from ${fromStationId} to ${toStationId}`);
    
    try {
      const journeys = await findEarliestArrivingJourneys(fromStationId, toStationId);
      return c.json(journeys);
    } catch (error) {
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
})

// Validation schema for station search
const stationSearchSchema = z.object({
  query: z.object({
    q: z.string().min(2, 'Search query must be at least 2 characters long')
  })
});

app.get('/api/stations', 
  zValidator('query', stationSearchSchema.shape.query),
  async (c) => {
    const { q: query } = c.req.valid('query');
    console.log(`[SERVER] Searching stations with query: "${query}"`);
    
    try {
      const stations = await findStations(query);
      return c.json(stations);
    } catch (error) {
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

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
