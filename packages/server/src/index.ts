// Load environment variables first
import * as dotenv from 'dotenv';
dotenv.config();

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { SNCF, findEarliestArrivingJourneys, findStations } from './sncf.js';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
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

    try {
      const journeys = await findEarliestArrivingJourneys(fromStationId, toStationId);
      return c.json(journeys);
    } catch (error) {
      console.error('Error fetching train journeys:', error);
      return c.json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
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

    try {
      const stations = await findStations(query);
      return c.json(stations);
    } catch (error) {
      console.error('Error searching stations:', error);
      return c.json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      }, 500);
    }
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
