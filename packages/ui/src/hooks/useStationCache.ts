import { useEffect, useRef } from 'react';

import { useAtom } from 'jotai';

import { errorAtom, isLoadingAtom, stationListAtom } from '../config/state';
import { indexedDBService } from '../utils/indexedDB';
import { localStorageService } from '../utils/localStorage';
import { sncfApiService } from '../utils/sncfApi';

// How often to refresh the station list (in milliseconds)
// Default: 24 hours
const CACHE_FRESHNESS_DURATION = 24 * 60 * 60 * 1000;

/**
 * Custom hook to manage fetching and caching of SNCF stations
 * Implements the logic described in Task #7
 */
export function useStationCache() {
  // Use atoms for global state
  const [stations, setStations] = useAtom(stationListAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);

  // Use ref to track initialization state instead of state to avoid re-renders
  const initializedRef = useRef(false);
  const fetchInProgressRef = useRef(false);

  /**
   * Check if the cached stations are fresh enough
   */
  const isCacheFresh = (): boolean => {
    const timestamp = localStorageService.getStationsTimestamp();
    if (!timestamp) return false;

    const now = Date.now();
    return now - timestamp < CACHE_FRESHNESS_DURATION;
  };

  /**
   * Fetch stations from the server API and cache them
   */
  const fetchAndCacheStations = async (): Promise<void> => {
    // Prevent concurrent fetches
    if (fetchInProgressRef.current) {
      console.log('[StationCache] Fetch already in progress, skipping');
      return;
    }

    fetchInProgressRef.current = true;

    try {
      console.log('[StationCache] Fetching stations from API');
      setIsLoading(true);
      setError(null);

      const fetchedStations = await sncfApiService.fetchStations();

      if (fetchedStations.length === 0) {
        throw new Error('No stations returned from server');
      }

      console.log(`[StationCache] Fetched ${fetchedStations.length} stations from API`);

      // Update the global state
      setStations(fetchedStations);

      // Cache the stations in IndexedDB
      await indexedDBService.cacheStations(fetchedStations);

      // Save the timestamp for freshness check
      localStorageService.saveStationsTimestamp(Date.now());

      console.log('[StationCache] Stations cached successfully');
    } catch (error) {
      console.error('[StationCache] Failed to fetch and cache stations:', error);
      setError('Failed to fetch stations. Please try again later.');

      // Try to load from cache as fallback
      await loadFromCache();
    } finally {
      setIsLoading(false);
      fetchInProgressRef.current = false;
    }
  };

  /**
   * Load stations from IndexedDB cache
   */
  const loadFromCache = async (): Promise<void> => {
    try {
      console.log('[StationCache] Loading stations from cache');
      const cachedStations = await indexedDBService.getAllStations();

      if (cachedStations && cachedStations.length > 0) {
        console.log(`[StationCache] Loaded ${cachedStations.length} stations from cache`);
        setStations(cachedStations);
      } else {
        console.log('[StationCache] No stations in cache');
      }
    } catch (cacheError) {
      console.error('[StationCache] Failed to load stations from cache:', cacheError);
      setError('Failed to load stations. Please check your connection and try again.');
    }
  };

  // Initialize the station cache on component mount
  useEffect(() => {
    const initializeStations = async () => {
      // Skip if already initialized
      if (initializedRef.current) {
        console.log('[StationCache] Already initialized, skipping');
        return;
      }

      initializedRef.current = true;
      console.log('[StationCache] Initializing station cache');

      try {
        setIsLoading(true);

        // Check if we have stations in the cache
        const cachedStations = await indexedDBService.getAllStations();

        if (cachedStations && cachedStations.length > 0 && isCacheFresh()) {
          // If we have fresh cached stations, use them
          console.log(`[StationCache] Using ${cachedStations.length} fresh cached stations`);
          setStations(cachedStations);
        } else {
          // Otherwise, fetch from API
          console.log('[StationCache] Cache empty or stale, fetching from API');
          await fetchAndCacheStations();
        }
      } catch (initError) {
        console.error('[StationCache] Failed to initialize stations:', initError);
        setError('Failed to initialize stations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    // Run initialization once
    initializeStations();

    // No dependencies to avoid re-running
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    stations,
    isLoading,
    error,
    refreshStations: fetchAndCacheStations,
  };
}
