"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const api_1 = require("./api");
const port = parseInt(process.env.API_PORT || '3000');
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: api_1.app.fetch,
    port
});
