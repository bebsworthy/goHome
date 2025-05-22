import { Station, Journey } from '../config/state';

/**
 * SNCF API Service
 * Handles all communications with the server API for SNCF data
 */
export class SNCFApiService {
  private static instance: SNCFApiService;
  // Use relative URL to leverage Vite's proxy configuration
  private readonly BASE_URL = '/api';

  private constructor() {
    // No initialization needed
  }

  public static getInstance(): SNCFApiService {
    if (!SNCFApiService.instance) {
      SNCFApiService.instance = new SNCFApiService();
    }
    return SNCFApiService.instance;
  }

  /**
   * Create headers for API requests
   */
  private getHeaders(): HeadersInit {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Fetch stations matching a search query
   * @param query Search query string (minimum 2 characters)
   * @returns List of matching stations
   * @throws Error with user-friendly message for rate limiting or other issues
   */
  async searchStations(query: string): Promise<Station[]> {
    if (query.length < 2) {
      return [];
    }
    
    try {
      console.log(`[API] Searching stations with query: "${query}"`);
      const headers = this.getHeaders();
      const url = `${this.BASE_URL}/stations?q=${encodeURIComponent(query)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      
      if (!response.ok) {
        console.error(`[API] Error response: ${response.status} ${response.statusText}`);
        
        // Check if it's a JSON response with error details
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          
          // Handle rate limit error
          if (response.status === 429 || errorData.code === 'RATE_LIMIT_EXCEEDED') {
            throw new Error(errorData.message || 'Rate limit exceeded. Please try again in a few moments.');
          }
          
          // Handle other API errors
          throw new Error(errorData.message || `Error: ${response.statusText}`);
        }
        
        // Generic error for non-JSON responses
        throw new Error(`Failed to fetch stations: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`[API] Received ${data.length || 0} stations`);
      return data;
    } catch (error) {
      console.error('[API] Error searching stations:', error);
      throw error;
    }
  }
  
  /**
   * Fetch all available stations
   * This is a convenience method that fetches a large set of stations
   * by using a broad search query
   * @returns List of stations
   */
  async fetchStations(): Promise<Station[]> {
    console.log('[API] Fetching all stations');
    
    try {
      // Use a broad search query to get many stations
      // In a real app, you might want to implement pagination or
      // have the server provide a dedicated endpoint for this
      const stations = await this.searchStations('paris');
      console.log(`[API] Successfully fetched ${stations.length} stations`);
      return stations;
    } catch (error) {
      console.error('[API] Failed to fetch stations:', error);
      throw error;
    }
  }

  /**
   * Search for journeys between two stations
   * @param originId Origin station ID
   * @param destinationId Destination station ID
   * @param dateTime Departure date and time (optional)
   * @returns List of journeys
   * @throws Error with user-friendly message for rate limiting or other issues
   */
  async searchJourneys(
    originId: string,
    destinationId: string,
    dateTime?: Date
  ): Promise<Journey[]> {
    console.log(`[API] Searching journeys from ${originId} to ${destinationId}`);
    
    try {
      const headers = this.getHeaders();
      const queryParams = new URLSearchParams({
        from: originId,
        to: destinationId,
      });
      
      // Add dateTime parameter if provided
      if (dateTime) {
        queryParams.append('datetime', dateTime.toISOString());
      }
      
      const url = `${this.BASE_URL}/train-journeys?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      
      if (!response.ok) {
        console.error(`[API] Error response: ${response.status} ${response.statusText}`);
        
        // Check if it's a JSON response with error details
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          
          // Handle rate limit error
          if (response.status === 429 || errorData.code === 'RATE_LIMIT_EXCEEDED') {
            throw new Error(errorData.message || 'Rate limit exceeded. Please try again in a few moments.');
          }
          
          // Handle other API errors
          throw new Error(errorData.message || `Error: ${response.statusText}`);
        }
        
        // Generic error for non-JSON responses
        throw new Error(`Failed to fetch journeys: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`[API] Received ${data.length || 0} journeys`);
      return data;
    } catch (error) {
      console.error('[API] Error searching journeys:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const sncfApiService = SNCFApiService.getInstance();
