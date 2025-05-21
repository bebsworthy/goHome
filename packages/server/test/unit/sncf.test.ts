import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SNCF } from '../../src/sncf.js';

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
}); 