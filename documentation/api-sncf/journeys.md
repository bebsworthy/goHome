

## Example Response

```json
[
   {
     "duration": 2520,
     "nb_transfers": 0,
     "departure_date_time": "20250525T080000",
     "arrival_date_time": "20250525T084200",
     "requested_date_time": "20250525T074215",
     "type": "best",
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
       "total": 2520,
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
           "thursday": false,
           "friday": false,
           "saturday": false,
           "sunday": true
         },
         "active_periods": [
           {
             "begin": "20250525",
             "end": "20250526"
           }
         ]
       }
     ],
     "sections": [
       {
         "id": "MLjkKtVXn7LGt4Rg2GJV3d_0",
         "duration": 0,
         "co2_emission": {
           "value": 0,
           "unit": "gEC"
         },
         "departure_date_time": "20250525T080000",
         "arrival_date_time": "20250525T080000",
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
         "duration": 2520,
         "co2_emission": {
           "value": 561.3111,
           "unit": "gEC"
         },
         "departure_date_time": "20250525T080000",
         "arrival_date_time": "20250525T084200",
         "base_departure_date_time": "20250525T080000",
         "base_arrival_date_time": "20250525T084200",
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
           "headsign": "13111",
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
           "trip_short_name": "13111",
           "description": "",
           "physical_mode": "TER / Intercités",
           "equipments": []
         },
         "links": [
           {
             "type": "vehicle_journey",
             "id": "vehicle_journey:SNCF:2025-05-25:13111:1187:Train"
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
             "departure_date_time": "20250525T080000",
             "base_departure_date_time": "20250525T080000",
             "arrival_date_time": "20250525T080000",
             "base_arrival_date_time": "20250525T080000",
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
             "departure_date_time": "20250525T084400",
             "base_departure_date_time": "20250525T084400",
             "arrival_date_time": "20250525T084200",
             "base_arrival_date_time": "20250525T084200",
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
         "id": "Reafc2w8zUkSFab5ZLci4Z_0",
         "duration": 0,
         "co2_emission": {
           "value": 0,
           "unit": "gEC"
         },
         "departure_date_time": "20250525T084200",
         "arrival_date_time": "20250525T084200",
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
         "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250525T080000&data-freshness=realtime&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&min_nb_journeys=5&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ATrain&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ATrain",
         "templated": false,
         "rel": "same_journey_schedules",
         "type": "journeys"
       },
       {
         "href": "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A87384008&to=stop_area%3ASNCF%3A87381509&datetime=20250525T080000&data-freshness=realtime&first_section_mode%5B%5D=walking&last_section_mode%5B%5D=walking&min_nb_transfers=0&direct_path=none&min_nb_journeys=1&is_journey_schedules=True&allowed_id%5B%5D=stop_point%3ASNCF%3A87381509%3ATrain&allowed_id%5B%5D=stop_point%3ASNCF%3A87384008%3ATrain&count=1",
         "templated": false,
         "rel": "this_journey",
         "type": "journeys"
       }
     ]
   }
 ]
```