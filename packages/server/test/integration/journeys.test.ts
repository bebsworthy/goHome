import { describe, it, expect } from 'vitest';
import { SNCF } from '../../src/sncf.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load test environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

describe('SNCF API Integration - Journeys', () => {
  const fromStationId = process.env.TEST_SNCF_FROM_STATION_ID || 'stop_area:SNCF:87384008'; // Paris Saint-Lazare
  const toStationId = process.env.TEST_SNCF_TO_STATION_ID || 'stop_area:SNCF:87381509'; // Mantes-la-Jolie
  
  // Format current time for API (YYYYMMDDTHHmmss)
  const getCurrentDateTimeForAPI = (): string => {
    const now = new Date();
    return now.toISOString()
      .replace(/[-:]/g, '')  // Remove dashes and colons
      .replace(/\.\d+Z$/, ''); // Remove milliseconds and Z
  };

  describe('journeys', () => {
    it('should fetch journeys between two stations', async () => {
      const dateTime = getCurrentDateTimeForAPI();
      const response = await SNCF.journeys(fromStationId, toStationId, dateTime);
      
      expect(response.ok).toBe(true);
      const data = await response.json();
      
      expect(data).toBeDefined();
      expect(data.journeys).toBeDefined();
      expect(Array.isArray(data.journeys)).toBe(true);
      
      if (data.journeys.length > 0) {
        const journey = data.journeys[0];
        
        // Validate journey structure
        expect(journey).toHaveProperty('departure_date_time');
        expect(journey).toHaveProperty('arrival_date_time');
        expect(journey).toHaveProperty('duration');
        expect(journey).toHaveProperty('nb_transfers');
        expect(journey).toHaveProperty('sections');
        expect(Array.isArray(journey.sections)).toBe(true);
        
        // Log the structure of the first journey for debugging
        console.log('First journey structure:', JSON.stringify({
          departure_date_time: journey.departure_date_time,
          arrival_date_time: journey.arrival_date_time,
          duration: journey.duration,
          nb_transfers: journey.nb_transfers,
          sections_count: journey.sections.length
        }, null, 2));
        
        // Examine section structure
        if (journey.sections.length > 0) {
          // Log the structure of different section types
          const sectionTypes = new Set();
          
          journey.sections.forEach((section: any, index: number) => {
            sectionTypes.add(section.type);
            
            console.log(`Section ${index} (type: ${section.type}):`);
            console.log('- from:', section.from ? 
              `${section.from.embedded_type || 'N/A'} - ${section.from.stop_point ? section.from.stop_point.name : 'No stop_point'}` : 
              'undefined');
            console.log('- to:', section.to ? 
              `${section.to.embedded_type || 'N/A'} - ${section.to.stop_point ? section.to.stop_point.name : 'No stop_point'}` : 
              'undefined');
            
            // Log display information if available
            if (section.display_informations) {
              console.log('- display_informations:', {
                commercial_mode: section.display_informations.commercial_mode,
                physical_mode: section.display_informations.physical_mode,
                network: section.display_informations.network,
                direction: section.display_informations.direction,
                trip_short_name: section.display_informations.trip_short_name
              });
            }
          });
          
          console.log('Section types found:', Array.from(sectionTypes));
          
          // Test a specific section
          const firstSection = journey.sections[0];
          expect(firstSection).toHaveProperty('type');
          expect(firstSection).toHaveProperty('departure_date_time');
          expect(firstSection).toHaveProperty('arrival_date_time');
          
          // Check for additional properties we need for our enhanced mapping
          if (firstSection.type === 'public_transport') {
            expect(firstSection).toHaveProperty('display_informations');
            if (firstSection.display_informations) {
              // Check all required display information fields
              expect(firstSection.display_informations).toHaveProperty('commercial_mode');
              expect(firstSection.display_informations).toHaveProperty('physical_mode');
              expect(firstSection.display_informations).toHaveProperty('network');
              expect(firstSection.display_informations).toHaveProperty('direction');
              expect(firstSection.display_informations).toHaveProperty('label');
              expect(firstSection.display_informations).toHaveProperty('trip_short_name');
              
              // Log the display information for debugging
              console.log('Display information for public_transport section:', {
                commercial_mode: firstSection.display_informations.commercial_mode,
                physical_mode: firstSection.display_informations.physical_mode,
                network: firstSection.display_informations.network,
                direction: firstSection.display_informations.direction,
                label: firstSection.display_informations.label,
                trip_short_name: firstSection.display_informations.trip_short_name,
                description: firstSection.display_informations.description,
                code: firstSection.display_informations.code,
                color: firstSection.display_informations.color,
                text_color: firstSection.display_informations.text_color
              });
            }
          } else if (firstSection.type === 'crow_fly') {
            expect(firstSection).toHaveProperty('mode');
            console.log('Mode for crow_fly section:', firstSection.mode);
          }
          
          // Check duration property
          expect(firstSection).toHaveProperty('duration');
          
          // Check from/to structure
          expect(firstSection.from).toBeDefined();
          expect(firstSection.to).toBeDefined();
          
          // Check for IDs in the from/to objects
          if (firstSection.from.stop_point) {
            expect(firstSection.from.stop_point).toHaveProperty('id');
          } else if (firstSection.from.stop_area) {
            expect(firstSection.from.stop_area).toHaveProperty('id');
          }
          
          if (firstSection.to.stop_point) {
            expect(firstSection.to.stop_point).toHaveProperty('id');
          } else if (firstSection.to.stop_area) {
            expect(firstSection.to.stop_area).toHaveProperty('id');
          }
        }
      } else {
        console.log('No journeys found for the given stations and time');
      }
    });
    
    it('should handle error responses gracefully', async () => {
      // Use invalid station IDs to trigger an error
      const invalidFromId = 'invalid_station_id';
      const invalidToId = 'another_invalid_id';
      const dateTime = getCurrentDateTimeForAPI();
      
      const response = await SNCF.journeys(invalidFromId, invalidToId, dateTime);
      
      expect(response.ok).toBe(false);
      
      // Try to parse error response
      try {
        const errorData = await response.json();
        console.log('Error response structure:', JSON.stringify(errorData, null, 2));
        expect(errorData).toHaveProperty('error');
      } catch (e) {
        console.log('Could not parse error response as JSON');
      }
    });
  });
});
