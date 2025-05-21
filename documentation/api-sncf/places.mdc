---
description: 
globs: 
alwaysApply: false
---
# Places API Endpoint

This endpoint allows you to search for SNCF stations and places using a text query.

## Endpoint

```
GET https://api.sncf.com/v1/coverage/sncf/places
```

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | The search query (e.g., station name) |
| type[] | string | No | Filter results by type. Use `stop_area` for stations |

## Response Format

The response is a JSON object containing the following fields:

### Root Object

| Field | Type | Description |
|-------|------|-------------|
| feed_publishers | array | Information about the data providers |
| disruptions | array | List of any current disruptions |
| places | array | List of matching places |
| context | object | Request context information |
| links | array | Related API endpoints |

### Place Object

Each place in the `places` array contains:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the place |
| name | string | Display name of the place |
| quality | number | Search result quality score (0-100) |
| embedded_type | string | Type of place (e.g., "stop_area") |
| stop_area | object | Detailed station information |

### Stop Area Object

The `stop_area` object contains:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Station identifier |
| name | string | Station name |
| codes | array | Alternative identifiers |
| timezone | string | Station timezone |
| label | string | Full station label with city |
| coord | object | Geographic coordinates |
| administrative_regions | array | Administrative area information |

## Example Request

```bash
curl -X GET "https://api.sncf.com/v1/coverage/sncf/places?q=saint-lazare&type[]=stop_area" \
  -H "Authorization: YOUR_API_KEY"
```

## Example Response

```json
{
  "feed_publishers": [
    {
      "id": "sncf",
      "name": "SNCF PIV Production",
      "url": "",
      "license": "Private (unspecified)"
    }
  ],
  "disruptions": [],
  "places": [
    {
      "id": "stop_area:SNCF:87384008",
      "name": "Paris Saint-Lazare (Paris)",
      "quality": 80,
      "stop_area": {
        "id": "stop_area:SNCF:87384008",
        "name": "Paris Saint-Lazare",
        "codes": [
          {
            "type": "source",
            "value": "87384008"
          }
        ],
        "timezone": "Europe/Paris",
        "label": "Paris Saint-Lazare (Paris)",
        "coord": {
          "lon": "2.325331",
          "lat": "48.876242"
        },
        "administrative_regions": [
          {
            "id": "admin:fr:75056",
            "name": "Paris",
            "level": 8,
            "zip_code": "75000;75116",
            "label": "Paris (75000-75116)",
            "insee": "75056",
            "coord": {
              "lon": "2.3483915",
              "lat": "48.8534951"
            }
          }
        ]
      },
      "embedded_type": "stop_area"
    }
  ],
  "context": {
    "current_datetime": "20250521T181518",
    "timezone": "Europe/Paris"
  }
}
```

## Notes

- The `quality` field indicates how well the result matches the search query
- Multiple `type[]` parameters can be specified to search for different types of places
- The response includes detailed geographic and administrative information for each station
- Timezone information is provided in the IANA timezone format
