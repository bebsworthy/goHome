---
description: 
globs: 
alwaysApply: false
---
# SNCF API Endpoint Functions

## Overview

This document outlines the standards for creating and naming functions that interact with the SNCF API endpoints.

## Function Organization

### SNCF Namespace

All direct API endpoint calls MUST be placed in the `SNCF` namespace:

```typescript
export namespace SNCF {
    export async function journeys(...) { ... }
    export async function places(...) { ... }
}
```

### Authentication Handling

The API key MUST be handled internally by the SNCF namespace:

1. The API key should be accessed from environment variables within the namespace
2. Endpoint functions should NOT accept an API key parameter
3. API key validation should happen inside each endpoint function
4. Business logic should not need to handle or be aware of the API key

```typescript
// ✅ Correct
export namespace SNCF {
    export async function places(query: string): Promise<Response> {
        if (!API_KEY) {
            throw new Error("Configuration Error: SNCF_API_KEY is not set");
        }
        return fetch(url, {
            headers: { 'Authorization': API_KEY }
        });
    }
}

// ❌ Incorrect
export namespace SNCF {
    export async function places(query: string, apiKey: string): Promise<Response> {
        return fetch(url, {
            headers: { 'Authorization': apiKey }
        });
    }
}
```

### Function Location

- All SNCF API endpoint functions should be defined in `src/sncf.ts`
- Business logic and helper functions should be kept outside the namespace
- Data transformation and processing should be in separate functions outside the namespace

## Naming Conventions

### Endpoint Functions

1. Function names MUST exactly match their corresponding API endpoint:
   ```typescript
   // ✅ Correct
   // Endpoint: /coverage/sncf/journeys
   export async function journeys(...) { ... }

   // ❌ Incorrect
   // Don't use:
   export async function getJourneys(...) { ... }
   export async function journey(...) { ... }
   export async function fetchJourneys(...) { ... }
   ```

2. For endpoints with hyphens, use camelCase:
   ```typescript
   // Endpoint: /coverage/sncf/line-reports
   export async function lineReports(...) { ... }
   ```

### Business Logic Functions

Business logic functions that use these endpoints should be named according to their specific purpose:

```typescript
// Outside the SNCF namespace:
export async function findEarliestArrivingJourneys(...) { ... }
export async function searchNearbyStations(...) { ... }
```

## Function Parameters

### Endpoint Functions

1. Parameters should match API parameters (excluding authentication):
   ```typescript
   export async function journeys(
       fromStationId: string,  // from parameter
       toStationId: string,    // to parameter
       dateTime: string        // datetime parameter
   ): Promise<Response>
   ```

2. Always return the raw `Response` object:
   ```typescript
   return fetch(url, {
       headers: {
           'Authorization': API_KEY
       }
   });
   ```

## Example Implementation

```typescript
// Configuration
const API_KEY = process.env.SNCF_API_KEY;
const SNCF_BASE_URL = process.env.SNCF_BASE_URL || 'https://api.sncf.com/v1';

export namespace SNCF {
    // Direct API endpoint call
    export async function journeys(
        fromStationId: string,
        toStationId: string,
        dateTime: string
    ): Promise<Response> {
        if (!API_KEY) {
            throw new Error("Configuration Error: SNCF_API_KEY is not set");
        }

        const params = new URLSearchParams({
            from: fromStationId,
            to: toStationId,
            datetime: dateTime
        });

        const url = `${SNCF_BASE_URL}/coverage/sncf/journeys?${params.toString()}`;
        return fetch(url, {
            headers: {
                'Authorization': API_KEY
            }
        });
    }
}

// Business logic (outside namespace)
export async function findEarliestArrivingJourneys(
    fromStationId: string,
    toStationId: string,
    now: Date = new Date()
): Promise<JourneyDisplay[]> {
    const response = await SNCF.journeys(fromStationId, toStationId, formatDate(now));
    // Process response...
}
```

## Best Practices

1. Keep endpoint functions minimal:
   - Only handle the API call
   - Don't transform responses
   - Don't handle business logic
   - Handle authentication internally

2. Separate concerns:
   - API calls in the SNCF namespace
   - Data transformation in helper functions
   - Business logic in separate functions
   - Authentication handled by the namespace

3. Type safety:
   - Use TypeScript interfaces for request/response types
   - Define parameter types explicitly
   - Use strict type checking

4. Error handling:
   - Handle authentication errors in the namespace
   - Let the calling function handle API errors
   - Return raw Response objects
   - Document expected error responses

## Documentation

Each endpoint function should have a corresponding documentation file in `/documentation/api-sncf/` that describes:
- The endpoint URL
- Available parameters
- Response format
- Example usage

## Testing

Create corresponding test files that:
- Mock the API responses
- Test parameter validation
- Verify URL construction
- Check error handling for missing API key
