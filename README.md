# goHome
Find the next train to go home: an explo in AI coding

## Development

### Server

The server component provides API endpoints for searching train stations and finding journeys between stations using the SNCF API.

#### Running the Server

```bash
# Start the server with the real SNCF API
npm run dev -w @gohome/server

# Start the server with the mock SNCF API (no real API calls)
npm run dev:mock -w @gohome/server
```

#### Mock API

The application includes a mock SNCF API implementation that can be used during development to avoid hitting API rate limits. The mock API provides realistic but fictional data for stations and journeys.

Benefits of using the mock API:

- No dependency on the real SNCF API during development
- No rate limiting issues
- Faster development cycles
- Works offline

To use the mock API, simply use the `dev:mock` or `start:mock` scripts instead of the regular ones.

### UI

The UI component is a React application that provides a user interface for searching train journeys.

```bash
# Start the UI development server
npm run dev -w @gohome/ui
```
