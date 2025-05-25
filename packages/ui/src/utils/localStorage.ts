import { Station, Journey } from '../config/state';

/**
 * LocalStorage service for persisting user preferences and last search
 * Implements F-103, T-104 requirements
 */
export class LocalStorageService {
  private static instance: LocalStorageService;
  private readonly LAST_SEARCH_KEY = 'goHome_lastSearch';
  private readonly LAST_RESULTS_KEY = 'goHome_lastResults';
  private readonly PREFERENCES_PREFIX = 'goHome_pref_';
  private readonly STATIONS_TIMESTAMP_KEY = 'goHome_stationsTimestamp';

  private constructor() {}

  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  /**
   * Save the parameters of the last successful journey search
   * @param searchParams Object containing origin and destination stations
   */
  saveLastSearch(searchParams: { origin: Station; destination: Station }): void {
    try {
      localStorage.setItem(this.LAST_SEARCH_KEY, JSON.stringify(searchParams));
    } catch (error) {
      console.error('Failed to save last search to localStorage:', error);
    }
  }
  
  /**
   * Save the results of the last successful journey search
   * @param journeys Array of journey results
   */
  saveLastResults(journeys: Journey[]): void {
    try {
      // Convert Date objects to ISO strings for proper serialization
      const serializedJourneys = journeys.map(journey => ({
        ...journey,
        departureTime: journey.departureTime.toISOString(),
        arrivalTime: journey.arrivalTime.toISOString(),
        sections: journey.sections.map(section => ({
          ...section,
          departureTime: section.departureTime.toISOString(),
          arrivalTime: section.arrivalTime.toISOString()
        }))
      }));
      
      localStorage.setItem(this.LAST_RESULTS_KEY, JSON.stringify(serializedJourneys));
    } catch (error) {
      console.error('Failed to save journey results to localStorage:', error);
    }
  }

  /**
   * Retrieve the parameters of the last successful journey search
   * @returns The last search parameters or null if not found
   */
  getLastSearch(): { origin: Station; destination: Station } | null {
    try {
      const lastSearch = localStorage.getItem(this.LAST_SEARCH_KEY);
      if (!lastSearch) return null;
      return JSON.parse(lastSearch);
    } catch (error) {
      console.error('Failed to retrieve last search from localStorage:', error);
      return null;
    }
  }

  /**
   * Retrieve the results of the last successful journey search
   * @returns The last journey results or null if not found
   */
  getLastResults(): Journey[] | null {
    try {
      const lastResults = localStorage.getItem(this.LAST_RESULTS_KEY);
      if (!lastResults) return null;
      
      // Convert ISO strings back to Date objects
      const parsedResults = JSON.parse(lastResults);
      return parsedResults.map((journey: any) => ({
        ...journey,
        departureTime: new Date(journey.departureTime),
        arrivalTime: new Date(journey.arrivalTime),
        sections: journey.sections.map((section: any) => ({
          ...section,
          departureTime: new Date(section.departureTime),
          arrivalTime: new Date(section.arrivalTime)
        }))
      }));
    } catch (error) {
      console.error('Failed to retrieve journey results from localStorage:', error);
      return null;
    }
  }
  
  /**
   * Clear the last search from localStorage
   */
  clearLastSearch(): void {
    try {
      localStorage.removeItem(this.LAST_SEARCH_KEY);
      localStorage.removeItem(this.LAST_RESULTS_KEY);
    } catch (error) {
      console.error('Failed to clear last search from localStorage:', error);
    }
  }

  /**
   * Save a user preference
   * @param key Preference key
   * @param value Preference value
   */
  saveUserPreference<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.PREFERENCES_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save user preference '${key}' to localStorage:`, error);
    }
  }

  /**
   * Retrieve a user preference
   * @param key Preference key
   * @returns The preference value or null if not found
   */
  getUserPreference<T>(key: string): T | null {
    try {
      const preference = localStorage.getItem(this.PREFERENCES_PREFIX + key);
      if (!preference) return null;
      return JSON.parse(preference);
    } catch (error) {
      console.error(`Failed to retrieve user preference '${key}' from localStorage:`, error);
      return null;
    }
  }

  /**
   * Save the timestamp of when stations were last fetched
   * @param timestamp The timestamp to save
   */
  saveStationsTimestamp(timestamp: number): void {
    try {
      localStorage.setItem(this.STATIONS_TIMESTAMP_KEY, timestamp.toString());
    } catch (error) {
      console.error('Failed to save stations timestamp to localStorage:', error);
    }
  }

  /**
   * Get the timestamp of when stations were last fetched
   * @returns The timestamp or null if not found
   */
  getStationsTimestamp(): number | null {
    try {
      const timestamp = localStorage.getItem(this.STATIONS_TIMESTAMP_KEY);
      if (!timestamp) return null;
      return parseInt(timestamp, 10);
    } catch (error) {
      console.error('Failed to retrieve stations timestamp from localStorage:', error);
      return null;
    }
  }
}

// Export a singleton instance
export const localStorageService = LocalStorageService.getInstance();
