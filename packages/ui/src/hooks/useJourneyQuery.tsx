import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { 
  originStationAtom, 
  destinationStationAtom,
  isLoadingAtom,
  journeyResultsAtom,
  lastSearchAtom,
  Station
  // Journey type is used implicitly through journeyResultsAtom
} from '../config/state';
import { sncfApiService } from '../utils/sncfApi';
import { localStorageService } from '../utils/localStorage';

/**
 * Custom hook for managing journey queries
 * 
 * Handles all state and logic related to querying the API for journeys,
 * including caching results and determining when to use cached results.
 */
export function useJourneyQuery() {
  // Ref to track initialization status
  const isInitializedRef = useRef(false);
  
  // Atoms for global state
  const [origin, setOrigin] = useAtom(originStationAtom);
  const [destination, setDestination] = useAtom(destinationStationAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [journeyResults, setJourneyResults] = useAtom(journeyResultsAtom);
  const [lastSearch, setLastSearch] = useAtom(lastSearchAtom);
  
  // Compute whether we have a valid search (both origin and destination are set)
  const hasValidSearch = !!origin && !!destination;
  
  // State for tracking whether we're using saved data (for both UI and search logic)
  const [isUsingSavedData, setIsUsingSavedData] = useState(false);

  // Initialize on mount - only runs once
  useEffect(() => {
    // Skip if already initialized
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    
    console.log('useJourneyQuery initializing...');
    
    // If we already have journey results or lastSearch, we're using saved data
    if (journeyResults || lastSearch) {
      console.log('Using existing data from state');
      setIsUsingSavedData(true);
      return;
    }
    
    // Try to load from localStorage if we don't have results or lastSearch in state
    const savedSearch = localStorageService.getLastSearch();
    const savedResults = localStorageService.getLastResults();
    
    if (savedSearch) {
      console.log('Found saved search in localStorage');
      
      // Set search parameters
      setLastSearch(savedSearch);
      setOrigin(savedSearch.origin);
      setDestination(savedSearch.destination);
      
      // If we have saved results, use them
      if (savedResults) {
        console.log('Loading journey results from localStorage');
        setJourneyResults(savedResults);
        setIsUsingSavedData(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Track when stations change to reset saved data state
  useEffect(() => {
    // Skip on initial render
    if (!isInitializedRef.current) return;
    
    // If we have both stations and they've changed, we're no longer using saved data
    if (origin && destination && isUsingSavedData) {
      console.log('Stations changed, no longer using saved data');
      setIsUsingSavedData(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  /**
   * Search for journeys between stations
   * 
   * @param from Origin station
   * @param to Destination station
   * @param forceRefresh Whether to force a refresh from the server
   */
  const searchJourneys = useCallback(async (
    from: Station, 
    to: Station, 
    forceRefresh: boolean = false
  ) => {
    // Don't search if already loading
    if (isLoading) return;
    
    // If we have cached results and aren't forcing a refresh, use them
    if (!forceRefresh && isUsingSavedData && journeyResults) {
      console.log('Using cached journey results');
      return journeyResults;
    }
    
    try {
      console.log('Fetching journeys from server:', {
        from: from.name,
        to: to.name,
        forceRefresh
      });
      
      setIsLoading(true);
      
      // Search for journeys
      const journeys = await sncfApiService.searchJourneys(
        from.id,
        to.id
      );
      
      // Update journey results
      setJourneyResults(journeys);
      
      // Save last search and results to localStorage and atom
      const searchParams = { 
        origin: from, 
        destination: to, 
        timestamp: new Date().toISOString() 
      };
      localStorageService.saveLastSearch(searchParams);
      localStorageService.saveLastResults(journeys);
      setLastSearch(searchParams);
      
      // No longer using saved results since we just got fresh ones
      setIsUsingSavedData(false);
      
      return journeys;
    } catch (error) {
      console.error('Error searching journeys:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isUsingSavedData, journeyResults, setIsLoading, setJourneyResults, setLastSearch]);
  
  /**
   * Swap origin and destination stations
   */
  const swapStations = useCallback(() => {
    // Only proceed if we have both origin and destination
    if (!origin || !destination) return;
    
    console.log('Swapping stations, isUsingSavedData:', isUsingSavedData);
    
    // Swap the stations
    const newOrigin = destination;
    const newDestination = origin;
    
    // Temporarily disable the automatic search trigger
    // We'll handle the search manually if needed
    const shouldSearch = !isUsingSavedData;
    
    // Set stations without triggering automatic search
    setOrigin(newOrigin);
    setDestination(newDestination);
    
    // If we're not using saved results, manually trigger a search
    if (shouldSearch && hasValidSearch && !isLoading) {
      console.log('Manually triggering search after station swap');
      // Small timeout to ensure state updates have completed
      setTimeout(() => {
        searchJourneys(newOrigin, newDestination);
      }, 0);
    } else {
      console.log('Not triggering search after swap because using saved results');
    }
  }, [origin, destination, isUsingSavedData, hasValidSearch, isLoading, setOrigin, setDestination, searchJourneys]);
  
  /**
   * Clear saved search and results
   */
  const clearSavedSearch = useCallback(() => {
    console.log('Clearing saved search');
    
    // Clear localStorage
    localStorageService.clearLastSearch();
    
    // Clear atoms
    setLastSearch(null);
    setJourneyResults(null);
    
    // Reset flag
    setIsUsingSavedData(false);
  }, [setLastSearch, setJourneyResults]);
  
  /**
   * Return the hook's public API
   */
  return {
    // State
    origin,
    destination,
    isLoading,
    hasValidSearch,
    journeyResults,
    lastSearch,
    isUsingSavedData,
    
    // State setters
    setOrigin,
    setDestination,
    
    // Actions
    searchJourneys,
    swapStations,
    clearSavedSearch
  };
}
