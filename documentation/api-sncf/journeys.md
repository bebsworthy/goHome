

## Example Response

```json
{
    "feed_publishers": [
        {
            "id": "sncf",
            "name": "SNCF PIV Production",
            "url": "",
            "license": "Private (unspecified)"
        },
        {
            "id": "SNCF:sncf-piv",
            "name": "SNCF PIV Production",
            "url": "",
            "license": "Private (unspecified)"
        }
    ],
    "links": [
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T184610&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=10",
            "templated": false,
            "rel": "next",
            "type": "next"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T194250&datetime_represents=arrival&data-freshness=realtime&min_nb_journeys=10",
            "templated": false,
            "rel": "prev",
            "type": "prev"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T000000&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=10",
            "templated": false,
            "rel": "first",
            "type": "first"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T235959&datetime_represents=arrival&data-freshness=realtime&min_nb_journeys=10",
            "templated": false,
            "rel": "last",
            "type": "last"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/stop_points/{stop_point.id}",
            "templated": true,
            "rel": "stop_points",
            "type": "stop_point"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/lines/{line.id}",
            "templated": true,
            "rel": "lines",
            "type": "line"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/networks/{network.id}",
            "templated": true,
            "rel": "networks",
            "type": "network"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/{vehicle_journey.id}",
            "templated": true,
            "rel": "vehicle_journeys",
            "type": "vehicle_journey"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/stop_areas/{stop_area.id}",
            "templated": true,
            "rel": "stop_areas",
            "type": "stop_area"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/routes/{route.id}",
            "templated": true,
            "rel": "routes",
            "type": "route"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/commercial_modes/{commercial_mode.id}",
            "templated": true,
            "rel": "commercial_modes",
            "type": "commercial_mode"
        },
        {
            "href": "https://api.sncf.com/v1/coverage/sncf/physical_modes/{physical_mode.id}",
            "templated": true,
            "rel": "physical_modes",
            "type": "physical_mode"
        }
    ],
    "journeys": [
        {
            "duration": 3420,
            "nb_transfers": 0,
            "departure_date_time": "20250529T184600",
            "arrival_date_time": "20250529T194300",
            "requested_date_time": "20250529T183414",
            "type": "best",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 378.20328,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 3420,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "J3fTEQLb5nWQhC8RgCFCRK_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T184600",
                    "arrival_date_time": "20250529T184600",
                    "to": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_9_0",
                    "duration": 3420,
                    "co2_emission": {
                        "value": 378.20328,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T184600",
                    "arrival_date_time": "20250529T194300",
                    "base_departure_date_time": "20250529T184600",
                    "base_arrival_date_time": "20250529T194300",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.185083,
                                48.919964
                            ],
                            [
                                2.041368,
                                48.932901
                            ],
                            [
                                1.999426,
                                48.939509
                            ],
                            [
                                1.982873,
                                48.981188
                            ],
                            [
                                1.955207,
                                48.992338
                            ],
                            [
                                1.913027,
                                48.992725
                            ],
                            [
                                1.848479,
                                48.971923
                            ],
                            [
                                1.808593,
                                48.963122
                            ],
                            [
                                1.715691,
                                48.983664
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 51951
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "TRANSILIEN",
                        "network": "TRANSILIEN",
                        "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "label": "J",
                        "color": "CDCD00",
                        "code": "J",
                        "headsign": "MALA",
                        "name": "J",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "FFFFFF",
                        "trip_short_name": "130861",
                        "description": "",
                        "physical_mode": "RER / Transilien",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:130861:1187:RapidTransit"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:J"
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
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T184600",
                            "base_departure_date_time": "20250529T184600",
                            "arrival_date_time": "20250529T184600",
                            "base_arrival_date_time": "20250529T184600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:RapidTransit",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T185800",
                            "base_departure_date_time": "20250529T185800",
                            "arrival_date_time": "20250529T185700",
                            "base_arrival_date_time": "20250529T185700",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386409:RapidTransit",
                                "name": "Houilles - Carrières-sur-Seine",
                                "label": "Houilles - Carrières-sur-Seine (Houilles)",
                                "coord": {
                                    "lon": "2.185083",
                                    "lat": "48.919964"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T190800",
                            "base_departure_date_time": "20250529T190800",
                            "arrival_date_time": "20250529T190700",
                            "base_arrival_date_time": "20250529T190700",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386573:RapidTransit",
                                "name": "Poissy",
                                "label": "Poissy (Poissy)",
                                "coord": {
                                    "lon": "2.041368",
                                    "lat": "48.932901"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T191200",
                            "base_departure_date_time": "20250529T191200",
                            "arrival_date_time": "20250529T191100",
                            "base_arrival_date_time": "20250529T191100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386649:RapidTransit",
                                "name": "Villennes-sur-Seine",
                                "label": "Villennes-sur-Seine (Villennes-sur-Seine)",
                                "coord": {
                                    "lon": "1.999426",
                                    "lat": "48.939509"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T191700",
                            "base_departure_date_time": "20250529T191700",
                            "arrival_date_time": "20250529T191600",
                            "base_arrival_date_time": "20250529T191600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386656:RapidTransit",
                                "name": "Vernouillet - Verneuil",
                                "label": "Vernouillet - Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.982873",
                                    "lat": "48.981188"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T192000",
                            "base_departure_date_time": "20250529T192000",
                            "arrival_date_time": "20250529T192000",
                            "base_arrival_date_time": "20250529T192000",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386664:RapidTransit",
                                "name": "Les Clairières de Verneuil",
                                "label": "Les Clairières de Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.955207",
                                    "lat": "48.992338"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T192600",
                            "base_departure_date_time": "20250529T192600",
                            "arrival_date_time": "20250529T192500",
                            "base_arrival_date_time": "20250529T192500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386680:RapidTransit",
                                "name": "Les Mureaux",
                                "label": "Les Mureaux (Les Mureaux)",
                                "coord": {
                                    "lon": "1.913027",
                                    "lat": "48.992725"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T193000",
                            "base_departure_date_time": "20250529T193000",
                            "arrival_date_time": "20250529T193000",
                            "base_arrival_date_time": "20250529T193000",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386730:RapidTransit",
                                "name": "Aubergenville Élisabethville",
                                "label": "Aubergenville Élisabethville (Aubergenville)",
                                "coord": {
                                    "lon": "1.848479",
                                    "lat": "48.971923"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T193400",
                            "base_departure_date_time": "20250529T193400",
                            "arrival_date_time": "20250529T193300",
                            "base_arrival_date_time": "20250529T193300",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386763:RapidTransit",
                                "name": "Épône - Mézières",
                                "label": "Épône - Mézières (Épône)",
                                "coord": {
                                    "lon": "1.808593",
                                    "lat": "48.963122"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194000",
                            "base_departure_date_time": "20250529T194000",
                            "arrival_date_time": "20250529T193900",
                            "base_arrival_date_time": "20250529T193900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381590:RapidTransit",
                                "name": "Mantes Station",
                                "label": "Mantes Station (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.715691",
                                    "lat": "48.983664"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194300",
                            "base_departure_date_time": "20250529T194300",
                            "arrival_date_time": "20250529T194300",
                            "base_arrival_date_time": "20250529T194300",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:RapidTransit",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "iBdqheUpU632FdDnsa3ryP_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T194300",
                    "arrival_date_time": "20250529T194300",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T184600&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T184600&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        },
        {
            "duration": 4140,
            "nb_transfers": 0,
            "departure_date_time": "20250529T185200",
            "arrival_date_time": "20250529T200100",
            "requested_date_time": "20250529T183414",
            "type": "rapid",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 399.78848,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 4140,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "77QELL93kSKii3bCE4Coua_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T185200",
                    "arrival_date_time": "20250529T185200",
                    "to": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_8_0",
                    "duration": 4140,
                    "co2_emission": {
                        "value": 399.78848,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T185200",
                    "arrival_date_time": "20250529T200100",
                    "base_departure_date_time": "20250529T185200",
                    "base_arrival_date_time": "20250529T200100",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.25727,
                                48.94686
                            ],
                            [
                                2.23088,
                                48.95042
                            ],
                            [
                                2.193443,
                                48.968668
                            ],
                            [
                                2.18019,
                                48.98035
                            ],
                            [
                                2.161992,
                                48.990386
                            ],
                            [
                                2.09783,
                                48.99646
                            ],
                            [
                                2.074587,
                                48.989261
                            ],
                            [
                                2.059676,
                                48.987126
                            ],
                            [
                                2.04928,
                                48.9747
                            ],
                            [
                                2.027702,
                                48.970893
                            ],
                            [
                                2.005673,
                                48.981018
                            ],
                            [
                                1.963535,
                                49.007006
                            ],
                            [
                                1.91922,
                                49.00687
                            ],
                            [
                                1.90213,
                                49.00564
                            ],
                            [
                                1.84579,
                                48.99244
                            ],
                            [
                                1.808986,
                                48.983151
                            ],
                            [
                                1.78532,
                                48.97931
                            ],
                            [
                                1.747186,
                                48.984158
                            ],
                            [
                                1.715691,
                                48.983664
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 54916
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "TRANSILIEN",
                        "network": "TRANSILIEN",
                        "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "label": "J",
                        "color": "CDCD00",
                        "code": "J",
                        "headsign": "MOCA",
                        "name": "J",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "FFFFFF",
                        "trip_short_name": "136935",
                        "description": "",
                        "physical_mode": "RER / Transilien",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:136935:1187:RapidTransit"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:J"
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
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T185200",
                            "base_departure_date_time": "20250529T185200",
                            "arrival_date_time": "20250529T185200",
                            "base_arrival_date_time": "20250529T185200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:RapidTransit",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T190200",
                            "base_departure_date_time": "20250529T190200",
                            "arrival_date_time": "20250529T190100",
                            "base_arrival_date_time": "20250529T190100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381848:RapidTransit",
                                "name": "Argenteuil",
                                "label": "Argenteuil (Argenteuil)",
                                "coord": {
                                    "lon": "2.25727",
                                    "lat": "48.94686"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T190500",
                            "base_departure_date_time": "20250529T190500",
                            "arrival_date_time": "20250529T190400",
                            "base_arrival_date_time": "20250529T190400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381798:RapidTransit",
                                "name": "Val d'Argenteuil",
                                "label": "Val d'Argenteuil (Argenteuil)",
                                "coord": {
                                    "lon": "2.23088",
                                    "lat": "48.95042"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T190900",
                            "base_departure_date_time": "20250529T190900",
                            "arrival_date_time": "20250529T190800",
                            "base_arrival_date_time": "20250529T190800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381863:RapidTransit",
                                "name": "Cormeilles-en-Parisis",
                                "label": "Cormeilles-en-Parisis (Cormeilles-en-Parisis)",
                                "coord": {
                                    "lon": "2.193443",
                                    "lat": "48.968668"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T191200",
                            "base_departure_date_time": "20250529T191200",
                            "arrival_date_time": "20250529T191100",
                            "base_arrival_date_time": "20250529T191100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381871:RapidTransit",
                                "name": "La Frette - Montigny",
                                "label": "La Frette - Montigny (La Frette-sur-Seine)",
                                "coord": {
                                    "lon": "2.18019",
                                    "lat": "48.98035"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T191400",
                            "base_departure_date_time": "20250529T191400",
                            "arrival_date_time": "20250529T191400",
                            "base_arrival_date_time": "20250529T191400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381889:RapidTransit",
                                "name": "Herblay",
                                "label": "Herblay (Herblay-sur-Seine)",
                                "coord": {
                                    "lon": "2.161992",
                                    "lat": "48.990386"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T191900",
                            "base_departure_date_time": "20250529T191900",
                            "arrival_date_time": "20250529T191800",
                            "base_arrival_date_time": "20250529T191800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381897:RapidTransit",
                                "name": "Conflans-Sainte-Honorine",
                                "label": "Conflans-Sainte-Honorine (Conflans-Sainte-Honorine)",
                                "coord": {
                                    "lon": "2.09783",
                                    "lat": "48.99646"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T192200",
                            "base_departure_date_time": "20250529T192200",
                            "arrival_date_time": "20250529T192100",
                            "base_arrival_date_time": "20250529T192100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381459:RapidTransit",
                                "name": "Conflans Fin d'Oise",
                                "label": "Conflans Fin d'Oise (Conflans-Sainte-Honorine)",
                                "coord": {
                                    "lon": "2.074587",
                                    "lat": "48.989261"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T192400",
                            "base_departure_date_time": "20250529T192400",
                            "arrival_date_time": "20250529T192400",
                            "base_arrival_date_time": "20250529T192400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381483:RapidTransit",
                                "name": "Maurecourt",
                                "label": "Maurecourt (Andrésy)",
                                "coord": {
                                    "lon": "2.059676",
                                    "lat": "48.987126"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T192700",
                            "base_departure_date_time": "20250529T192700",
                            "arrival_date_time": "20250529T192600",
                            "base_arrival_date_time": "20250529T192600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381491:RapidTransit",
                                "name": "Andrésy",
                                "label": "Andrésy (Andrésy)",
                                "coord": {
                                    "lon": "2.04928",
                                    "lat": "48.9747"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T192900",
                            "base_departure_date_time": "20250529T192900",
                            "arrival_date_time": "20250529T192900",
                            "base_arrival_date_time": "20250529T192900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381475:RapidTransit",
                                "name": "Chanteloup-les-Vignes",
                                "label": "Chanteloup-les-Vignes (Chanteloup-les-Vignes)",
                                "coord": {
                                    "lon": "2.027702",
                                    "lat": "48.970893"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T193200",
                            "base_departure_date_time": "20250529T193200",
                            "arrival_date_time": "20250529T193200",
                            "base_arrival_date_time": "20250529T193200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381806:RapidTransit",
                                "name": "Triel-sur-Seine",
                                "label": "Triel-sur-Seine (Triel-sur-Seine)",
                                "coord": {
                                    "lon": "2.005673",
                                    "lat": "48.981018"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T193600",
                            "base_departure_date_time": "20250529T193600",
                            "arrival_date_time": "20250529T193600",
                            "base_arrival_date_time": "20250529T193600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381814:RapidTransit",
                                "name": "Vaux-sur-Seine",
                                "label": "Vaux-sur-Seine (Vaux-sur-Seine)",
                                "coord": {
                                    "lon": "1.963535",
                                    "lat": "49.007006"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194000",
                            "base_departure_date_time": "20250529T194000",
                            "arrival_date_time": "20250529T193900",
                            "base_arrival_date_time": "20250529T193900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381822:RapidTransit",
                                "name": "Thun le Paradis",
                                "label": "Thun le Paradis (Meulan-en-Yvelines)",
                                "coord": {
                                    "lon": "1.91922",
                                    "lat": "49.00687"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194200",
                            "base_departure_date_time": "20250529T194200",
                            "arrival_date_time": "20250529T194200",
                            "base_arrival_date_time": "20250529T194200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381830:RapidTransit",
                                "name": "Meulan - Hardricourt",
                                "label": "Meulan - Hardricourt (Hardricourt)",
                                "coord": {
                                    "lon": "1.90213",
                                    "lat": "49.00564"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194600",
                            "base_departure_date_time": "20250529T194600",
                            "arrival_date_time": "20250529T194600",
                            "base_arrival_date_time": "20250529T194600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381558:RapidTransit",
                                "name": "Juziers",
                                "label": "Juziers (Juziers)",
                                "coord": {
                                    "lon": "1.84579",
                                    "lat": "48.99244"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195000",
                            "base_departure_date_time": "20250529T195000",
                            "arrival_date_time": "20250529T194900",
                            "base_arrival_date_time": "20250529T194900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381566:RapidTransit",
                                "name": "Gargenville",
                                "label": "Gargenville (Gargenville)",
                                "coord": {
                                    "lon": "1.808986",
                                    "lat": "48.983151"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195200",
                            "base_departure_date_time": "20250529T195200",
                            "arrival_date_time": "20250529T195200",
                            "base_arrival_date_time": "20250529T195200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381574:RapidTransit",
                                "name": "Issou - Porcheville",
                                "label": "Issou - Porcheville (Issou)",
                                "coord": {
                                    "lon": "1.78532",
                                    "lat": "48.97931"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195500",
                            "base_departure_date_time": "20250529T195500",
                            "arrival_date_time": "20250529T195500",
                            "base_arrival_date_time": "20250529T195500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381582:RapidTransit",
                                "name": "Limay",
                                "label": "Limay (Limay)",
                                "coord": {
                                    "lon": "1.747186",
                                    "lat": "48.984158"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195900",
                            "base_departure_date_time": "20250529T195900",
                            "arrival_date_time": "20250529T195800",
                            "base_arrival_date_time": "20250529T195800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381590:RapidTransit",
                                "name": "Mantes Station",
                                "label": "Mantes Station (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.715691",
                                    "lat": "48.983664"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T200100",
                            "base_departure_date_time": "20250529T200100",
                            "arrival_date_time": "20250529T200100",
                            "base_arrival_date_time": "20250529T200100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:RapidTransit",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "7YJky8mB35VFMdr76c9hba_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T200100",
                    "arrival_date_time": "20250529T200100",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T185200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T185200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        },
        {
            "duration": 3480,
            "nb_transfers": 0,
            "departure_date_time": "20250529T191600",
            "arrival_date_time": "20250529T201400",
            "requested_date_time": "20250529T183414",
            "type": "rapid",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 378.20328,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 3480,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "fxLjAn4SGPdpvdNGkWsoHf_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T191600",
                    "arrival_date_time": "20250529T191600",
                    "to": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_7_0",
                    "duration": 3480,
                    "co2_emission": {
                        "value": 378.20328,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T191600",
                    "arrival_date_time": "20250529T201400",
                    "base_departure_date_time": "20250529T191600",
                    "base_arrival_date_time": "20250529T201400",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.185083,
                                48.919964
                            ],
                            [
                                2.041368,
                                48.932901
                            ],
                            [
                                1.999426,
                                48.939509
                            ],
                            [
                                1.982873,
                                48.981188
                            ],
                            [
                                1.955207,
                                48.992338
                            ],
                            [
                                1.913027,
                                48.992725
                            ],
                            [
                                1.848479,
                                48.971923
                            ],
                            [
                                1.808593,
                                48.963122
                            ],
                            [
                                1.715691,
                                48.983664
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 51951
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "TRANSILIEN",
                        "network": "TRANSILIEN",
                        "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "label": "J",
                        "color": "CDCD00",
                        "code": "J",
                        "headsign": "MALA",
                        "name": "J",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "FFFFFF",
                        "trip_short_name": "130867",
                        "description": "",
                        "physical_mode": "RER / Transilien",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:130867:1187:RapidTransit"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:J"
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
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T191600",
                            "base_departure_date_time": "20250529T191600",
                            "arrival_date_time": "20250529T191600",
                            "base_arrival_date_time": "20250529T191600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:RapidTransit",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T192700",
                            "base_departure_date_time": "20250529T192700",
                            "arrival_date_time": "20250529T192600",
                            "base_arrival_date_time": "20250529T192600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386409:RapidTransit",
                                "name": "Houilles - Carrières-sur-Seine",
                                "label": "Houilles - Carrières-sur-Seine (Houilles)",
                                "coord": {
                                    "lon": "2.185083",
                                    "lat": "48.919964"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T193700",
                            "base_departure_date_time": "20250529T193700",
                            "arrival_date_time": "20250529T193600",
                            "base_arrival_date_time": "20250529T193600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386573:RapidTransit",
                                "name": "Poissy",
                                "label": "Poissy (Poissy)",
                                "coord": {
                                    "lon": "2.041368",
                                    "lat": "48.932901"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194100",
                            "base_departure_date_time": "20250529T194100",
                            "arrival_date_time": "20250529T194000",
                            "base_arrival_date_time": "20250529T194000",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386649:RapidTransit",
                                "name": "Villennes-sur-Seine",
                                "label": "Villennes-sur-Seine (Villennes-sur-Seine)",
                                "coord": {
                                    "lon": "1.999426",
                                    "lat": "48.939509"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194600",
                            "base_departure_date_time": "20250529T194600",
                            "arrival_date_time": "20250529T194500",
                            "base_arrival_date_time": "20250529T194500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386656:RapidTransit",
                                "name": "Vernouillet - Verneuil",
                                "label": "Vernouillet - Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.982873",
                                    "lat": "48.981188"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194900",
                            "base_departure_date_time": "20250529T194900",
                            "arrival_date_time": "20250529T194900",
                            "base_arrival_date_time": "20250529T194900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386664:RapidTransit",
                                "name": "Les Clairières de Verneuil",
                                "label": "Les Clairières de Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.955207",
                                    "lat": "48.992338"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195400",
                            "base_departure_date_time": "20250529T195400",
                            "arrival_date_time": "20250529T195300",
                            "base_arrival_date_time": "20250529T195300",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386680:RapidTransit",
                                "name": "Les Mureaux",
                                "label": "Les Mureaux (Les Mureaux)",
                                "coord": {
                                    "lon": "1.913027",
                                    "lat": "48.992725"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T200000",
                            "base_departure_date_time": "20250529T200000",
                            "arrival_date_time": "20250529T195900",
                            "base_arrival_date_time": "20250529T195900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386730:RapidTransit",
                                "name": "Aubergenville Élisabethville",
                                "label": "Aubergenville Élisabethville (Aubergenville)",
                                "coord": {
                                    "lon": "1.848479",
                                    "lat": "48.971923"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T200500",
                            "base_departure_date_time": "20250529T200500",
                            "arrival_date_time": "20250529T200400",
                            "base_arrival_date_time": "20250529T200400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386763:RapidTransit",
                                "name": "Épône - Mézières",
                                "label": "Épône - Mézières (Épône)",
                                "coord": {
                                    "lon": "1.808593",
                                    "lat": "48.963122"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T201100",
                            "base_departure_date_time": "20250529T201100",
                            "arrival_date_time": "20250529T201000",
                            "base_arrival_date_time": "20250529T201000",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381590:RapidTransit",
                                "name": "Mantes Station",
                                "label": "Mantes Station (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.715691",
                                    "lat": "48.983664"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T201400",
                            "base_departure_date_time": "20250529T201400",
                            "arrival_date_time": "20250529T201400",
                            "base_arrival_date_time": "20250529T201400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:RapidTransit",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "NrAEXdYfMSTLDfMtbwCErH_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T201400",
                    "arrival_date_time": "20250529T201400",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T191600&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T191600&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        },
        {
            "duration": 4080,
            "nb_transfers": 0,
            "departure_date_time": "20250529T192200",
            "arrival_date_time": "20250529T203000",
            "requested_date_time": "20250529T183414",
            "type": "rapid",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 399.78848,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 4080,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "M8rw2U6AjdAFJX8z5958Ro_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T192200",
                    "arrival_date_time": "20250529T192200",
                    "to": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_6_0",
                    "duration": 4080,
                    "co2_emission": {
                        "value": 399.78848,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T192200",
                    "arrival_date_time": "20250529T203000",
                    "base_departure_date_time": "20250529T192200",
                    "base_arrival_date_time": "20250529T203000",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.25727,
                                48.94686
                            ],
                            [
                                2.23088,
                                48.95042
                            ],
                            [
                                2.193443,
                                48.968668
                            ],
                            [
                                2.18019,
                                48.98035
                            ],
                            [
                                2.161992,
                                48.990386
                            ],
                            [
                                2.09783,
                                48.99646
                            ],
                            [
                                2.074587,
                                48.989261
                            ],
                            [
                                2.059676,
                                48.987126
                            ],
                            [
                                2.04928,
                                48.9747
                            ],
                            [
                                2.027702,
                                48.970893
                            ],
                            [
                                2.005673,
                                48.981018
                            ],
                            [
                                1.963535,
                                49.007006
                            ],
                            [
                                1.91922,
                                49.00687
                            ],
                            [
                                1.90213,
                                49.00564
                            ],
                            [
                                1.84579,
                                48.99244
                            ],
                            [
                                1.808986,
                                48.983151
                            ],
                            [
                                1.78532,
                                48.97931
                            ],
                            [
                                1.747186,
                                48.984158
                            ],
                            [
                                1.715691,
                                48.983664
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 54916
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "TRANSILIEN",
                        "network": "TRANSILIEN",
                        "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "label": "J",
                        "color": "CDCD00",
                        "code": "J",
                        "headsign": "MOCA",
                        "name": "J",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "FFFFFF",
                        "trip_short_name": "136941",
                        "description": "",
                        "physical_mode": "RER / Transilien",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:136941:1187:RapidTransit"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:J"
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
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T192200",
                            "base_departure_date_time": "20250529T192200",
                            "arrival_date_time": "20250529T192200",
                            "base_arrival_date_time": "20250529T192200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:RapidTransit",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T193200",
                            "base_departure_date_time": "20250529T193200",
                            "arrival_date_time": "20250529T193100",
                            "base_arrival_date_time": "20250529T193100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381848:RapidTransit",
                                "name": "Argenteuil",
                                "label": "Argenteuil (Argenteuil)",
                                "coord": {
                                    "lon": "2.25727",
                                    "lat": "48.94686"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T193500",
                            "base_departure_date_time": "20250529T193500",
                            "arrival_date_time": "20250529T193400",
                            "base_arrival_date_time": "20250529T193400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381798:RapidTransit",
                                "name": "Val d'Argenteuil",
                                "label": "Val d'Argenteuil (Argenteuil)",
                                "coord": {
                                    "lon": "2.23088",
                                    "lat": "48.95042"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T193900",
                            "base_departure_date_time": "20250529T193900",
                            "arrival_date_time": "20250529T193800",
                            "base_arrival_date_time": "20250529T193800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381863:RapidTransit",
                                "name": "Cormeilles-en-Parisis",
                                "label": "Cormeilles-en-Parisis (Cormeilles-en-Parisis)",
                                "coord": {
                                    "lon": "2.193443",
                                    "lat": "48.968668"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194200",
                            "base_departure_date_time": "20250529T194200",
                            "arrival_date_time": "20250529T194100",
                            "base_arrival_date_time": "20250529T194100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381871:RapidTransit",
                                "name": "La Frette - Montigny",
                                "label": "La Frette - Montigny (La Frette-sur-Seine)",
                                "coord": {
                                    "lon": "2.18019",
                                    "lat": "48.98035"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194400",
                            "base_departure_date_time": "20250529T194400",
                            "arrival_date_time": "20250529T194400",
                            "base_arrival_date_time": "20250529T194400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381889:RapidTransit",
                                "name": "Herblay",
                                "label": "Herblay (Herblay-sur-Seine)",
                                "coord": {
                                    "lon": "2.161992",
                                    "lat": "48.990386"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T194900",
                            "base_departure_date_time": "20250529T194900",
                            "arrival_date_time": "20250529T194800",
                            "base_arrival_date_time": "20250529T194800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381897:RapidTransit",
                                "name": "Conflans-Sainte-Honorine",
                                "label": "Conflans-Sainte-Honorine (Conflans-Sainte-Honorine)",
                                "coord": {
                                    "lon": "2.09783",
                                    "lat": "48.99646"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195100",
                            "base_departure_date_time": "20250529T195100",
                            "arrival_date_time": "20250529T195100",
                            "base_arrival_date_time": "20250529T195100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381459:RapidTransit",
                                "name": "Conflans Fin d'Oise",
                                "label": "Conflans Fin d'Oise (Conflans-Sainte-Honorine)",
                                "coord": {
                                    "lon": "2.074587",
                                    "lat": "48.989261"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195400",
                            "base_departure_date_time": "20250529T195400",
                            "arrival_date_time": "20250529T195300",
                            "base_arrival_date_time": "20250529T195300",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381483:RapidTransit",
                                "name": "Maurecourt",
                                "label": "Maurecourt (Andrésy)",
                                "coord": {
                                    "lon": "2.059676",
                                    "lat": "48.987126"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195600",
                            "base_departure_date_time": "20250529T195600",
                            "arrival_date_time": "20250529T195600",
                            "base_arrival_date_time": "20250529T195600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381491:RapidTransit",
                                "name": "Andrésy",
                                "label": "Andrésy (Andrésy)",
                                "coord": {
                                    "lon": "2.04928",
                                    "lat": "48.9747"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195900",
                            "base_departure_date_time": "20250529T195900",
                            "arrival_date_time": "20250529T195800",
                            "base_arrival_date_time": "20250529T195800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381475:RapidTransit",
                                "name": "Chanteloup-les-Vignes",
                                "label": "Chanteloup-les-Vignes (Chanteloup-les-Vignes)",
                                "coord": {
                                    "lon": "2.027702",
                                    "lat": "48.970893"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T200200",
                            "base_departure_date_time": "20250529T200200",
                            "arrival_date_time": "20250529T200100",
                            "base_arrival_date_time": "20250529T200100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381806:RapidTransit",
                                "name": "Triel-sur-Seine",
                                "label": "Triel-sur-Seine (Triel-sur-Seine)",
                                "coord": {
                                    "lon": "2.005673",
                                    "lat": "48.981018"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T200600",
                            "base_departure_date_time": "20250529T200600",
                            "arrival_date_time": "20250529T200500",
                            "base_arrival_date_time": "20250529T200500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381814:RapidTransit",
                                "name": "Vaux-sur-Seine",
                                "label": "Vaux-sur-Seine (Vaux-sur-Seine)",
                                "coord": {
                                    "lon": "1.963535",
                                    "lat": "49.007006"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T200900",
                            "base_departure_date_time": "20250529T200900",
                            "arrival_date_time": "20250529T200900",
                            "base_arrival_date_time": "20250529T200900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381822:RapidTransit",
                                "name": "Thun le Paradis",
                                "label": "Thun le Paradis (Meulan-en-Yvelines)",
                                "coord": {
                                    "lon": "1.91922",
                                    "lat": "49.00687"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T201100",
                            "base_departure_date_time": "20250529T201100",
                            "arrival_date_time": "20250529T201100",
                            "base_arrival_date_time": "20250529T201100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381830:RapidTransit",
                                "name": "Meulan - Hardricourt",
                                "label": "Meulan - Hardricourt (Hardricourt)",
                                "coord": {
                                    "lon": "1.90213",
                                    "lat": "49.00564"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T201600",
                            "base_departure_date_time": "20250529T201600",
                            "arrival_date_time": "20250529T201500",
                            "base_arrival_date_time": "20250529T201500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381558:RapidTransit",
                                "name": "Juziers",
                                "label": "Juziers (Juziers)",
                                "coord": {
                                    "lon": "1.84579",
                                    "lat": "48.99244"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T201900",
                            "base_departure_date_time": "20250529T201900",
                            "arrival_date_time": "20250529T201800",
                            "base_arrival_date_time": "20250529T201800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381566:RapidTransit",
                                "name": "Gargenville",
                                "label": "Gargenville (Gargenville)",
                                "coord": {
                                    "lon": "1.808986",
                                    "lat": "48.983151"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T202100",
                            "base_departure_date_time": "20250529T202100",
                            "arrival_date_time": "20250529T202100",
                            "base_arrival_date_time": "20250529T202100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381574:RapidTransit",
                                "name": "Issou - Porcheville",
                                "label": "Issou - Porcheville (Issou)",
                                "coord": {
                                    "lon": "1.78532",
                                    "lat": "48.97931"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T202400",
                            "base_departure_date_time": "20250529T202400",
                            "arrival_date_time": "20250529T202400",
                            "base_arrival_date_time": "20250529T202400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381582:RapidTransit",
                                "name": "Limay",
                                "label": "Limay (Limay)",
                                "coord": {
                                    "lon": "1.747186",
                                    "lat": "48.984158"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T202800",
                            "base_departure_date_time": "20250529T202800",
                            "arrival_date_time": "20250529T202700",
                            "base_arrival_date_time": "20250529T202700",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381590:RapidTransit",
                                "name": "Mantes Station",
                                "label": "Mantes Station (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.715691",
                                    "lat": "48.983664"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T203000",
                            "base_departure_date_time": "20250529T203000",
                            "arrival_date_time": "20250529T203000",
                            "base_arrival_date_time": "20250529T203000",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:RapidTransit",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "2cbMBCbh8ZkbFBpTTtzgT6_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T203000",
                    "arrival_date_time": "20250529T203000",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T192200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T192200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        },
        {
            "duration": 3600,
            "nb_transfers": 0,
            "departure_date_time": "20250529T194600",
            "arrival_date_time": "20250529T204600",
            "requested_date_time": "20250529T183414",
            "type": "rapid",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 378.20328,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 3600,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "hqVRkbV8uKBTV87kF5varV_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T194600",
                    "arrival_date_time": "20250529T194600",
                    "to": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_4_0",
                    "duration": 3600,
                    "co2_emission": {
                        "value": 378.20328,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T194600",
                    "arrival_date_time": "20250529T204600",
                    "base_departure_date_time": "20250529T194600",
                    "base_arrival_date_time": "20250529T204600",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.185083,
                                48.919964
                            ],
                            [
                                2.041368,
                                48.932901
                            ],
                            [
                                1.999426,
                                48.939509
                            ],
                            [
                                1.982873,
                                48.981188
                            ],
                            [
                                1.955207,
                                48.992338
                            ],
                            [
                                1.913027,
                                48.992725
                            ],
                            [
                                1.848479,
                                48.971923
                            ],
                            [
                                1.808593,
                                48.963122
                            ],
                            [
                                1.715691,
                                48.983664
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 51951
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "TRANSILIEN",
                        "network": "TRANSILIEN",
                        "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "label": "J",
                        "color": "CDCD00",
                        "code": "J",
                        "headsign": "MALA",
                        "name": "J",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "FFFFFF",
                        "trip_short_name": "130877",
                        "description": "",
                        "physical_mode": "RER / Transilien",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:130877:1187:RapidTransit"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:J"
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
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T194600",
                            "base_departure_date_time": "20250529T194600",
                            "arrival_date_time": "20250529T194600",
                            "base_arrival_date_time": "20250529T194600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:RapidTransit",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T195800",
                            "base_departure_date_time": "20250529T195800",
                            "arrival_date_time": "20250529T195700",
                            "base_arrival_date_time": "20250529T195700",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386409:RapidTransit",
                                "name": "Houilles - Carrières-sur-Seine",
                                "label": "Houilles - Carrières-sur-Seine (Houilles)",
                                "coord": {
                                    "lon": "2.185083",
                                    "lat": "48.919964"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T200700",
                            "base_departure_date_time": "20250529T200700",
                            "arrival_date_time": "20250529T200600",
                            "base_arrival_date_time": "20250529T200600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386573:RapidTransit",
                                "name": "Poissy",
                                "label": "Poissy (Poissy)",
                                "coord": {
                                    "lon": "2.041368",
                                    "lat": "48.932901"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T201100",
                            "base_departure_date_time": "20250529T201100",
                            "arrival_date_time": "20250529T201100",
                            "base_arrival_date_time": "20250529T201100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386649:RapidTransit",
                                "name": "Villennes-sur-Seine",
                                "label": "Villennes-sur-Seine (Villennes-sur-Seine)",
                                "coord": {
                                    "lon": "1.999426",
                                    "lat": "48.939509"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T201700",
                            "base_departure_date_time": "20250529T201700",
                            "arrival_date_time": "20250529T201500",
                            "base_arrival_date_time": "20250529T201500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386656:RapidTransit",
                                "name": "Vernouillet - Verneuil",
                                "label": "Vernouillet - Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.982873",
                                    "lat": "48.981188"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T202200",
                            "base_departure_date_time": "20250529T202200",
                            "arrival_date_time": "20250529T202000",
                            "base_arrival_date_time": "20250529T202000",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386664:RapidTransit",
                                "name": "Les Clairières de Verneuil",
                                "label": "Les Clairières de Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.955207",
                                    "lat": "48.992338"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T202700",
                            "base_departure_date_time": "20250529T202700",
                            "arrival_date_time": "20250529T202600",
                            "base_arrival_date_time": "20250529T202600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386680:RapidTransit",
                                "name": "Les Mureaux",
                                "label": "Les Mureaux (Les Mureaux)",
                                "coord": {
                                    "lon": "1.913027",
                                    "lat": "48.992725"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T203200",
                            "base_departure_date_time": "20250529T203200",
                            "arrival_date_time": "20250529T203200",
                            "base_arrival_date_time": "20250529T203200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386730:RapidTransit",
                                "name": "Aubergenville Élisabethville",
                                "label": "Aubergenville Élisabethville (Aubergenville)",
                                "coord": {
                                    "lon": "1.848479",
                                    "lat": "48.971923"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T203600",
                            "base_departure_date_time": "20250529T203600",
                            "arrival_date_time": "20250529T203500",
                            "base_arrival_date_time": "20250529T203500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386763:RapidTransit",
                                "name": "Épône - Mézières",
                                "label": "Épône - Mézières (Épône)",
                                "coord": {
                                    "lon": "1.808593",
                                    "lat": "48.963122"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T204300",
                            "base_departure_date_time": "20250529T204300",
                            "arrival_date_time": "20250529T204200",
                            "base_arrival_date_time": "20250529T204200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381590:RapidTransit",
                                "name": "Mantes Station",
                                "label": "Mantes Station (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.715691",
                                    "lat": "48.983664"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T204600",
                            "base_departure_date_time": "20250529T204600",
                            "arrival_date_time": "20250529T204600",
                            "base_arrival_date_time": "20250529T204600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:RapidTransit",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "R2jYNpTApi5M8LQMpZpSi8_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T204600",
                    "arrival_date_time": "20250529T204600",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T194600&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T194600&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        },
        {
            "duration": 2220,
            "nb_transfers": 0,
            "departure_date_time": "20250529T201200",
            "arrival_date_time": "20250529T204900",
            "requested_date_time": "20250529T183414",
            "type": "rapid",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 561.3111,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 2220,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "spH334zkvwssVMjTbcAxhn_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T201200",
                    "arrival_date_time": "20250529T201200",
                    "to": {
                        "id": "stop_point:SNCF:87384008:Train",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:Train",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_3_0",
                    "duration": 2220,
                    "co2_emission": {
                        "value": 561.3111,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T201200",
                    "arrival_date_time": "20250529T204900",
                    "base_departure_date_time": "20250529T201200",
                    "base_arrival_date_time": "20250529T204900",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:Train",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:Train",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:Train",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:Train",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 47169
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "NOMAD",
                        "network": "NOMAD",
                        "direction": "Rouen Rive Droite (Rouen)",
                        "label": "C1",
                        "color": "",
                        "code": "C1",
                        "headsign": "13155",
                        "name": "C1",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "",
                        "trip_short_name": "13155",
                        "description": "",
                        "physical_mode": "TER / Intercités",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:13155:1187:Train"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:FR:Line::97E911FA-C8F2-4861-AD3C-C36CF4750A49:"
                        },
                        {
                            "type": "route",
                            "id": "route:SNCF:FR:Line::97E911FA-C8F2-4861-AD3C-C36CF4750A49:"
                        },
                        {
                            "type": "commercial_mode",
                            "id": "commercial_mode:FR:Branding::3b6b9052-6f3e-4ea4-866f-3bd913db6b22:"
                        },
                        {
                            "type": "physical_mode",
                            "id": "physical_mode:Train"
                        },
                        {
                            "type": "network",
                            "id": "network:SNCF:FR:Branding::3b6b9052-6f3e-4ea4-866f-3bd913db6b22:"
                        }
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T201200",
                            "base_departure_date_time": "20250529T201200",
                            "arrival_date_time": "20250529T201200",
                            "base_arrival_date_time": "20250529T201200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:Train",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T205100",
                            "base_departure_date_time": "20250529T205100",
                            "arrival_date_time": "20250529T204900",
                            "base_arrival_date_time": "20250529T204900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:Train",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "w7yZsF7ApTeQphnutbULh7_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T204900",
                    "arrival_date_time": "20250529T204900",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:Train",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:Train",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T201200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ATrain&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ATrain&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T201200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ATrain&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ATrain&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        },
        {
            "duration": 3540,
            "nb_transfers": 0,
            "departure_date_time": "20250529T201600",
            "arrival_date_time": "20250529T211500",
            "requested_date_time": "20250529T183414",
            "type": "rapid",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 378.20328,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 3540,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "7M3pcJG7ccaTaPjuiFrox6_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T201600",
                    "arrival_date_time": "20250529T201600",
                    "to": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_2_0",
                    "duration": 3540,
                    "co2_emission": {
                        "value": 378.20328,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T201600",
                    "arrival_date_time": "20250529T211500",
                    "base_departure_date_time": "20250529T201600",
                    "base_arrival_date_time": "20250529T211500",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.185083,
                                48.919964
                            ],
                            [
                                2.041368,
                                48.932901
                            ],
                            [
                                1.999426,
                                48.939509
                            ],
                            [
                                1.982873,
                                48.981188
                            ],
                            [
                                1.955207,
                                48.992338
                            ],
                            [
                                1.913027,
                                48.992725
                            ],
                            [
                                1.848479,
                                48.971923
                            ],
                            [
                                1.808593,
                                48.963122
                            ],
                            [
                                1.715691,
                                48.983664
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 51951
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "TRANSILIEN",
                        "network": "TRANSILIEN",
                        "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "label": "J",
                        "color": "CDCD00",
                        "code": "J",
                        "headsign": "MALA",
                        "name": "J",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "FFFFFF",
                        "trip_short_name": "130879",
                        "description": "",
                        "physical_mode": "RER / Transilien",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:130879:1187:RapidTransit"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:J"
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
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T201600",
                            "base_departure_date_time": "20250529T201600",
                            "arrival_date_time": "20250529T201600",
                            "base_arrival_date_time": "20250529T201600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:RapidTransit",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T202800",
                            "base_departure_date_time": "20250529T202800",
                            "arrival_date_time": "20250529T202700",
                            "base_arrival_date_time": "20250529T202700",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386409:RapidTransit",
                                "name": "Houilles - Carrières-sur-Seine",
                                "label": "Houilles - Carrières-sur-Seine (Houilles)",
                                "coord": {
                                    "lon": "2.185083",
                                    "lat": "48.919964"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T203800",
                            "base_departure_date_time": "20250529T203800",
                            "arrival_date_time": "20250529T203700",
                            "base_arrival_date_time": "20250529T203700",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386573:RapidTransit",
                                "name": "Poissy",
                                "label": "Poissy (Poissy)",
                                "coord": {
                                    "lon": "2.041368",
                                    "lat": "48.932901"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T204200",
                            "base_departure_date_time": "20250529T204200",
                            "arrival_date_time": "20250529T204100",
                            "base_arrival_date_time": "20250529T204100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386649:RapidTransit",
                                "name": "Villennes-sur-Seine",
                                "label": "Villennes-sur-Seine (Villennes-sur-Seine)",
                                "coord": {
                                    "lon": "1.999426",
                                    "lat": "48.939509"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T204600",
                            "base_departure_date_time": "20250529T204600",
                            "arrival_date_time": "20250529T204500",
                            "base_arrival_date_time": "20250529T204500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386656:RapidTransit",
                                "name": "Vernouillet - Verneuil",
                                "label": "Vernouillet - Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.982873",
                                    "lat": "48.981188"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T205000",
                            "base_departure_date_time": "20250529T205000",
                            "arrival_date_time": "20250529T204900",
                            "base_arrival_date_time": "20250529T204900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386664:RapidTransit",
                                "name": "Les Clairières de Verneuil",
                                "label": "Les Clairières de Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.955207",
                                    "lat": "48.992338"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T205600",
                            "base_departure_date_time": "20250529T205600",
                            "arrival_date_time": "20250529T205500",
                            "base_arrival_date_time": "20250529T205500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386680:RapidTransit",
                                "name": "Les Mureaux",
                                "label": "Les Mureaux (Les Mureaux)",
                                "coord": {
                                    "lon": "1.913027",
                                    "lat": "48.992725"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T210100",
                            "base_departure_date_time": "20250529T210100",
                            "arrival_date_time": "20250529T210100",
                            "base_arrival_date_time": "20250529T210100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386730:RapidTransit",
                                "name": "Aubergenville Élisabethville",
                                "label": "Aubergenville Élisabethville (Aubergenville)",
                                "coord": {
                                    "lon": "1.848479",
                                    "lat": "48.971923"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T210500",
                            "base_departure_date_time": "20250529T210500",
                            "arrival_date_time": "20250529T210500",
                            "base_arrival_date_time": "20250529T210500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386763:RapidTransit",
                                "name": "Épône - Mézières",
                                "label": "Épône - Mézières (Épône)",
                                "coord": {
                                    "lon": "1.808593",
                                    "lat": "48.963122"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T211300",
                            "base_departure_date_time": "20250529T211300",
                            "arrival_date_time": "20250529T211200",
                            "base_arrival_date_time": "20250529T211200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381590:RapidTransit",
                                "name": "Mantes Station",
                                "label": "Mantes Station (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.715691",
                                    "lat": "48.983664"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T211500",
                            "base_departure_date_time": "20250529T211500",
                            "arrival_date_time": "20250529T211500",
                            "base_arrival_date_time": "20250529T211500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:RapidTransit",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "KgDdXVotpX8L3tJS8zW6aP_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T211500",
                    "arrival_date_time": "20250529T211500",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T201600&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T201600&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        },
        {
            "duration": 4140,
            "nb_transfers": 0,
            "departure_date_time": "20250529T202200",
            "arrival_date_time": "20250529T213100",
            "requested_date_time": "20250529T183414",
            "type": "rapid",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 399.78848,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 4140,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "naSHNrLaYf7bhk4NfSZStF_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T202200",
                    "arrival_date_time": "20250529T202200",
                    "to": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_1_0",
                    "duration": 4140,
                    "co2_emission": {
                        "value": 399.78848,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T202200",
                    "arrival_date_time": "20250529T213100",
                    "base_departure_date_time": "20250529T202200",
                    "base_arrival_date_time": "20250529T213100",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.25727,
                                48.94686
                            ],
                            [
                                2.23088,
                                48.95042
                            ],
                            [
                                2.193443,
                                48.968668
                            ],
                            [
                                2.18019,
                                48.98035
                            ],
                            [
                                2.161992,
                                48.990386
                            ],
                            [
                                2.09783,
                                48.99646
                            ],
                            [
                                2.074587,
                                48.989261
                            ],
                            [
                                2.059676,
                                48.987126
                            ],
                            [
                                2.04928,
                                48.9747
                            ],
                            [
                                2.027702,
                                48.970893
                            ],
                            [
                                2.005673,
                                48.981018
                            ],
                            [
                                1.963535,
                                49.007006
                            ],
                            [
                                1.91922,
                                49.00687
                            ],
                            [
                                1.90213,
                                49.00564
                            ],
                            [
                                1.84579,
                                48.99244
                            ],
                            [
                                1.808986,
                                48.983151
                            ],
                            [
                                1.78532,
                                48.97931
                            ],
                            [
                                1.747186,
                                48.984158
                            ],
                            [
                                1.715691,
                                48.983664
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 54916
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "TRANSILIEN",
                        "network": "TRANSILIEN",
                        "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "label": "J",
                        "color": "CDCD00",
                        "code": "J",
                        "headsign": "MOCA",
                        "name": "J",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "FFFFFF",
                        "trip_short_name": "136955",
                        "description": "",
                        "physical_mode": "RER / Transilien",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:136955:1187:RapidTransit"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:J"
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
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T202200",
                            "base_departure_date_time": "20250529T202200",
                            "arrival_date_time": "20250529T202200",
                            "base_arrival_date_time": "20250529T202200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:RapidTransit",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T203200",
                            "base_departure_date_time": "20250529T203200",
                            "arrival_date_time": "20250529T203100",
                            "base_arrival_date_time": "20250529T203100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381848:RapidTransit",
                                "name": "Argenteuil",
                                "label": "Argenteuil (Argenteuil)",
                                "coord": {
                                    "lon": "2.25727",
                                    "lat": "48.94686"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T203500",
                            "base_departure_date_time": "20250529T203500",
                            "arrival_date_time": "20250529T203400",
                            "base_arrival_date_time": "20250529T203400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381798:RapidTransit",
                                "name": "Val d'Argenteuil",
                                "label": "Val d'Argenteuil (Argenteuil)",
                                "coord": {
                                    "lon": "2.23088",
                                    "lat": "48.95042"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T203900",
                            "base_departure_date_time": "20250529T203900",
                            "arrival_date_time": "20250529T203800",
                            "base_arrival_date_time": "20250529T203800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381863:RapidTransit",
                                "name": "Cormeilles-en-Parisis",
                                "label": "Cormeilles-en-Parisis (Cormeilles-en-Parisis)",
                                "coord": {
                                    "lon": "2.193443",
                                    "lat": "48.968668"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T204200",
                            "base_departure_date_time": "20250529T204200",
                            "arrival_date_time": "20250529T204100",
                            "base_arrival_date_time": "20250529T204100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381871:RapidTransit",
                                "name": "La Frette - Montigny",
                                "label": "La Frette - Montigny (La Frette-sur-Seine)",
                                "coord": {
                                    "lon": "2.18019",
                                    "lat": "48.98035"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T204400",
                            "base_departure_date_time": "20250529T204400",
                            "arrival_date_time": "20250529T204400",
                            "base_arrival_date_time": "20250529T204400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381889:RapidTransit",
                                "name": "Herblay",
                                "label": "Herblay (Herblay-sur-Seine)",
                                "coord": {
                                    "lon": "2.161992",
                                    "lat": "48.990386"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T204900",
                            "base_departure_date_time": "20250529T204900",
                            "arrival_date_time": "20250529T204800",
                            "base_arrival_date_time": "20250529T204800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381897:RapidTransit",
                                "name": "Conflans-Sainte-Honorine",
                                "label": "Conflans-Sainte-Honorine (Conflans-Sainte-Honorine)",
                                "coord": {
                                    "lon": "2.09783",
                                    "lat": "48.99646"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T205100",
                            "base_departure_date_time": "20250529T205100",
                            "arrival_date_time": "20250529T205100",
                            "base_arrival_date_time": "20250529T205100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381459:RapidTransit",
                                "name": "Conflans Fin d'Oise",
                                "label": "Conflans Fin d'Oise (Conflans-Sainte-Honorine)",
                                "coord": {
                                    "lon": "2.074587",
                                    "lat": "48.989261"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T205400",
                            "base_departure_date_time": "20250529T205400",
                            "arrival_date_time": "20250529T205300",
                            "base_arrival_date_time": "20250529T205300",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381483:RapidTransit",
                                "name": "Maurecourt",
                                "label": "Maurecourt (Andrésy)",
                                "coord": {
                                    "lon": "2.059676",
                                    "lat": "48.987126"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T205600",
                            "base_departure_date_time": "20250529T205600",
                            "arrival_date_time": "20250529T205600",
                            "base_arrival_date_time": "20250529T205600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381491:RapidTransit",
                                "name": "Andrésy",
                                "label": "Andrésy (Andrésy)",
                                "coord": {
                                    "lon": "2.04928",
                                    "lat": "48.9747"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T205900",
                            "base_departure_date_time": "20250529T205900",
                            "arrival_date_time": "20250529T205800",
                            "base_arrival_date_time": "20250529T205800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381475:RapidTransit",
                                "name": "Chanteloup-les-Vignes",
                                "label": "Chanteloup-les-Vignes (Chanteloup-les-Vignes)",
                                "coord": {
                                    "lon": "2.027702",
                                    "lat": "48.970893"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T210200",
                            "base_departure_date_time": "20250529T210200",
                            "arrival_date_time": "20250529T210100",
                            "base_arrival_date_time": "20250529T210100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381806:RapidTransit",
                                "name": "Triel-sur-Seine",
                                "label": "Triel-sur-Seine (Triel-sur-Seine)",
                                "coord": {
                                    "lon": "2.005673",
                                    "lat": "48.981018"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T210600",
                            "base_departure_date_time": "20250529T210600",
                            "arrival_date_time": "20250529T210500",
                            "base_arrival_date_time": "20250529T210500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381814:RapidTransit",
                                "name": "Vaux-sur-Seine",
                                "label": "Vaux-sur-Seine (Vaux-sur-Seine)",
                                "coord": {
                                    "lon": "1.963535",
                                    "lat": "49.007006"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T210900",
                            "base_departure_date_time": "20250529T210900",
                            "arrival_date_time": "20250529T210900",
                            "base_arrival_date_time": "20250529T210900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381822:RapidTransit",
                                "name": "Thun le Paradis",
                                "label": "Thun le Paradis (Meulan-en-Yvelines)",
                                "coord": {
                                    "lon": "1.91922",
                                    "lat": "49.00687"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T211100",
                            "base_departure_date_time": "20250529T211100",
                            "arrival_date_time": "20250529T211100",
                            "base_arrival_date_time": "20250529T211100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381830:RapidTransit",
                                "name": "Meulan - Hardricourt",
                                "label": "Meulan - Hardricourt (Hardricourt)",
                                "coord": {
                                    "lon": "1.90213",
                                    "lat": "49.00564"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T211600",
                            "base_departure_date_time": "20250529T211600",
                            "arrival_date_time": "20250529T211500",
                            "base_arrival_date_time": "20250529T211500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381558:RapidTransit",
                                "name": "Juziers",
                                "label": "Juziers (Juziers)",
                                "coord": {
                                    "lon": "1.84579",
                                    "lat": "48.99244"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T211900",
                            "base_departure_date_time": "20250529T211900",
                            "arrival_date_time": "20250529T211800",
                            "base_arrival_date_time": "20250529T211800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381566:RapidTransit",
                                "name": "Gargenville",
                                "label": "Gargenville (Gargenville)",
                                "coord": {
                                    "lon": "1.808986",
                                    "lat": "48.983151"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T212200",
                            "base_departure_date_time": "20250529T212200",
                            "arrival_date_time": "20250529T212200",
                            "base_arrival_date_time": "20250529T212200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381574:RapidTransit",
                                "name": "Issou - Porcheville",
                                "label": "Issou - Porcheville (Issou)",
                                "coord": {
                                    "lon": "1.78532",
                                    "lat": "48.97931"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T212500",
                            "base_departure_date_time": "20250529T212500",
                            "arrival_date_time": "20250529T212500",
                            "base_arrival_date_time": "20250529T212500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381582:RapidTransit",
                                "name": "Limay",
                                "label": "Limay (Limay)",
                                "coord": {
                                    "lon": "1.747186",
                                    "lat": "48.984158"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T212900",
                            "base_departure_date_time": "20250529T212900",
                            "arrival_date_time": "20250529T212800",
                            "base_arrival_date_time": "20250529T212800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381590:RapidTransit",
                                "name": "Mantes Station",
                                "label": "Mantes Station (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.715691",
                                    "lat": "48.983664"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T213100",
                            "base_departure_date_time": "20250529T213100",
                            "arrival_date_time": "20250529T213100",
                            "base_arrival_date_time": "20250529T213100",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:RapidTransit",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "5bXgb6yphgkSrY82KAfY92_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T213100",
                    "arrival_date_time": "20250529T213100",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T202200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T202200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        },
        {
            "duration": 3480,
            "nb_transfers": 0,
            "departure_date_time": "20250529T204500",
            "arrival_date_time": "20250529T214300",
            "requested_date_time": "20250529T183414",
            "type": "rapid",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 378.20328,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 3480,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "FEnjaCMUT8w6n6WmBPJwSm_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T204500",
                    "arrival_date_time": "20250529T204500",
                    "to": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_5_0",
                    "duration": 3480,
                    "co2_emission": {
                        "value": 378.20328,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T204500",
                    "arrival_date_time": "20250529T214300",
                    "base_departure_date_time": "20250529T204500",
                    "base_arrival_date_time": "20250529T214300",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:RapidTransit",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:RapidTransit",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.185083,
                                48.919964
                            ],
                            [
                                2.041368,
                                48.932901
                            ],
                            [
                                1.999426,
                                48.939509
                            ],
                            [
                                1.982873,
                                48.981188
                            ],
                            [
                                1.955207,
                                48.992338
                            ],
                            [
                                1.913027,
                                48.992725
                            ],
                            [
                                1.848479,
                                48.971923
                            ],
                            [
                                1.808593,
                                48.963122
                            ],
                            [
                                1.715691,
                                48.983664
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 51951
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "TRANSILIEN",
                        "network": "TRANSILIEN",
                        "direction": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "label": "J",
                        "color": "CDCD00",
                        "code": "J",
                        "headsign": "MALA",
                        "name": "J",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "FFFFFF",
                        "trip_short_name": "130885",
                        "description": "",
                        "physical_mode": "RER / Transilien",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:130885:1187:RapidTransit"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:J"
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
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T204500",
                            "base_departure_date_time": "20250529T204500",
                            "arrival_date_time": "20250529T204500",
                            "base_arrival_date_time": "20250529T204500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:RapidTransit",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T205700",
                            "base_departure_date_time": "20250529T205700",
                            "arrival_date_time": "20250529T205600",
                            "base_arrival_date_time": "20250529T205600",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386409:RapidTransit",
                                "name": "Houilles - Carrières-sur-Seine",
                                "label": "Houilles - Carrières-sur-Seine (Houilles)",
                                "coord": {
                                    "lon": "2.185083",
                                    "lat": "48.919964"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T210600",
                            "base_departure_date_time": "20250529T210600",
                            "arrival_date_time": "20250529T210500",
                            "base_arrival_date_time": "20250529T210500",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386573:RapidTransit",
                                "name": "Poissy",
                                "label": "Poissy (Poissy)",
                                "coord": {
                                    "lon": "2.041368",
                                    "lat": "48.932901"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T211100",
                            "base_departure_date_time": "20250529T211100",
                            "arrival_date_time": "20250529T211000",
                            "base_arrival_date_time": "20250529T211000",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386649:RapidTransit",
                                "name": "Villennes-sur-Seine",
                                "label": "Villennes-sur-Seine (Villennes-sur-Seine)",
                                "coord": {
                                    "lon": "1.999426",
                                    "lat": "48.939509"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T211500",
                            "base_departure_date_time": "20250529T211500",
                            "arrival_date_time": "20250529T211400",
                            "base_arrival_date_time": "20250529T211400",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386656:RapidTransit",
                                "name": "Vernouillet - Verneuil",
                                "label": "Vernouillet - Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.982873",
                                    "lat": "48.981188"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T211800",
                            "base_departure_date_time": "20250529T211800",
                            "arrival_date_time": "20250529T211700",
                            "base_arrival_date_time": "20250529T211700",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386664:RapidTransit",
                                "name": "Les Clairières de Verneuil",
                                "label": "Les Clairières de Verneuil (Verneuil-sur-Seine)",
                                "coord": {
                                    "lon": "1.955207",
                                    "lat": "48.992338"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T212400",
                            "base_departure_date_time": "20250529T212400",
                            "arrival_date_time": "20250529T212300",
                            "base_arrival_date_time": "20250529T212300",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386680:RapidTransit",
                                "name": "Les Mureaux",
                                "label": "Les Mureaux (Les Mureaux)",
                                "coord": {
                                    "lon": "1.913027",
                                    "lat": "48.992725"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T212900",
                            "base_departure_date_time": "20250529T212900",
                            "arrival_date_time": "20250529T212900",
                            "base_arrival_date_time": "20250529T212900",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386730:RapidTransit",
                                "name": "Aubergenville Élisabethville",
                                "label": "Aubergenville Élisabethville (Aubergenville)",
                                "coord": {
                                    "lon": "1.848479",
                                    "lat": "48.971923"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T213300",
                            "base_departure_date_time": "20250529T213300",
                            "arrival_date_time": "20250529T213300",
                            "base_arrival_date_time": "20250529T213300",
                            "stop_point": {
                                "id": "stop_point:SNCF:87386763:RapidTransit",
                                "name": "Épône - Mézières",
                                "label": "Épône - Mézières (Épône)",
                                "coord": {
                                    "lon": "1.808593",
                                    "lat": "48.963122"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T214000",
                            "base_departure_date_time": "20250529T214000",
                            "arrival_date_time": "20250529T214000",
                            "base_arrival_date_time": "20250529T214000",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381590:RapidTransit",
                                "name": "Mantes Station",
                                "label": "Mantes Station (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.715691",
                                    "lat": "48.983664"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T214300",
                            "base_departure_date_time": "20250529T214300",
                            "arrival_date_time": "20250529T214300",
                            "base_arrival_date_time": "20250529T214300",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:RapidTransit",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "enEmaAm6qNvQAW2RPQvVw9_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T214300",
                    "arrival_date_time": "20250529T214300",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:RapidTransit",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:RapidTransit",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T204500&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T204500&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ARapidTransit&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ARapidTransit&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        },
        {
            "duration": 2160,
            "nb_transfers": 0,
            "departure_date_time": "20250529T211200",
            "arrival_date_time": "20250529T214800",
            "requested_date_time": "20250529T183414",
            "type": "fastest",
            "status": "",
            "tags": [
                "walking",
                "reliable",
                "ecologic"
            ],
            "co2_emission": {
                "value": 561.3111,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 0,
                    "pm": 0
                }
            },
            "durations": {
                "total": 2160,
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "distances": {
                "walking": 0,
                "bike": 0,
                "car": 0,
                "ridesharing": 0,
                "taxi": 0
            },
            "fare": {
                "found": false,
                "total": {
                    "value": "0.0"
                },
                "links": []
            },
            "calendars": [
                {
                    "week_pattern": {
                        "monday": false,
                        "tuesday": false,
                        "wednesday": false,
                        "thursday": true,
                        "friday": false,
                        "saturday": false,
                        "sunday": false
                    },
                    "active_periods": [
                        {
                            "begin": "20250529",
                            "end": "20250530"
                        }
                    ]
                }
            ],
            "sections": [
                {
                    "id": "zK7o7CiMGjxEtsM7qU6PmP_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T211200",
                    "arrival_date_time": "20250529T211200",
                    "to": {
                        "id": "stop_point:SNCF:87384008:Train",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:Train",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
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
                        "embedded_type": "stop_area"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                2.325331,
                                48.876242
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=cldf%7CAet%7ClC%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                },
                {
                    "id": "section_0_0",
                    "duration": 2160,
                    "co2_emission": {
                        "value": 561.3111,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T211200",
                    "arrival_date_time": "20250529T214800",
                    "base_departure_date_time": "20250529T211200",
                    "base_arrival_date_time": "20250529T214800",
                    "data_freshness": "base_schedule",
                    "to": {
                        "id": "stop_point:SNCF:87381509:Train",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:Train",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87384008:Train",
                        "name": "Paris Saint-Lazare (Paris)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87384008:Train",
                            "name": "Paris Saint-Lazare",
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
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "additional_informations": [
                        "regular"
                    ],
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                2.325331,
                                48.876242
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 47169
                            }
                        ]
                    },
                    "type": "public_transport",
                    "display_informations": {
                        "commercial_mode": "NOMAD",
                        "network": "NOMAD",
                        "direction": "Rouen Rive Droite (Rouen)",
                        "label": "C1",
                        "color": "",
                        "code": "C1",
                        "headsign": "13157",
                        "name": "C1",
                        "links": [
                            {
                                "templated": false,
                                "rel": "terminus",
                                "internal": true,
                                "type": "stop_area",
                                "id": "stop_area:SNCF:87384008"
                            }
                        ],
                        "text_color": "",
                        "trip_short_name": "13157",
                        "description": "",
                        "physical_mode": "TER / Intercités",
                        "equipments": []
                    },
                    "links": [
                        {
                            "type": "vehicle_journey",
                            "id": "vehicle_journey:SNCF:2025-05-29:13157:1187:Train"
                        },
                        {
                            "type": "line",
                            "id": "line:SNCF:FR:Line::97E911FA-C8F2-4861-AD3C-C36CF4750A49:"
                        },
                        {
                            "type": "route",
                            "id": "route:SNCF:FR:Line::97E911FA-C8F2-4861-AD3C-C36CF4750A49:"
                        },
                        {
                            "type": "commercial_mode",
                            "id": "commercial_mode:FR:Branding::3b6b9052-6f3e-4ea4-866f-3bd913db6b22:"
                        },
                        {
                            "type": "physical_mode",
                            "id": "physical_mode:Train"
                        },
                        {
                            "type": "network",
                            "id": "network:SNCF:FR:Branding::3b6b9052-6f3e-4ea4-866f-3bd913db6b22:"
                        }
                    ],
                    "stop_date_times": [
                        {
                            "departure_date_time": "20250529T211200",
                            "base_departure_date_time": "20250529T211200",
                            "arrival_date_time": "20250529T211200",
                            "base_arrival_date_time": "20250529T211200",
                            "stop_point": {
                                "id": "stop_point:SNCF:87384008:Train",
                                "name": "Paris Saint-Lazare",
                                "label": "Paris Saint-Lazare (Paris)",
                                "coord": {
                                    "lon": "2.325331",
                                    "lat": "48.876242"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        },
                        {
                            "departure_date_time": "20250529T215000",
                            "base_departure_date_time": "20250529T215000",
                            "arrival_date_time": "20250529T214800",
                            "base_arrival_date_time": "20250529T214800",
                            "stop_point": {
                                "id": "stop_point:SNCF:87381509:Train",
                                "name": "Mantes-la-Jolie",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": [],
                                "equipments": []
                            },
                            "additional_informations": [],
                            "links": []
                        }
                    ]
                },
                {
                    "id": "EG9usisKy2viVYohUSohsi_0",
                    "duration": 0,
                    "co2_emission": {
                        "value": 0,
                        "unit": "gEC"
                    },
                    "departure_date_time": "20250529T214800",
                    "arrival_date_time": "20250529T214800",
                    "to": {
                        "id": "stop_area:SNCF:87381509",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_area": {
                            "id": "stop_area:SNCF:87381509",
                            "name": "Mantes-la-Jolie",
                            "codes": [
                                {
                                    "type": "source",
                                    "value": "87381509"
                                },
                                {
                                    "type": "uic",
                                    "value": "87381509"
                                }
                            ],
                            "timezone": "Europe/Paris",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ]
                        },
                        "embedded_type": "stop_area"
                    },
                    "from": {
                        "id": "stop_point:SNCF:87381509:Train",
                        "name": "Mantes-la-Jolie (Mantes-la-Jolie)",
                        "quality": 0,
                        "stop_point": {
                            "id": "stop_point:SNCF:87381509:Train",
                            "name": "Mantes-la-Jolie",
                            "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                            "coord": {
                                "lon": "1.70337",
                                "lat": "48.98984"
                            },
                            "links": [],
                            "administrative_regions": [
                                {
                                    "id": "admin:fr:78361",
                                    "name": "Mantes-la-Jolie",
                                    "level": 8,
                                    "zip_code": "78200",
                                    "label": "Mantes-la-Jolie (78200)",
                                    "insee": "78361",
                                    "coord": {
                                        "lon": "1.7140683",
                                        "lat": "48.9891971"
                                    }
                                }
                            ],
                            "stop_area": {
                                "id": "stop_area:SNCF:87381509",
                                "name": "Mantes-la-Jolie",
                                "codes": [
                                    {
                                        "type": "source",
                                        "value": "87381509"
                                    },
                                    {
                                        "type": "uic",
                                        "value": "87381509"
                                    }
                                ],
                                "timezone": "Europe/Paris",
                                "label": "Mantes-la-Jolie (Mantes-la-Jolie)",
                                "coord": {
                                    "lon": "1.70337",
                                    "lat": "48.98984"
                                },
                                "links": []
                            },
                            "equipments": []
                        },
                        "embedded_type": "stop_point"
                    },
                    "geojson": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                1.70337,
                                48.98984
                            ],
                            [
                                1.70337,
                                48.98984
                            ]
                        ],
                        "properties": [
                            {
                                "length": 0
                            }
                        ]
                    },
                    "mode": "walking",
                    "type": "crow_fly",
                    "links": [
                        {
                            "href": "https://api.sncf.com/v1/coverage/sncf/elevations?polyline=_hbm%7CAs%7B%7DfB%3F%3F",
                            "templated": false,
                            "rel": "elevations",
                            "type": "elevations"
                        }
                    ]
                }
            ],
            "links": [
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T211200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=5&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ATrain&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ATrain&_pt_planner=kraken",
                    "templated": false,
                    "rel": "same_journey_schedules",
                    "type": "journeys"
                },
                {
                    "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250529T211200&datetime_represents=departure&data-freshness=realtime&min_nb_journeys=1&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ATrain&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ATrain&count=1",
                    "templated": false,
                    "rel": "this_journey",
                    "type": "journeys"
                }
            ]
        }
    ],
    "tickets": [],
    "disruptions": [],
    "terminus": [
        {
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
        }
    ],
    "context": {
        "car_direct_path": {
            "co2_emission": {
                "value": 11716.9507342752,
                "unit": "gEC"
            },
            "air_pollutants": {
                "unit": "g",
                "values": {
                    "nox": 20.7547,
                    "pm": 2.6415
                }
            }
        },
        "current_datetime": "20250529T183413",
        "timezone": "Europe/Paris"
    },
    "notes": [],
    "exceptions": []
}
```