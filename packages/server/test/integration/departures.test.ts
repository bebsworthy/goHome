import { describe, it, expect } from 'vitest';
import { SNCF } from '../../src/sncf.js';
import type { Departure, DeparturesResponse } from '../../src/types.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load test environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

describe('SNCF API Integration - Departures', () => {
  const stopAreaId = process.env.TEST_SNCF_FROM_STATION_ID || 'stop_area:SNCF:87384008'; // Paris Saint-Lazare
  
  // Format current time for API (YYYYMMDDTHHmmss)
  const getCurrentDateTimeForAPI = (): string => {
    const now = new Date();
    return now.toISOString()
      .replace(/[-:]/g, '')  // Remove dashes and colons
      .replace(/\.\d+Z$/, ''); // Remove milliseconds and Z
  };

  describe('departures', () => {
    it('should fetch departures from a station', async () => {
      const dateTime = getCurrentDateTimeForAPI();
      const response = await SNCF.departures(stopAreaId, dateTime);
      
      expect(response.ok).toBe(true);
      const data = await response.json() as DeparturesResponse;
      
      expect(data).toBeDefined();
      expect(data.departures).toBeDefined();
      expect(Array.isArray(data.departures)).toBe(true);
      
      // If we have departures, verify their structure
      if (data.departures.length > 0) {
        const firstDeparture = data.departures[0];
        
        // Check stop_point structure
        expect(firstDeparture.stop_point).toBeDefined();
        expect(firstDeparture.stop_point.id).toBeDefined();
        expect(firstDeparture.stop_point.name).toBeDefined();
        expect(firstDeparture.stop_point.coord).toBeDefined();
        expect(firstDeparture.stop_point.coord.lat).toBeDefined();
        expect(firstDeparture.stop_point.coord.lon).toBeDefined();
        
        // Check route structure
        expect(firstDeparture.route).toBeDefined();
        expect(firstDeparture.route.id).toBeDefined();
        expect(firstDeparture.route.name).toBeDefined();
        expect(firstDeparture.route.direction).toBeDefined();
        expect(firstDeparture.route.direction.id).toBeDefined();
        expect(firstDeparture.route.direction.name).toBeDefined();
        
        // Check stop_date_time structure
        expect(firstDeparture.stop_date_time).toBeDefined();
        expect(firstDeparture.stop_date_time.departure_date_time).toBeDefined();
        expect(firstDeparture.stop_date_time.base_departure_date_time).toBeDefined();
        expect(firstDeparture.stop_date_time.arrival_date_time).toBeDefined();
        expect(firstDeparture.stop_date_time.base_arrival_date_time).toBeDefined();
        
        // Check display_informations structure
        expect(firstDeparture.display_informations).toBeDefined();
        expect(firstDeparture.display_informations.network).toBeDefined();
        expect(firstDeparture.display_informations.physical_mode).toBeDefined();
        expect(firstDeparture.display_informations.headsign).toBeDefined();
        expect(firstDeparture.display_informations.direction).toBeDefined();
        expect(firstDeparture.display_informations.commercial_mode).toBeDefined();
        expect(firstDeparture.display_informations.label).toBeDefined();
      }
    });
    
    it('should handle count parameter', async () => {
      const count = 5;
      const response = await SNCF.departures(stopAreaId, undefined, count);
      
      expect(response.ok).toBe(true);
      const data = await response.json() as DeparturesResponse;
      
      expect(data.departures).toBeDefined();
      expect(Array.isArray(data.departures)).toBe(true);
      expect(data.departures.length).toBeLessThanOrEqual(count);
    });
    
    it('should handle error responses gracefully', async () => {
      // Use invalid station ID to trigger an error
      const invalidStopId = 'invalid_stop_id';
      const response = await SNCF.departures(invalidStopId);
      
      expect(response.ok).toBe(false);
      
      // Try to parse error response
      try {
        const errorData = await response.json() as DeparturesResponse;
        expect(errorData).toHaveProperty('error');
      } catch (e) {
        console.log('Could not parse error response as JSON');
      }
    });
    
    it('should handle data freshness parameter', async () => {
      const response = await SNCF.departures(stopAreaId, undefined, 1, 'base_schedule');
      
      expect(response.ok).toBe(true);
      const data = await response.json() as DeparturesResponse;
      
      expect(data).toBeDefined();
      expect(data.departures).toBeDefined();
      expect(Array.isArray(data.departures)).toBe(true);
    });
  });
}); 