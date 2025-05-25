import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SNCF, findEarliestArrivingJourneys } from '../../src/sncf.js';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('SNCF Module', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Reset environment variables
    process.env.SNCF_API_KEY = 'test-api-key';
    process.env.SNCF_BASE_URL = 'https://api.test.com/v1';
  });

  describe('places', () => {
    it('should call the places API with correct parameters', async () => {
      // Mock successful API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ places: [] })
      });

      await SNCF.places('Paris');

      // Verify API call
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [url, options] = mockFetch.mock.calls[0];
      
      // Verify URL
      expect(url).toContain('/coverage/sncf/places');
      expect(url).toContain('q=Paris');
      
      // Verify headers
      expect(options.headers).toHaveProperty('Authorization', 'test-api-key');
    });

    it('should handle API errors', async () => {
      // Mock API error response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      });

      await expect(SNCF.places('Paris')).rejects.toThrow('HTTP Error: 401 Unauthorized');
    });

    it('should handle type filtering', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ places: [] })
      });

      await SNCF.places('Paris', ['stop_area']);

      const [url] = mockFetch.mock.calls[0];
      expect(decodeURIComponent(url)).toContain('type[]=stop_area');
    });

    it('should handle missing API key', async () => {
      delete process.env.SNCF_API_KEY;

      await expect(SNCF.places('Paris')).rejects.toThrow('SNCF_API_KEY is not set');
    });
  });

  describe('journeys', () => {
    const fromId = 'stop_area:SNCF:1234';
    const toId = 'stop_area:SNCF:5678';
    const dateTime = '20240315T123000';

    it('should call the journeys API with correct parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ journeys: [] })
      });

      await SNCF.journeys(fromId, toId, dateTime);

      // Verify API call
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [url, options] = mockFetch.mock.calls[0];
      const decodedUrl = decodeURIComponent(url);
      
      // Verify URL parameters
      expect(decodedUrl).toContain('/coverage/sncf/journeys');
      expect(decodedUrl).toContain(`from=${fromId}`);
      expect(decodedUrl).toContain(`to=${toId}`);
      expect(decodedUrl).toContain(`datetime=${dateTime}`);
      expect(decodedUrl).toContain('data-freshness=realtime');
      
      // Verify headers
      expect(options.headers).toHaveProperty('Authorization', 'test-api-key');
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const response = await SNCF.journeys(fromId, toId, dateTime);
      expect(response.ok).toBe(false);
      expect(response.status).toBe(500);
    });
  });

  describe('findEarliestArrivingJourneys', () => {
    it('should correctly map display information fields from sections', async () => {
      // Mock successful API response with display information
      const mockJourneysResponse = {
        journeys: [{
          departure_date_time: '20250525T080000',
          arrival_date_time: '20250525T084200',
          duration: 2520,
          nb_transfers: 0,
          sections: [
            {
              type: 'crow_fly',
              mode: 'walking',
              duration: 0,
              from: {
                id: 'stop_area:SNCF:87384008',
                name: 'Paris Saint-Lazare',
                embedded_type: 'stop_area',
                stop_area: {
                  id: 'stop_area:SNCF:87384008',
                  name: 'Paris Saint-Lazare',
                  coord: { lon: '2.325331', lat: '48.876242' }
                }
              },
              to: {
                id: 'stop_point:SNCF:87384008:Train',
                name: 'Paris Saint-Lazare',
                embedded_type: 'stop_point',
                stop_point: {
                  id: 'stop_point:SNCF:87384008:Train',
                  name: 'Paris Saint-Lazare'
                }
              },
              departure_date_time: '20250525T080000',
              arrival_date_time: '20250525T080000'
            },
            {
              type: 'public_transport',
              duration: 2520,
              from: {
                id: 'stop_point:SNCF:87384008:Train',
                name: 'Paris Saint-Lazare',
                embedded_type: 'stop_point',
                stop_point: {
                  id: 'stop_point:SNCF:87384008:Train',
                  name: 'Paris Saint-Lazare'
                }
              },
              to: {
                id: 'stop_point:SNCF:87381509:Train',
                name: 'Mantes-la-Jolie',
                embedded_type: 'stop_point',
                stop_point: {
                  id: 'stop_point:SNCF:87381509:Train',
                  name: 'Mantes-la-Jolie'
                }
              },
              departure_date_time: '20250525T080000',
              arrival_date_time: '20250525T084200',
              display_informations: {
                commercial_mode: 'NOMAD',
                physical_mode: 'TER / Intercités',
                network: 'NOMAD',
                direction: 'Rouen Rive Droite',
                label: 'C1',
                headsign: '13111',
                trip_short_name: '13111',
                description: 'Train description',
                code: 'C1',
                color: '#FF0000',
                text_color: '#FFFFFF'
              }
            }
          ]
        }]
      };

      // Mock the SNCF.journeys method
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockJourneysResponse)
      });

      // Call the function
      const result = await findEarliestArrivingJourneys('stop_area:SNCF:87384008', 'stop_area:SNCF:87381509');

      // Verify the result
      expect(result).toHaveLength(1);
      
      // Check journey properties
      const journey = result[0];
      expect(journey.departureTime).toBeInstanceOf(Date);
      expect(journey.arrivalTime).toBeInstanceOf(Date);
      expect(journey.duration).toBe(2520);
      expect(journey.transfers).toBe(0);
      
      // Check sections - walking sections should be filtered out
      expect(journey.sections).toHaveLength(1); // Only the public_transport section should remain
      
      // Check public_transport section with display information
      const ptSection = journey.sections[0]; // Now this should be the first and only section
      expect(ptSection.type).toBe('public_transport');
      expect(ptSection.duration).toBe(2520);
      expect(ptSection.from).toBe('Paris Saint-Lazare');
      expect(ptSection.fromId).toBe('stop_point:SNCF:87384008:Train');
      expect(ptSection.to).toBe('Mantes-la-Jolie');
      expect(ptSection.toId).toBe('stop_point:SNCF:87381509:Train');
      
      // Check display information fields
      expect(ptSection.commercialMode).toBe('NOMAD');
      expect(ptSection.physicalMode).toBe('TER / Intercités');
      expect(ptSection.network).toBe('NOMAD');
      expect(ptSection.direction).toBe('Rouen Rive Droite');
      expect(ptSection.label).toBe('C1');
      expect(ptSection.headsign).toBe('13111');
      expect(ptSection.tripShortName).toBe('13111');
      expect(ptSection.description).toBe('Train description');
      expect(ptSection.code).toBe('C1');
      expect(ptSection.color).toBe('#FF0000');
      expect(ptSection.textColor).toBe('#FFFFFF');
    });
  });
}); 