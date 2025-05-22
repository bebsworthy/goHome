---
description: SNCF API integration module documentation
globs: 
alwaysApply: false
---
# SNCF API Integration Module

## Overview

This module interfaces with the SNCF (French National Railway Company) API to fetch train journey information and station data.

## API Details

- Base URL: `https://api.sncf.com/v1`
- Coverage: `sncf`
- Authentication: Bearer token in Authorization header

> **Important Note**: In all endpoints that use `{region_id}`, this value is always `sncf`. For example, `/coverage/{region_id}/places` should be used as `/coverage/sncf/places`.

## Available Endpoints

### Coverage 🗺️

Base endpoint: `/coverage`

Purpose: Provides information about geographical coverage and available datasets.

| Endpoint | Description | Documentation |
|----------|-------------|---------------|
| `/coverage` | Lists all covered regions | - |
| `/coverage/sncf` | Information about the SNCF region | - |
| `/coverage/{lon;lat}` | Region information based on coordinates | - |
| `/coverage/sncf/datasets` | Lists available datasets | - |

### Journeys Computation 🚂

Base endpoint: `/coverage/sncf/journeys`

Purpose: Computes train journeys between stations.

| Endpoint | Description | Implementation |
|----------|-------------|----------------|
| `/journeys` | Calculate journey between stations | [getAndDisplayTrainJourneys](mdc:../packages/server/src/sncf.ts) |

Parameters:
- `from`: Station ID (format: `stop_area:SNCF:XXXXXXX`)
- `to`: Station ID (format: `stop_area:SNCF:XXXXXXX`)
- `datetime`: Departure time (format: `YYYYMMDDTHHmmss`)
- `data-freshness`: Data freshness level (e.g., `realtime`)

### Places & Station Search 📍

Base endpoint: `/coverage/sncf/places`

Purpose: Search for stations and places.

| Endpoint | Description | Documentation |
|----------|-------------|---------------|
| `/places?q={query}` | Search stations by name | [places.md](mdc:../documentation/api-sncf/places.md) |
| `/places_nearby` | Find stations near coordinates | - |

### Schedules 🕒

Base endpoint: `/coverage/sncf`

Purpose: Access schedule information.

| Endpoint | Description | Documentation |
|----------|-------------|---------------|
| `/stop_schedules` | Schedules for stop points | - |
| `/route_schedules` | Schedules for routes | - |

### Real-time Information ⚡

Base endpoint: `/coverage/sncf`

| Endpoint | Description | Documentation |
|----------|-------------|---------------|
| `/departures` | Next departures from a station | - |
| `/arrivals` | Next arrivals at a station | - |

### Traffic Reports ⚠️

Base endpoint: `/coverage/sncf`

| Endpoint | Description | Documentation |
|----------|-------------|---------------|
| `/traffic_reports` | Current traffic status | - |
| `/disruptions` | Service disruptions | - |

## Key Interfaces

- `SNCFJourneysResponse`: API response structure
- `Journey`: Train journey information
- `Section`: Journey section details
- `JourneyDisplay`: Formatted journey display data

## Helper Functions

- `toSNCFDateTime`: Converts JavaScript Date to SNCF's format (YYYYMMDDTHHmmss)
- `parseSNCFDateTime`: Converts SNCF's datetime string to JavaScript Date
- `getAndDisplayTrainJourneys`: Main function to fetch and format journey data

## Environment Variables

Required:
- `SNCF_API_KEY`: Your SNCF API key

Optional:
- `SNCF_BASE_URL`: Override default API base URL (default: `https://api.sncf.com/v1`)

For testing:
- `TEST_SNCF_FROM_STATION_ID`: Test departure station ID
- `TEST_SNCF_TO_STATION_ID`: Test arrival station ID

## Common Parameters

1. **Authentication**:
   - API key required in Authorization header

2. **Pagination**:
   - `start_page`: Page number (0-based)
   - `count`: Items per page

3. **Response Control**:
   - `disable_geojson`: Exclude GeoJSON data
   - `disable_disruption`: Exclude disruption information

## Error Handling

The module includes comprehensive error handling for:
- Missing API key
- Network errors
- Invalid responses
- API-level errors

## Best Practices

1. Always use environment variables for configuration
2. Handle API errors appropriately
3. Use TypeScript interfaces for type safety
4. Format dates correctly using helper functions
5. Include proper error handling in implementations

## Documentation

API endpoints are documented in the `/documentation/api-sncf/` directory:
- [places.md](mdc:../documentation/api-sncf/places.md): Station search_files endpoint
- Additional endpoints will be documented as they are implemented

## Example Usage

```typescript
const journeys = await getAndDisplayTrainJourneys(
    'stop_area:SNCF:87271007',  // Paris Saint-Lazare
    'stop_area:SNCF:87271460'   // Mantes-la-Jolie
);
```

## Implementation Status

| Feature | Status | Implementation |
|---------|--------|----------------|
| Journey Search | ✅ Implemented | [sncf.ts](mdc:../packages/server/src/sncf.ts) |
| Station Search | ✅ Documented | [places.md](mdc:../documentation/api-sncf/places.md) |
| Schedules | 📝 Planned | - |
| Real-time Info | 📝 Planned | - |
| Traffic Reports | 📝 Planned | - |
