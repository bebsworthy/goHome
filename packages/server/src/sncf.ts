const COVERAGE = 'sncf';

// --- Interfaces for SNCF API Response ---
interface Error {
    id: string;
    message: string;
}

interface Section {
    type: string;
    from: {
        stop_point: {
            name: string;
        };
    };
    to: {
        stop_point: {
            name: string;
        };
    };
    departure_date_time: string;
    arrival_date_time: string;
}

interface Journey {
    departure_date_time: string;
    arrival_date_time: string;
    duration: number;
    nb_transfers: number;
    sections: Section[];
}

interface JourneyDisplay {
    departureTime: Date;
    arrivalTime: Date;
    duration: number;
    transfers: number;
    sections: {
        type: string;
        from: string;
        to: string;
        departureTime: Date;
        arrivalTime: Date;
    }[];
    requestedApiDepartureTime: string | null; // ISO string for the datetime parameter sent to SNCF API
}

interface SNCFJourneysResponse {
    error?: Error;
    journeys?: Journey[];
}

// Add these interfaces after the existing ones
interface Coordinates {
    lon: string;
    lat: string;
}

export interface Place {
    id: string;
    name: string;
    quality: number;
    embedded_type: string;
    administrative_regions: any[];
    coord: Coordinates;
    stop_area?: {
        id: string;
        name: string;
        coord: Coordinates;
    };
}

interface PlacesResponse {
    places: Place[];
}

interface Station {
    id: string;
    name: string;
    coordinates: {
        longitude: number;
        latitude: number;
    };
}

// --- Helper Functions ---

/**
 * Formats a JavaScript Date object into SNCF's datetime string format (YYYYMMDDTHHmmss).
 * @param date The JavaScript Date object to format.
 * @returns The formatted datetime string.
 */
function toSNCFDateTime(date: Date): string {
    return date.toISOString()
        .replace(/[-:]/g, '')  // Remove dashes and colons
        .replace(/\.\d+Z$/, ''); // Remove milliseconds and Z
}

/**
 * Parses SNCF's datetime string (YYYYMMDDTHHmmss) into a JavaScript Date object.
 * @param dateTimeStr The SNCF datetime string.
 * @returns A JavaScript Date object.
 */
function parseSNCFDateTime(dateTimeStr: string): Date {
    const year = parseInt(dateTimeStr.slice(0, 4));
    const month = parseInt(dateTimeStr.slice(4, 6)) - 1; // JS months are 0-based
    const day = parseInt(dateTimeStr.slice(6, 8));
    const hour = parseInt(dateTimeStr.slice(9, 11));
    const minute = parseInt(dateTimeStr.slice(11, 13));
    const second = parseInt(dateTimeStr.slice(13, 15));

    // SNCF typically uses UTC or the local time of the covered area.
    return new Date(Date.UTC(year, month, day, hour, minute, second));
}

// --- SNCF API Endpoints ---
export namespace SNCF {
    function getApiKey(): string {
        const apiKey = process.env.SNCF_API_KEY;
        if (!apiKey) {
            throw new Error("Configuration Error: SNCF_API_KEY is not set in your .env file or environment variables.");
        }
        return apiKey;
    }

    function getBaseUrl(): string {
        return process.env.SNCF_BASE_URL || 'https://api.sncf.com/v1';
    }

    export async function journeys(
        fromStationId: string,
        toStationId: string,
        dateTime: string
    ): Promise<Response> {
        const apiKey = getApiKey();
        const baseUrl = getBaseUrl();

        const params = new URLSearchParams({
            from: fromStationId,
            to: toStationId,
            datetime: dateTime,
            'data-freshness': 'realtime'
        });

        const journeysUrl = `${baseUrl}/coverage/${COVERAGE}/journeys?${params.toString()}`;

        return fetch(journeysUrl, {
            headers: {
                'Authorization': apiKey
            }
        });
    }

    export async function places(
        query: string,
        type?: string[]
    ): Promise<Place[]> {
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

        const data = await response.json() as PlacesResponse;
        return data.places || []; // Return empty array if no places found
    }
}

// --- Business Logic Functions ---
export async function findEarliestArrivingJourneys(
    fromStationId: string,
    toStationId: string,
    now: Date = new Date()
): Promise<JourneyDisplay[]> {
    console.log("findEarliest",fromStationId, toStationId, now);
    let requestedApiDepartureTimeISO: string | null = null;

    try {
        // Format current time for API
        const currentDateTimeForAPI = toSNCFDateTime(now);
        requestedApiDepartureTimeISO = parseSNCFDateTime(currentDateTimeForAPI).toISOString();

        // Call API
        const response = await SNCF.journeys(fromStationId, toStationId, currentDateTimeForAPI);

        if (!response.ok) {
            // Attempt to get more detailed error from SNCF if possible
            try {
                const errorData = await response.json() as SNCFJourneysResponse; // Type assertion
                if (errorData.error) {
                    throw new Error(`${errorData.error.id}: ${errorData.error.message}`);
                }
            } catch {
                // If we can't parse the error JSON, throw generic error with status
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
        }

        // Parse response
        const responseData = await response.json() as SNCFJourneysResponse; // Type assertion

        // Check for API-level errors
        if (responseData.error) {
            throw new Error(`SNCF API Error: ${responseData.error.id} - ${responseData.error.message}`);
        }

        // Transform journeys into display format
        const journeyDisplays: JourneyDisplay[] = (responseData.journeys || []).map(journey => {
            const journeyDepartureTime = parseSNCFDateTime(journey.departure_date_time);

            return {
                departureTime: journeyDepartureTime,
                arrivalTime: parseSNCFDateTime(journey.arrival_date_time),
                duration: journey.duration,
                transfers: journey.nb_transfers,
                sections: journey.sections.map(section => ({
                    type: section.type,
                    from: section.from.stop_point.name,
                    to: section.to.stop_point.name,
                    departureTime: parseSNCFDateTime(section.departure_date_time),
                    arrivalTime: parseSNCFDateTime(section.arrival_date_time)
                })),
                requestedApiDepartureTime: requestedApiDepartureTimeISO
            };
        });

        // Sort journeys by arrival time
        return journeyDisplays.sort((a, b) => {
            const arrivalA = a.arrivalTime.getTime();
            const arrivalB = b.arrivalTime.getTime();
            return arrivalA - arrivalB;
        });

    } catch (error) {
        // Handle errors
        // This catch block will handle:
        // 1. Errors we explicitly threw above
        // 2. Network errors from fetch
        // 3. JSON parsing errors if the response isn't valid JSON
        // or if callSNCF or response.json() throws an error that isn't an HTTP error.
        if (error instanceof Error) {
            throw error; // Re-throw the error with our custom message
        } else {
            throw new Error('An unknown error occurred while fetching train journeys');
        }
    }
}

// Update findStations to match the new interface
export async function findStations(query: string): Promise<Station[]> {
    const places = await SNCF.places(query, ['stop_area']);
    
    return places
        .filter(place => place.embedded_type === 'stop_area' && place.coord)
        .map(place => ({
            id: place.id,
            name: place.name,
            coordinates: {
                longitude: parseFloat(place.coord.lon),
                latitude: parseFloat(place.coord.lat)
            }
        }));
}

