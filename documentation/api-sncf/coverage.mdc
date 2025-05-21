---
description: 
globs: 
alwaysApply: false
---
# SNCF API Coverage Endpoint

## Overview
The coverage endpoint provides information about available regions and their associated endpoints in the SNCF API. This is the root endpoint that exposes all available API functionalities for the French railway system.

## Base URL
```
https://api.sncf.com/v1/coverage
```

## Authentication
- Requires an API key
- Uses Basic Authentication with the API key as username and an empty password
- Header format: `Authorization: Basic <base64(api_key:)>`

## Response Structure

### Regions
Contains information about available geographical regions:
- `id`: Region identifier
- `name`: Human-readable name
- `shape`: Geographical shape data (if available)

### Context
Provides request context information:
- `current_datetime`: Current server time in format YYYYMMDDTHHmmss
- `timezone`: Server timezone

### Links
List of all available endpoints within the coverage area. Each link contains:
- `href`: URL template for the endpoint
- `templated`: Boolean indicating if URL contains template variables
- `rel`: Relationship/name of the endpoint
- `type`: Resource type

## Example Response

```json
{
  "regions": [
    {
      "id": "sncf",
      "name": "sncf",
      "shape": ""
    }
  ],
  "context": {
    "current_datetime": "20250521T154727",
    "timezone": "Africa/Abidjan"
  },
  "links": [
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/stop_points",
      "templated": true,
      "rel": "stop_points",
      "type": "stop_points"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/routes",
      "templated": true,
      "rel": "routes",
      "type": "routes"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/networks",
      "templated": true,
      "rel": "networks",
      "type": "networks"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/commercial_modes",
      "templated": true,
      "rel": "commercial_modes",
      "type": "commercial_modes"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/physical_modes",
      "templated": true,
      "rel": "physical_modes",
      "type": "physical_modes"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/companies",
      "templated": true,
      "rel": "companies",
      "type": "companies"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/stop_areas",
      "templated": true,
      "rel": "stop_areas",
      "type": "stop_areas"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/lines",
      "templated": true,
      "rel": "lines",
      "type": "lines"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/line_groups",
      "templated": true,
      "rel": "line_groups",
      "type": "line_groups"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/addresses",
      "templated": true,
      "rel": "addresses",
      "type": "addresses"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/coords",
      "templated": true,
      "rel": "coords",
      "type": "coords"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/coord",
      "templated": true,
      "rel": "coord",
      "type": "coord"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/journey_pattern_points",
      "templated": true,
      "rel": "journey_pattern_points",
      "type": "journey_pattern_points"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/journey_patterns",
      "templated": true,
      "rel": "journey_patterns",
      "type": "journey_patterns"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/pois",
      "templated": true,
      "rel": "pois",
      "type": "pois"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/poi_types",
      "templated": true,
      "rel": "poi_types",
      "type": "poi_types"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/connections",
      "templated": true,
      "rel": "connections",
      "type": "connections"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/vehicle_journeys",
      "templated": true,
      "rel": "vehicle_journeys",
      "type": "vehicle_journeys"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/disruptions",
      "templated": true,
      "rel": "disruptions",
      "type": "disruptions"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/trips",
      "templated": true,
      "rel": "trips",
      "type": "trips"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/contributors",
      "templated": true,
      "rel": "contributors",
      "type": "contributors"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/datasets",
      "templated": true,
      "rel": "datasets",
      "type": "datasets"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/",
      "templated": true,
      "rel": "coverage",
      "type": "coverage"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/places",
      "templated": true,
      "rel": "places",
      "type": "places"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/pt_objects",
      "templated": true,
      "rel": "pt_objects",
      "type": "pt_objects"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/journeys",
      "templated": true,
      "rel": "journeys",
      "type": "journeys"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/traffic_reports",
      "templated": true,
      "rel": "traffic_reports",
      "type": "traffic_reports"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/line_reports",
      "templated": true,
      "rel": "line_reports",
      "type": "line_reports"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/equipment_reports",
      "templated": true,
      "rel": "equipment_reports",
      "type": "equipment_reports"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/access_points",
      "templated": true,
      "rel": "access_points",
      "type": "access_points"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/isochrones",
      "templated": true,
      "rel": "isochrones",
      "type": "isochrones"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/coord/{lon;lat}/places_nearby",
      "templated": true,
      "rel": "places_nearby",
      "type": "places_nearby"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/stop_areas/{stop_areas.id}/departures",
      "templated": true,
      "rel": "departures",
      "type": "departures"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/stop_areas/{stop_areas.id}/arrivals",
      "templated": true,
      "rel": "arrivals",
      "type": "arrivals"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/stop_areas/{stop_areas.id}/stop_schedules",
      "templated": true,
      "rel": "stop_schedules",
      "type": "stop_schedules"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/lines/{lines.id}/route_schedules",
      "templated": true,
      "rel": "route_schedules",
      "type": "route_schedules"
    },
    {
      "href": "https://api.sncf.com/v1/coverage/{regions.id}/stop_areas/{stop_areas.id}/terminus_schedules",
      "templated": true,
      "rel": "terminus_schedules",
      "type": "terminus_schedules"
    }
  ]
}
