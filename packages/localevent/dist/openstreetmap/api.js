const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
/**
 * Search for locations using OpenStreetMap's Nominatim service
 * @param query Search query (e.g., "Foyer Rural, Vetheuil")
 * @param options Additional search parameters
 * @returns Array of search results
 *
 * @example
 * const results = await searchLocation("Foyer Rural, Vetheuil", { countrycodes: 'fr', addressdetails: true });
 * console.log(results[0].display_name);
 */
export async function searchLocation(query, options = {}) {
    const paramsObj = {
        q: query,
        format: 'json',
        addressdetails: options.addressdetails ? '1' : '0',
        extratags: options.extratags ? '1' : '0',
        namedetails: options.namedetails ? '1' : '0',
    };
    if (options.countrycodes)
        paramsObj.countrycodes = options.countrycodes;
    if (typeof options.limit === 'number')
        paramsObj.limit = options.limit.toString();
    const params = new URLSearchParams(paramsObj);
    // Add custom User-Agent header as per Nominatim usage policy
    const headers = {
        'User-Agent': 'goHome/1.0.0',
        'Accept-Language': options.acceptLanguage ?? "en" // Uncomment to set a specific language
    };
    try {
        // Add a delay to respect rate limiting (1 request per second)
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
            headers
        });
        if (!response.ok) {
            throw new Error(`OpenStreetMap API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Failed to search location:', error);
        throw error;
    }
}
