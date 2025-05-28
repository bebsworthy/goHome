// Shared types for SNCF API and mock implementation

// Basic types
export interface Error {
  id: string;
  message: string;
}

export interface Coordinates {
  lon: string;
  lat: string;
}

export interface StopPoint {
  id: string;
  name: string;
  label?: string;
  coord?: Coordinates;
}

export interface Location {
  id?: string;
  name?: string;
  embedded_type?: string;
  stop_point?: StopPoint;
  stop_area?: {
    id: string;
    name: string;
    coord: Coordinates;
  };
}

export interface DisplayInformation {
  commercial_mode?: string;
  physical_mode?: string;
  network?: string;
  direction?: string;
  label?: string;
  headsign?: string;
  description?: string;
  trip_short_name?: string;
  text_color?: string;
  color?: string;
  code?: string;
}

// SNCF API response types
export interface Section {
  id?: string;
  type: string;
  mode?: string;
  duration?: number;
  from: Location;
  to: Location;
  departure_date_time: string;
  arrival_date_time: string;
  display_informations?: DisplayInformation;
}

export interface Journey {
  departure_date_time: string;
  arrival_date_time: string;
  duration: number;
  nb_transfers: number;
  sections: Section[];
}

export interface SNCFJourneysResponse {
  error?: Error;
  journeys?: Journey[];
}

export interface Place {
  id: string;
  name: string;
  quality: number;
  embedded_type: string;
  administrative_regions: any[];
  coord: Coordinates;
  stop_area?: {
    id: string;
    name: string;
    coord: Coordinates;
  };
}

export interface PlacesResponse {
  places: Place[];
}

// Application domain types
export interface Station {
  id: string;
  name: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
}

export interface JourneySection {
  type: string;
  mode?: string;
  duration: number;
  from: string;
  fromId?: string;
  to: string;
  toId?: string;
  departureTime: Date;
  arrivalTime: Date;
  // Display information fields
  commercialMode?: string;
  physicalMode?: string;
  network?: string;
  direction?: string;
  label?: string;
  headsign?: string;
  description?: string;
  tripShortName?: string;
  textColor?: string;
  color?: string;
  code?: string;
}

export interface JourneyDisplay {
  departureTime: Date;
  arrivalTime: Date;
  duration: number;
  transfers: number;
  sections: JourneySection[];
  requestedApiDepartureTime: string | null; // ISO string for the datetime parameter sent to SNCF API
}

export interface Departure {
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
        departure_date_time: string;
        base_departure_date_time: string;
        arrival_date_time: string;
        base_arrival_date_time: string;
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

export interface DeparturesResponse {
    departures: Departure[];
    pagination: {
        total_count: number;
        items_per_page: number;
        start_page: number;
    };
    error?: {
        id: string;
        message: string;
    };
}
