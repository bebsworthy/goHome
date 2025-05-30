// Load environment variables first
import * as dotenv from 'dotenv';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import { app as sncfApi } from './sncf-api.js'
import { app as localeventApi } from '@gohome/localevent/src/api.js'

const app = new Hono()

const useMockApi = process.argv.includes('--mock');


// Add CORS middleware with detailed logging
app.use('/*', async (c, next) => {
  console.log(`[SERVER] Received request: ${c.req.method} ${c.req.url}`);
  // console.log(`[SERVER] Request headers:`, Object.fromEntries(c.req.raw.headers.entries()));
  
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
  // console.log(`[SERVER] Response headers:`, Object.fromEntries(c.res.headers.entries()));
})

// Calculate paths for static file serving
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const absolutePublicDir = join(__dirname, '..', 'public');
const publicDir = relative(process.cwd(), absolutePublicDir);
console.log(`[SERVER] Absolute public dir: ${absolutePublicDir}`);
console.log(`[SERVER] Relative public dir for serveStatic: ${publicDir}`);

app.route('/api/sncf', sncfApi);
app.route('/api/local', localeventApi);

// Serve static files for all non-API routes
app.use('*', async (c, next) => {
  // Skip if path starts with /api
  if (c.req.path.startsWith('/api')
      || c.req.path.startsWith('/local')
  ) {
    console.log(`[SERVER] Skipping static file serving for API route: ${c.req.path}`);
    return next();
  }

  const staticHandler = serveStatic({
    root: publicDir,
    onFound(c) {
      console.log(`[SERVER] Serving static file: ${c}`);
    },
    onNotFound(path, c) {
      console.error(`[SERVER] File not found: ${path}`);
    },
  });
  
  return staticHandler(c, next);
});


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
  console.log(`API Mode: ${useMockApi ? 'MOCK (offline development)' : 'REAL (production)'}`);
  if (useMockApi) {
    console.log('To use the real SNCF API, restart the server without the --mock flag');
  } else {
    console.log('To use the mock SNCF API, restart the server with the --mock flag');
  }
})
