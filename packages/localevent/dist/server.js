import { serve } from '@hono/node-server';
import { app } from './api.js';
const port = parseInt(process.env.API_PORT || '3000');
console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port
});
