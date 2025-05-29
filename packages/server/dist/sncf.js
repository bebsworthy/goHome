import { logApiCall } from './utils/logger.js';
import { toDate, formatInTimeZone } from 'date-fns-tz';
const COVERAGE = 'sncf';
const FRANCE_TIMEZONE = 'Europe/Paris';
// --- Helper Functions ---
/**
 * Formats a JavaScript Date object into SNCF's datetime string format (YYYYMMDDTHHmmss).
 * @param date The JavaScript Date object to format (in local timezone).
 * @returns The formatted datetime string in France timezone.
 */
function toSNCFDateTime(date) {
    return formatInTimeZone(date, FRANCE_TIMEZONE, "yyyyMMdd'T'HHmmss");
}
/**
 * Parses SNCF's datetime string (YYYYMMDDTHHmmss) into a JavaScript Date object.
 * @param dateTimeStr The SNCF datetime string.
 * @returns A JavaScript Date object in the local timezone.
 */
function parseSNCFDateTime(dateTimeStr) {
    const year = parseInt(dateTimeStr.slice(0, 4));
    const month = parseInt(dateTimeStr.slice(4, 6)) - 1; // JS months are 0-based
    const day = parseInt(dateTimeStr.slice(6, 8));
    const hour = parseInt(dateTimeStr.slice(9, 11));
    const minute = parseInt(dateTimeStr.slice(11, 13));
    const second = parseInt(dateTimeStr.slice(13, 15));
    // Create a Date object in France timezone and convert to UTC
    return toDate(new Date(year, month, day, hour, minute, second), { timeZone: FRANCE_TIMEZONE });
}
// --- SNCF API Endpoints ---
export var SNCF;
(function (SNCF) {
    function getApiKey() {
        const apiKey = process.env.SNCF_API_KEY;
        if (!apiKey) {
            throw new Error("Configuration Error: SNCF_API_KEY is not set in your .env file or environment variables.");
        }
        return apiKey;
    }
    function getBaseUrl() {
        return process.env.SNCF_BASE_URL || 'https://api.sncf.com/v1';
    }
    async function journeys(fromStationId, toStationId, dateTime) {
        const apiKey = getApiKey();
        const baseUrl = getBaseUrl();
        const params = new URLSearchParams({
            from: fromStationId,
            to: toStationId,
            datetime: dateTime,
            'datetime_represents': 'departure',
            'data-freshness': 'realtime',
            min_nb_journeys: "10"
        });
        const journeysUrl = `${baseUrl}/coverage/${COVERAGE}/journeys?${params.toString()}`;
        return fetch(journeysUrl, {
            headers: {
                'Authorization': apiKey
            }
        });
    }
    SNCF.journeys = journeys;
    async function places(query, type) {
        const apiKey = getApiKey();
        const baseUrl = getBaseUrl();
        const params = new URLSearchParams({
            q: query
        });
        if (type && type.length > 0) {
            type.forEach(t => params.append('type[]', t));
        }
        const placesUrl = `${baseUrl}/coverage/${COVERAGE}/places?${params.toString()}`;
        const response = await fetch(placesUrl, {
            headers: {
                'Authorization': apiKey
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data.places || []; // Return empty array if no places found
    }
    SNCF.places = places;
    async function departures(stopAreaId, dateTime, count = 10, dataFreshness = 'realtime') {
        const apiKey = getApiKey();
        const baseUrl = getBaseUrl();
        const params = new URLSearchParams({
            'data_freshness': dataFreshness,
            count: count.toString()
        });
        if (dateTime) {
            params.append('from_datetime', dateTime);
        }
        const departuresUrl = `${baseUrl}/coverage/${COVERAGE}/stop_areas/${stopAreaId}/departures?${params.toString()}`;
        const response = await fetch(departuresUrl, {
            headers: {
                'Authorization': apiKey
            }
        });
        // Clone the response so we can read it twice (once for logging, once for returning)
        const responseClone = response.clone();
        // Log the API call if the response is OK
        if (response.ok) {
            try {
                const responseData = await responseClone.json();
                await logApiCall('departures', departuresUrl, responseData);
            }
            catch (error) {
                console.error('[SNCF] Error logging API call:', error);
            }
        }
        return response;
    }
    SNCF.departures = departures;
})(SNCF || (SNCF = {}));
// --- Business Logic Functions ---
export async function findEarliestArrivingJourneys(fromStationId, toStationId, now = new Date()) {
    console.log("findEarliest", fromStationId, toStationId, now);
    let requestedApiDepartureTimeISO = null;
    try {
        // Format current time for API
        const currentDateTimeForAPI = toSNCFDateTime(now);
        requestedApiDepartureTimeISO = parseSNCFDateTime(currentDateTimeForAPI).toISOString();
        // Call API
        const response = await SNCF.journeys(fromStationId, toStationId, currentDateTimeForAPI);
        if (!response.ok) {
            // Attempt to get more detailed error from SNCF if possible
            try {
                const errorData = await response.json(); // Type assertion
                if (errorData.error) {
                    throw new Error(`${errorData.error.id}: ${errorData.error.message}`);
                }
            }
            catch {
                // If we can't parse the error JSON, throw generic error with status
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
        }
        // Parse response
        const responseData = await response.json(); // Type assertion
        // Check for API-level errors
        if (responseData.error) {
            throw new Error(`SNCF API Error: ${responseData.error.id} - ${responseData.error.message}`);
        }
        console.log(`[SERVER] Found ${JSON.stringify(responseData.journeys, null, 2)} journeys`);
        // Transform journeys into display format
        const journeyDisplays = (responseData.journeys || []).map(journey => {
            const journeyDepartureTime = parseSNCFDateTime(journey.departure_date_time);
            return {
                departureTime: journeyDepartureTime,
                arrivalTime: parseSNCFDateTime(journey.arrival_date_time),
                duration: journey.duration,
                transfers: journey.nb_transfers,
                sections: journey.sections
                    .map(section => {
                    // Get location names based on section type and available properties
                    let fromName = 'Unknown location';
                    let toName = 'Unknown location';
                    let fromId;
                    let toId;
                    let mode;
                    // For public_transport sections, use stop_point.name
                    if (section.type === 'public_transport') {
                        fromName = section.from?.stop_point?.name || section.from?.name || 'Unknown location';
                        toName = section.to?.stop_point?.name || section.to?.name || 'Unknown location';
                        fromId = section.from?.stop_point?.id || section.from?.id;
                        toId = section.to?.stop_point?.id || section.to?.id;
                        // Try to get mode from display_informations if available
                        mode = section.display_informations?.commercial_mode ||
                            section.display_informations?.physical_mode;
                    }
                    // For crow_fly sections, use name property if available
                    else if (section.type === 'crow_fly') {
                        fromName = section.from?.name || section.from?.stop_point?.name || 'Unknown location';
                        toName = section.to?.name || section.to?.stop_point?.name || 'Unknown location';
                        fromId = section.from?.id;
                        toId = section.to?.id;
                        mode = section.mode || 'walking'; // crow_fly sections often have a mode property
                    }
                    // For any other section types
                    else {
                        fromName = section.from?.name || section.from?.stop_point?.name || 'Unknown location';
                        toName = section.to?.name || section.to?.stop_point?.name || 'Unknown location';
                        fromId = section.from?.id;
                        toId = section.to?.id;
                    }
                    // Extract display information if available
                    const displayInfo = section.display_informations;
                    return {
                        type: section.type,
                        mode: mode,
                        duration: section.duration || 0,
                        from: fromName,
                        fromId: fromId,
                        to: toName,
                        toId: toId,
                        departureTime: parseSNCFDateTime(section.departure_date_time),
                        arrivalTime: parseSNCFDateTime(section.arrival_date_time),
                        // Display information fields
                        commercialMode: displayInfo?.commercial_mode,
                        physicalMode: displayInfo?.physical_mode,
                        network: displayInfo?.network,
                        direction: displayInfo?.direction,
                        label: displayInfo?.label,
                        headsign: displayInfo?.headsign,
                        description: displayInfo?.description,
                        tripShortName: displayInfo?.trip_short_name,
                        textColor: displayInfo?.text_color,
                        color: displayInfo?.color,
                        code: displayInfo?.code
                    };
                })
                    .filter(section => section.mode !== 'walking'),
                requestedApiDepartureTime: requestedApiDepartureTimeISO
            };
        });
        // Sort journeys by arrival time
        return journeyDisplays.sort((a, b) => {
            const arrivalA = a.arrivalTime.getTime();
            const arrivalB = b.arrivalTime.getTime();
            return arrivalA - arrivalB;
        });
    }
    catch (error) {
        // Handle errors
        // This catch block will handle:
        // 1. Errors we explicitly threw above
        // 2. Network errors from fetch
        // 3. JSON parsing errors if the response isn't valid JSON
        // or if callSNCF or response.json() throws an error that isn't an HTTP error.
        if (error instanceof Error) {
            throw error; // Re-throw the error with our custom message
        }
        else {
            throw new Error('An unknown error occurred while fetching train journeys');
        }
    }
}
// Update findStations to match the new interface
export async function findStations(query) {
    const places = await SNCF.places(query, ['stop_area']);
    console.log(`[SERVER][findStations] Found ${places.length} stations`);
    console.log(`[SERVER][findStations] Places: ${JSON.stringify(places, null, 2)}`);
    return places
        .filter(place => place.embedded_type === 'stop_area' && place.stop_area && place.stop_area.coord)
        .map(place => ({
        id: place.stop_area.id,
        name: place.stop_area.name,
        coordinates: {
            longitude: parseFloat(place.stop_area.coord.lon),
            latitude: parseFloat(place.stop_area.coord.lat)
        }
    }));
}
export async function findDepartures(stopAreaId, fromDateTime = new Date(), count = 10) {
    try {
        // Format datetime for API
        const dateTimeForAPI = toSNCFDateTime(fromDateTime);
        // Call API
        const response = await SNCF.departures(stopAreaId, dateTimeForAPI, count);
        if (!response.ok) {
            // Attempt to get more detailed error from SNCF if possible
            try {
                const errorData = await response.json();
                if (errorData.error) {
                    throw new Error(`${errorData.error.id}: ${errorData.error.message}`);
                }
            }
            catch {
                // If we can't parse the error JSON, throw generic error with status
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
        }
        // Parse response
        const responseData = await response.json();
        // Check for API-level errors
        if (responseData.error) {
            throw new Error(`SNCF API Error: ${responseData.error.id} - ${responseData.error.message}`);
        }
        console.log(`[SERVER] Found ${responseData.departures.length} departures`);
        return responseData.departures;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error('An unknown error occurred while fetching departures');
        }
    }
}
//# sourceMappingURL=sncf.js.map