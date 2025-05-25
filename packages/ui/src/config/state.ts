import { atom } from 'jotai';

// Types for our state
export interface Station {
  id: string;
  name: string;
  code: string;
  coordinates: {
    latitude: number;
    longitude: number;
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

export interface Journey {
  departureTime: Date;
  arrivalTime: Date;
  duration: number;
  transfers: number;
  sections: JourneySection[];
  requestedApiDepartureTime?: string;
}

// State atoms
export const originStationAtom = atom<Station | null>(null);
export const destinationStationAtom = atom<Station | null>(null);
export const journeyResultsAtom = atom<Journey[] | null>(null);
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);
export const lastSearchAtom = atom<{
  origin: Station;
  destination: Station;
  timestamp?: string;
} | null>(null);
export const stationListAtom = atom<Station[] | null>(null);

// Derived atoms
export const journeySearchAtom = atom((get) => ({
  origin: get(originStationAtom),
  destination: get(destinationStationAtom),
}));

export const hasValidSearchAtom = atom((get) => {
  const { origin, destination } = get(journeySearchAtom);
  return origin !== null && destination !== null && origin !== destination;
});
