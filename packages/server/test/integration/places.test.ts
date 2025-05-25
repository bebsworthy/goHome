import { describe, it, expect } from 'vitest';
import { SNCF } from '../../src/sncf.js';
import type { Place } from '../../src/sncf.js';

describe('SNCF API Integration', () => {
  describe('places', () => {
    it('should find Paris Saint-Lazare station', async () => {
      const query = 'Paris Saint-Lazare';
      const results: Place[] = await SNCF.places(query);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);

      // Find the exact station
      const station = results.find((place: Place) => 
        place.name.toLowerCase().includes('paris saint-lazare') && 
        place.embedded_type === 'stop_area'
      );

      expect(station).toBeDefined();
      if (station) {
        expect(station.name.toLowerCase()).toContain('paris saint-lazare');
        expect(station.embedded_type).toBe('stop_area');
        expect(typeof station.id).toBe('string');
        
        // Coordinates might be in different formats
        expect(station.stop_area).toBeDefined();
        if (station.stop_area?.coord) {
          expect(station.stop_area?.coord).toHaveProperty('lat');
          expect(station.stop_area?.coord).toHaveProperty('lon');
        }
      }
    });

    it('should handle stations with accents', async () => {
      const query = 'Théâtre';
      const results: Place[] = await SNCF.places(query);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);

      // Verify at least one result has the accented character
      const hasAccentedResult = results.some((place: Place) => 
        place.name.toLowerCase().includes('théâtre')
      );
      expect(hasAccentedResult).toBe(true);
    });

    it('should handle empty results gracefully', async () => {
      const query = 'ThisStationDefinitelyDoesNotExist12345';
      const results: Place[] = await SNCF.places(query);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });

    it('should find multiple stations for ambiguous queries', async () => {
      const query = 'Gare de Lyon';  // Could match Paris and Lyon stations
      const results: Place[] = await SNCF.places(query);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);

      // Verify we get relevant results containing "Lyon"
      const stations = results.filter((place: Place) => 
        place.embedded_type === 'stop_area' &&
        place.name.toLowerCase().includes('lyon')
      );

      expect(stations.length).toBeGreaterThan(0);
    });

    it('should include required fields in response', async () => {
      const query = 'Montparnasse';
      const results: Place[] = await SNCF.places(query);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      
      const station = results[0];
      expect(station).toBeDefined();
      expect(station).toHaveProperty('id');
      expect(station).toHaveProperty('name');
      expect(station).toHaveProperty('embedded_type');
      
      // Some stations might not have coordinates
      expect(station.stop_area).toBeDefined();
      if (station.stop_area?.coord) {
        expect(station.stop_area?.coord).toHaveProperty('lat');
        expect(station.stop_area?.coord).toHaveProperty('lon');
      }

      // Quality is optional
      if (station.quality !== undefined) {
        expect(typeof station.quality).toBe('number');
      }

      // Administrative regions might be empty but should be an array if present
      if (station.administrative_regions) {
        expect(Array.isArray(station.administrative_regions)).toBe(true);
      }
    });
  });
}); 