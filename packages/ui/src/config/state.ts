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

export interface Journey {
  id: string;
  departureStation: Station;
  arrivalStation: Station;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  changes: number;
  platform: string;
  status: 'on-time' | 'delayed' | 'cancelled';
}

// State atoms
export const originStationAtom = atom<Station | null>(null);
export const destinationStationAtom = atom<Station | null>(null);
export const journeyResultsAtom = atom<Journey[] | null>(null);
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);
export const lastSearchAtom = atom<{ origin: Station; destination: Station } | null>(null);
export const stationListAtom = atom<Station[] | null>(null);

// Derived atoms
export const journeySearchAtom = atom(
  (get) => ({
    origin: get(originStationAtom),
    destination: get(destinationStationAtom),
  })
);

export const hasValidSearchAtom = atom(
  (get) => {
    const { origin, destination } = get(journeySearchAtom);
    return origin !== null && destination !== null && origin !== destination;
  }
);
