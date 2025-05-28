# Departures API

This endpoint provides real-time and scheduled departures information for a specific stop area or stop point.

## Endpoint

```
GET /api/departures
```

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| stop_id | string | Yes | The SNCF stop area ID (format: `stop_area:SNCF:XXXXX`) |
| from_datetime | string | No | Start datetime in ISO format (default: current time) |
| count | number | No | Number of departures to return (default: 10, max: 50) |
| data_freshness | string | No | Type of data to return: `base_schedule` or `realtime` (default: `realtime`) |

## Response

```typescript
interface Departure {
  stop_point: {
    id: string;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
  };
  route: {
    id: string;
    name: string;
    direction: {
      id: string;
      name: string;
    };
  };
  stop_date_time: {
    departure_date_time: string;  // ISO datetime
    base_departure_date_time: string;  // ISO datetime without delays
    arrival_date_time: string;  // ISO datetime
    base_arrival_date_time: string;  // ISO datetime without delays
  };
  display_informations: {
    network: string;
    physical_mode: string;
    headsign: string;
    direction: string;
    commercial_mode: string;
    label: string;
  };
}

interface DeparturesResponse {
  departures: Departure[];
  pagination: {
    total_count: number;
    items_per_page: number;
    start_page: number;
  };
}
```

## Example Request

```bash
curl -X GET 'https://yourdomain.com/api/departures?stop_id=stop_area:SNCF:87686006&count=2' \
  -H 'Accept: application/json'
```

## Example Response

```json
{
  "departures": [
    {
      "stop_point": {
        "id": "stop_point:SNCF:87686006:1",
        "name": "Paris Gare de Lyon",
        "coord": {
          "lat": 48.844924,
          "lon": 2.373481
        }
      },
      "route": {
        "id": "route:SNCF:LYRIA",
        "name": "Paris - Lausanne",
        "direction": {
          "id": "stop_area:SNCF:87686006",
          "name": "Lausanne"
        }
      },
      "stop_date_time": {
        "departure_date_time": "2024-03-20T14:30:00+01:00",
        "base_departure_date_time": "2024-03-20T14:30:00+01:00",
        "arrival_date_time": "2024-03-20T14:28:00+01:00",
        "base_arrival_date_time": "2024-03-20T14:28:00+01:00"
      },
      "display_informations": {
        "network": "SNCF",
        "physical_mode": "Train grande vitesse",
        "headsign": "LYRIA 9269",
        "direction": "Lausanne",
        "commercial_mode": "TGV LYRIA",
        "label": "TGV LYRIA 9269"
      }
    }
  ],
  "pagination": {
    "total_count": 42,
    "items_per_page": 2,
    "start_page": 0
  }
}
```

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Stop area not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable - SNCF API unavailable |

### Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

## Notes

- The API supports both scheduled and real-time departures
- Times are returned in the local timezone with offset
- Real-time updates include delays and cancellations
- Maximum request rate is subject to your SNCF API key limits 

# Example Reponse

```json
{
    "departures": [
        {
            "route": {
                "id": "route:SNCF:E",
                "name": "E",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87386011",
                    "name": "Nanterre la Folie (Nanterre)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87386011",
                        "name": "Nanterre la Folie",
                        "codes": [
                            {
                                "type": "source",
                                "value": "87386011"
                            },
                            {
                                "type": "uic",
                                "value": "87386011"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Nanterre la Folie (Nanterre)",
                        "coord": {
                            "lon": "2.224397",
                            "lat": "48.897377"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:E",
                    "name": "E",
                    "code": "E",
                    "color": "BD76A1",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TNRER",
                        "name": "RER"
                    },
                    "network": {
                        "id": "network:SNCF:TNRER",
                        "name": "RER",
                        "links": []
                    },
                    "opening_time": "045300",
                    "closing_time": "233200",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87281899:RapidTransit",
                "name": "Haussmann - Saint-Lazare",
                "label": "Haussmann - Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.32862",
                    "lat": "48.87478"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TNRER",
                        "name": "RER"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172200",
                "base_departure_date_time": "20250528T172200",
                "arrival_date_time": "20250528T172100",
                "base_arrival_date_time": "20250528T172100",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87386011",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87113795",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "RER",
                "network": "RER",
                "direction": "Villiers-sur-Marne - Le Plessis-Trévise (Villiers-sur-Marne)",
                "label": "E",
                "color": "BD76A1",
                "code": "E",
                "headsign": "VONY",
                "name": "E",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87386011",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87113795",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "119099",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:E"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:119099:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:E"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TNRER"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TNRER"
                }
            ]
        },
        {
            "route": {
                "id": "route:SNCF:E",
                "name": "E",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87386011",
                    "name": "Nanterre la Folie (Nanterre)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87386011",
                        "name": "Nanterre la Folie",
                        "codes": [
                            {
                                "type": "source",
                                "value": "87386011"
                            },
                            {
                                "type": "uic",
                                "value": "87386011"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Nanterre la Folie (Nanterre)",
                        "coord": {
                            "lon": "2.224397",
                            "lat": "48.897377"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:E",
                    "name": "E",
                    "code": "E",
                    "color": "BD76A1",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TNRER",
                        "name": "RER"
                    },
                    "network": {
                        "id": "network:SNCF:TNRER",
                        "name": "RER",
                        "links": []
                    },
                    "opening_time": "045300",
                    "closing_time": "233200",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87281899:RapidTransit",
                "name": "Haussmann - Saint-Lazare",
                "label": "Haussmann - Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.32862",
                    "lat": "48.87478"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TNRER",
                        "name": "RER"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172200",
                "base_departure_date_time": "20250528T172200",
                "arrival_date_time": "20250528T172100",
                "base_arrival_date_time": "20250528T172100",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87113795",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87386011",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "RER",
                "network": "RER",
                "direction": "Nanterre la Folie (Nanterre)",
                "label": "E",
                "color": "BD76A1",
                "code": "E",
                "headsign": "NOVY",
                "name": "E",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87113795",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87386011",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "119096",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:E"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:119096:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:E"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TNRER"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TNRER"
                }
            ]
        },
        {
            "route": {
                "id": "route:SNCF:L",
                "name": "L",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare (Paris)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87384008",
                        "name": "Paris Saint-Lazare",
                        "codes": [
                            {
                                "type": "secondary_id",
                                "value": "SNCF:87281899"
                            },
                            {
                                "type": "source",
                                "value": "87281899"
                            },
                            {
                                "type": "source",
                                "value": "87384008"
                            },
                            {
                                "type": "uic",
                                "value": "87281899"
                            },
                            {
                                "type": "uic",
                                "value": "87384008"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Paris Saint-Lazare (Paris)",
                        "coord": {
                            "lon": "2.325331",
                            "lat": "48.876242"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:L",
                    "name": "L",
                    "code": "L",
                    "color": "7584BC",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    },
                    "network": {
                        "id": "network:SNCF:TN",
                        "name": "TRANSILIEN",
                        "links": []
                    },
                    "opening_time": "044800",
                    "closing_time": "013700",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87384008:RapidTransit",
                "name": "Paris Saint-Lazare",
                "label": "Paris Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.325331",
                    "lat": "48.876242"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172300",
                "base_departure_date_time": "20250528T172300",
                "arrival_date_time": "20250528T172300",
                "base_arrival_date_time": "20250528T172300",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87384008",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87382861",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "TRANSILIEN",
                "network": "TRANSILIEN",
                "direction": "Versailles Rive Droite (Versailles)",
                "label": "L",
                "color": "7584BC",
                "code": "L",
                "headsign": "VASA",
                "name": "L",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87384008",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87382861",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "133627",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:L"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:133627:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:L"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TN"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TN"
                }
            ]
        },
        {
            "route": {
                "id": "route:SNCF:J",
                "name": "J",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare (Paris)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87384008",
                        "name": "Paris Saint-Lazare",
                        "codes": [
                            {
                                "type": "secondary_id",
                                "value": "SNCF:87281899"
                            },
                            {
                                "type": "source",
                                "value": "87281899"
                            },
                            {
                                "type": "source",
                                "value": "87384008"
                            },
                            {
                                "type": "uic",
                                "value": "87281899"
                            },
                            {
                                "type": "uic",
                                "value": "87384008"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Paris Saint-Lazare (Paris)",
                        "coord": {
                            "lon": "2.325331",
                            "lat": "48.876242"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:J",
                    "name": "J",
                    "code": "J",
                    "color": "CDCD00",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    },
                    "network": {
                        "id": "network:SNCF:TN",
                        "name": "TRANSILIEN",
                        "links": []
                    },
                    "opening_time": "042700",
                    "closing_time": "013600",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87384008:RapidTransit",
                "name": "Paris Saint-Lazare",
                "label": "Paris Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.325331",
                    "lat": "48.876242"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172400",
                "base_departure_date_time": "20250528T172400",
                "arrival_date_time": "20250528T172400",
                "base_arrival_date_time": "20250528T172400",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87384008",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87381509",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "TRANSILIEN",
                "network": "TRANSILIEN",
                "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                "label": "J",
                "color": "CDCD00",
                "code": "J",
                "headsign": "MELU",
                "name": "J",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87384008",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87381509",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "130837",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:J"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:130837:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:J"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TN"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TN"
                }
            ]
        },
        {
            "route": {
                "id": "route:SNCF:J",
                "name": "J",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare (Paris)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87384008",
                        "name": "Paris Saint-Lazare",
                        "codes": [
                            {
                                "type": "secondary_id",
                                "value": "SNCF:87281899"
                            },
                            {
                                "type": "source",
                                "value": "87281899"
                            },
                            {
                                "type": "source",
                                "value": "87384008"
                            },
                            {
                                "type": "uic",
                                "value": "87281899"
                            },
                            {
                                "type": "uic",
                                "value": "87384008"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Paris Saint-Lazare (Paris)",
                        "coord": {
                            "lon": "2.325331",
                            "lat": "48.876242"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:J",
                    "name": "J",
                    "code": "J",
                    "color": "CDCD00",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    },
                    "network": {
                        "id": "network:SNCF:TN",
                        "name": "TRANSILIEN",
                        "links": []
                    },
                    "opening_time": "042700",
                    "closing_time": "013600",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87384008:RapidTransit",
                "name": "Paris Saint-Lazare",
                "label": "Paris Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.325331",
                    "lat": "48.876242"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172400",
                "base_departure_date_time": "20250528T172400",
                "arrival_date_time": "20250528T172400",
                "base_arrival_date_time": "20250528T172400",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87384008",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87381509",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "TRANSILIEN",
                "network": "TRANSILIEN",
                "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                "label": "J",
                "color": "CDCD00",
                "code": "J",
                "headsign": "MICE",
                "name": "J",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87384008",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87381509",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "136913",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:J"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:136913:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:J"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TN"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TN"
                }
            ]
        },
        {
            "route": {
                "id": "route:SNCF:E",
                "name": "E",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87386011",
                    "name": "Nanterre la Folie (Nanterre)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87386011",
                        "name": "Nanterre la Folie",
                        "codes": [
                            {
                                "type": "source",
                                "value": "87386011"
                            },
                            {
                                "type": "uic",
                                "value": "87386011"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Nanterre la Folie (Nanterre)",
                        "coord": {
                            "lon": "2.224397",
                            "lat": "48.897377"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:E",
                    "name": "E",
                    "code": "E",
                    "color": "BD76A1",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TNRER",
                        "name": "RER"
                    },
                    "network": {
                        "id": "network:SNCF:TNRER",
                        "name": "RER",
                        "links": []
                    },
                    "opening_time": "045300",
                    "closing_time": "233200",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87281899:RapidTransit",
                "name": "Haussmann - Saint-Lazare",
                "label": "Haussmann - Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.32862",
                    "lat": "48.87478"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TNRER",
                        "name": "RER"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172500",
                "base_departure_date_time": "20250528T172500",
                "arrival_date_time": "20250528T172500",
                "base_arrival_date_time": "20250528T172500",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87281873",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87386011",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "RER",
                "network": "RER",
                "direction": "Nanterre la Folie (Nanterre)",
                "label": "E",
                "color": "BD76A1",
                "code": "E",
                "headsign": "NOMY",
                "name": "E",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87281873",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87386011",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "120056",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:E"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:120056:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:E"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TNRER"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TNRER"
                }
            ]
        },
        {
            "route": {
                "id": "route:SNCF:L",
                "name": "L",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare (Paris)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87384008",
                        "name": "Paris Saint-Lazare",
                        "codes": [
                            {
                                "type": "secondary_id",
                                "value": "SNCF:87281899"
                            },
                            {
                                "type": "source",
                                "value": "87281899"
                            },
                            {
                                "type": "source",
                                "value": "87384008"
                            },
                            {
                                "type": "uic",
                                "value": "87281899"
                            },
                            {
                                "type": "uic",
                                "value": "87384008"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Paris Saint-Lazare (Paris)",
                        "coord": {
                            "lon": "2.325331",
                            "lat": "48.876242"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:L",
                    "name": "L",
                    "code": "L",
                    "color": "7584BC",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    },
                    "network": {
                        "id": "network:SNCF:TN",
                        "name": "TRANSILIEN",
                        "links": []
                    },
                    "opening_time": "044800",
                    "closing_time": "013700",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87384008:RapidTransit",
                "name": "Paris Saint-Lazare",
                "label": "Paris Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.325331",
                    "lat": "48.876242"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172500",
                "base_departure_date_time": "20250528T172500",
                "arrival_date_time": "20250528T172500",
                "base_arrival_date_time": "20250528T172500",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87384008",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87382655",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "TRANSILIEN",
                "network": "TRANSILIEN",
                "direction": "Cergy le Haut (Cergy)",
                "label": "L",
                "color": "7584BC",
                "code": "L",
                "headsign": "UOPY",
                "name": "L",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87384008",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87382655",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "135965",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:L"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:135965:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:L"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TN"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TN"
                }
            ]
        },
        {
            "route": {
                "id": "route:SNCF:E",
                "name": "E",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87386011",
                    "name": "Nanterre la Folie (Nanterre)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87386011",
                        "name": "Nanterre la Folie",
                        "codes": [
                            {
                                "type": "source",
                                "value": "87386011"
                            },
                            {
                                "type": "uic",
                                "value": "87386011"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Nanterre la Folie (Nanterre)",
                        "coord": {
                            "lon": "2.224397",
                            "lat": "48.897377"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:E",
                    "name": "E",
                    "code": "E",
                    "color": "BD76A1",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TNRER",
                        "name": "RER"
                    },
                    "network": {
                        "id": "network:SNCF:TNRER",
                        "name": "RER",
                        "links": []
                    },
                    "opening_time": "045300",
                    "closing_time": "233200",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87281899:RapidTransit",
                "name": "Haussmann - Saint-Lazare",
                "label": "Haussmann - Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.32862",
                    "lat": "48.87478"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TNRER",
                        "name": "RER"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172500",
                "base_departure_date_time": "20250528T172500",
                "arrival_date_time": "20250528T172500",
                "base_arrival_date_time": "20250528T172500",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87386011",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87116111",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "RER",
                "network": "RER",
                "direction": "Chelles - Gournay (Chelles)",
                "label": "E",
                "color": "BD76A1",
                "code": "E",
                "headsign": "CONY",
                "name": "E",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87386011",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87116111",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "116153",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:E"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:116153:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:E"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TNRER"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TNRER"
                }
            ]
        },
        {
            "route": {
                "id": "route:SNCF:J",
                "name": "J",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare (Paris)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87384008",
                        "name": "Paris Saint-Lazare",
                        "codes": [
                            {
                                "type": "secondary_id",
                                "value": "SNCF:87281899"
                            },
                            {
                                "type": "source",
                                "value": "87281899"
                            },
                            {
                                "type": "source",
                                "value": "87384008"
                            },
                            {
                                "type": "uic",
                                "value": "87281899"
                            },
                            {
                                "type": "uic",
                                "value": "87384008"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Paris Saint-Lazare (Paris)",
                        "coord": {
                            "lon": "2.325331",
                            "lat": "48.876242"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:J",
                    "name": "J",
                    "code": "J",
                    "color": "CDCD00",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    },
                    "network": {
                        "id": "network:SNCF:TN",
                        "name": "TRANSILIEN",
                        "links": []
                    },
                    "opening_time": "042700",
                    "closing_time": "013600",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87384008:RapidTransit",
                "name": "Paris Saint-Lazare",
                "label": "Paris Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.325331",
                    "lat": "48.876242"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172600",
                "base_departure_date_time": "20250528T172600",
                "arrival_date_time": "20250528T172600",
                "base_arrival_date_time": "20250528T172600",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87384008",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87381244",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "TRANSILIEN",
                "network": "TRANSILIEN",
                "direction": "Gisors (Gisors)",
                "label": "J",
                "color": "CDCD00",
                "code": "J",
                "headsign": "GEMA",
                "name": "J",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87384008",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87381244",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "137051",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:J"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:137051:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:J"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TN"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TN"
                }
            ]
        },
        {
            "route": {
                "id": "route:SNCF:L",
                "name": "L",
                "is_frequence": "False",
                "direction_type": "forward",
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien"
                    }
                ],
                "direction": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare (Paris)",
                    "quality": 0,
                    "stop_area": {
                        "id": "stop_area:SNCF:87384008",
                        "name": "Paris Saint-Lazare",
                        "codes": [
                            {
                                "type": "secondary_id",
                                "value": "SNCF:87281899"
                            },
                            {
                                "type": "source",
                                "value": "87281899"
                            },
                            {
                                "type": "source",
                                "value": "87384008"
                            },
                            {
                                "type": "uic",
                                "value": "87281899"
                            },
                            {
                                "type": "uic",
                                "value": "87384008"
                            }
                        ],
                        "timezone": "Europe/Paris",
                        "label": "Paris Saint-Lazare (Paris)",
                        "coord": {
                            "lon": "2.325331",
                            "lat": "48.876242"
                        },
                        "links": []
                    },
                    "embedded_type": "stop_area"
                },
                "geojson": {
                    "type": "MultiLineString",
                    "coordinates": []
                },
                "links": [],
                "line": {
                    "id": "line:SNCF:L",
                    "name": "L",
                    "code": "L",
                    "color": "7584BC",
                    "text_color": "FFFFFF",
                    "codes": [],
                    "physical_modes": [
                        {
                            "id": "physical_mode:RapidTransit",
                            "name": "RER / Transilien"
                        }
                    ],
                    "commercial_mode": {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    },
                    "network": {
                        "id": "network:SNCF:TN",
                        "name": "TRANSILIEN",
                        "links": []
                    },
                    "opening_time": "044800",
                    "closing_time": "013700",
                    "geojson": {
                        "type": "MultiLineString",
                        "coordinates": []
                    },
                    "links": []
                }
            },
            "stop_point": {
                "id": "stop_point:SNCF:87384008:RapidTransit",
                "name": "Paris Saint-Lazare",
                "label": "Paris Saint-Lazare (Paris)",
                "coord": {
                    "lon": "2.325331",
                    "lat": "48.876242"
                },
                "links": [],
                "commercial_modes": [
                    {
                        "id": "commercial_mode:TN",
                        "name": "TRANSILIEN"
                    }
                ],
                "physical_modes": [
                    {
                        "id": "physical_mode:RapidTransit",
                        "name": "RER / Transilien",
                        "co2_emission_rate": {
                            "value": 7.28,
                            "unit": "gEC/Km"
                        }
                    }
                ],
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
                ],
                "stop_area": {
                    "id": "stop_area:SNCF:87384008",
                    "name": "Paris Saint-Lazare",
                    "codes": [
                        {
                            "type": "secondary_id",
                            "value": "SNCF:87281899"
                        },
                        {
                            "type": "source",
                            "value": "87281899"
                        },
                        {
                            "type": "source",
                            "value": "87384008"
                        },
                        {
                            "type": "uic",
                            "value": "87281899"
                        },
                        {
                            "type": "uic",
                            "value": "87384008"
                        }
                    ],
                    "timezone": "Europe/Paris",
                    "label": "Paris Saint-Lazare (Paris)",
                    "coord": {
                        "lon": "2.325331",
                        "lat": "48.876242"
                    },
                    "links": [],
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
                "equipments": []
            },
            "stop_date_time": {
                "departure_date_time": "20250528T172900",
                "base_departure_date_time": "20250528T172900",
                "arrival_date_time": "20250528T172900",
                "base_arrival_date_time": "20250528T172900",
                "additional_informations": [],
                "links": [
                    {
                        "type": "stop_area",
                        "rel": "origins",
                        "category": "origin",
                        "id": "stop_area:SNCF:87384008",
                        "internal": true
                    },
                    {
                        "type": "stop_area",
                        "rel": "terminus",
                        "category": "terminus",
                        "id": "stop_area:SNCF:87382481",
                        "internal": true
                    }
                ],
                "data_freshness": "base_schedule"
            },
            "display_informations": {
                "commercial_mode": "TRANSILIEN",
                "network": "TRANSILIEN",
                "direction": "Saint-Nom-la-Bretèche Forêt de Marly (L'Étang-la-Ville)",
                "label": "L",
                "color": "7584BC",
                "code": "L",
                "headsign": "SEBU",
                "name": "L",
                "links": [
                    {
                        "templated": false,
                        "rel": "origins",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87384008",
                        "category": "origin"
                    },
                    {
                        "templated": false,
                        "rel": "terminus",
                        "internal": true,
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87382481",
                        "category": "terminus"
                    }
                ],
                "text_color": "FFFFFF",
                "trip_short_name": "134683",
                "description": "",
                "physical_mode": "RER / Transilien",
                "equipments": []
            },
            "links": [
                {
                    "type": "line",
                    "id": "line:SNCF:L"
                },
                {
                    "type": "vehicle_journey",
                    "id": "vehicle_journey:SNCF:2025-05-28:134683:1187:RapidTransit"
                },
                {
                    "type": "route",
                    "id": "route:SNCF:L"
                },
                {
                    "type": "commercial_mode",
                    "id": "commercial_mode:TN"
                },
                {
                    "type": "physical_mode",
                    "id": "physical_mode:RapidTransit"
                },
                {
                    "type": "network",
                    "id": "network:SNCF:TN"
                }
            ]
        }
    ],
    "pagination": {
        "total_count": 10,
        "items_per_page": 10,
        "start_page": 0
    }
}

```