import { atom } from 'jotai';

// Types for our state
export interface Station {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Location {
  id?: string;
  name?: string;
  stop_point?: {
    id: string;
    name: string;
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

export interface FeedPublisher {
  id: string;
  name: string;
  url: string;
  license: string;
}

export interface Link {
  href: string;
  templated: boolean;
  rel: string;
  type: string;
}

export interface CO2Emission {
  value: number;
  unit: string;
}

export interface AirPollutants {
  unit: string;
  values: {
    nox: number;
    pm: number;
  };
}

export interface Durations {
  total: number;
  walking: number;
  bike: number;
  car: number;
  ridesharing: number;
  taxi: number;
}

export interface Distances {
  walking: number;
  bike: number;
  car: number;
  ridesharing: number;
  taxi: number;
}

export interface Fare {
  found: boolean;
  total: {
    value: string;
  };
  links: Link[];
}

export interface Calendar {
  week_pattern: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  active_periods: Array<{
    begin: string;
    end: string;
  }>;
}

export interface Journey {
  duration: number;
  nb_transfers: number;
  departure_date_time: string;
  arrival_date_time: string;
  requested_date_time: string;
  type: string;
  status: string;
  tags: string[];
  co2_emission: CO2Emission;
  air_pollutants: AirPollutants;
  durations: Durations;
  distances: Distances;
  fare: Fare;
  calendars: Calendar[];
  sections: Section[];
}

export interface SNCFJourneysResponse {
  feed_publishers?: FeedPublisher[];
  links?: Link[];
  error?: {
    id: string;
    message: string;
  };
  journeys?: Journey[];
}

// Atoms
export const stationListAtom = atom<Station[]>([]);
export const originStationAtom = atom<Station | null>(null);
export const destinationStationAtom = atom<Station | null>(null);
export const journeyResultsAtom = atom<SNCFJourneysResponse | null>(null);
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);

export const lastSearchAtom = atom<{
  origin: Station;
  destination: Station;
  timestamp?: string;
} | null>(null);

// Derived atoms
export const journeySearchAtom = atom((get) => ({
  origin: get(originStationAtom),
  destination: get(destinationStationAtom),
}));

export const hasValidSearchAtom = atom((get) => {
  const { origin, destination } = get(journeySearchAtom);
  return origin !== null && destination !== null && origin !== destination;
});
