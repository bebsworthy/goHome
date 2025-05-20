// Import dotenv to load environment variables from a .env file
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// --- Configuration ---
const API_KEY = process.env.NAVITIA_API_KEY; // Load API key from .env
const NAVITIA_BASE_URL = 'https://api.navitia.io/v1';

// Station IDs.
// These IDs are based on common examples. PLEASE VERIFY them using the Navitia playground
// or the /places endpoint for your specific needs and coverage.
// Example: https://api.navitia.io/v1/coverage/sncf/places?q=Paris%20Saint%20Lazare
const FROM_STATION_ID = 'stop_area:SNCF:87271007'; // Paris Saint-Lazare (example, verify)
const TO_STATION_ID = 'stop_area:SNCF:87271460';   // Mantes-la-Jolie (example, verify)

// Coverage for SNCF network.
const COVERAGE = 'sncf'; // Or 'fr-idf' if specifically for Île-de-France and these stations are covered.

// Define commercial modes that represent trains. Case-insensitive check will be applied.
const TRAIN_COMMERCIAL_MODES = ['TRAIN', 'TER', 'TRANSILIEN', 'INTERCITÉS', 'TGV', 'RER'];

// --- Interfaces for Navitia API Response (same as before) ---
interface StopDateTime {
    arrival_date_time: string;
    departure_date_time: string;
}

interface DisplayInformations {
    commercial_mode: string;
    code: string; // e.g., train number or line letter
    label: string;
    network: string;
    direction: string;
    trip_short_name?: string;
}

interface Section {
    type: 'public_transport' | 'street_network' | 'waiting' | 'transfer' | string;
    mode?: string;
    departure_date_time: string;
    arrival_date_time: string;
    from?: {
        name: string;
        stop_area?: { id: string; name: string; };
    };
    to?: {
        name: string;
        stop_area?: { id: string; name: string; };
    };
    display_informations?: DisplayInformations;
    stop_date_times?: StopDateTime[]; // For public_transport sections
    duration: number;
}

interface Journey {
    departure_date_time: string;
    arrival_date_time: string;
    duration: number;
    nb_transfers: number;
    sections: Section[];
    type: string; // e.g., "best"
    status?: string; // e.g. "NO_SOLUTION"
}

interface NavitiaJourneysResponse {
    journeys?: Journey[];
    error?: {
        id: string;
        message: string;
    };
    links?: any[]; // For pagination, etc.
    disruptions?: any[];
}

// --- Result type for getAndDisplayTrainJourneys ---
interface TrainJourneysResult {
    fromStationId: string;
    toStationId: string;
    queryTime: string; // ISO string for when the query was initiated
    requestedApiDepartureTime: string | null; // ISO string for the datetime parameter sent to Navitia API
    journeys?: Journey[];
    message?: string; // For informational messages like "no journeys found"
    error?: {
        type: string;
        message: string;
        details?: any;
    };
}

// --- Helper Functions (same as before) ---

/**
 * Formats a JavaScript Date object into Navitia's datetime string format (YYYYMMDDTHHmmss).
 * @param date The Date object to format.
 * @returns Formatted datetime string.
 */
function toNavitiaDateTime(date: Date): string {
    const YYYY = date.getFullYear();
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    const DD = date.getDate().toString().padStart(2, '0');
    const HH = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');
    return `${YYYY}${MM}${DD}T${HH}${mm}${ss}`;
}

/**
 * Parses Navitia's datetime string (YYYYMMDDTHHmmss) into a JavaScript Date object.
 * @param dateTimeStr The Navitia datetime string.
 * @returns JavaScript Date object.
 */
function parseNavitiaDateTime(dateTimeStr: string): Date {
    const year = parseInt(dateTimeStr.substring(0, 4), 10);
    const month = parseInt(dateTimeStr.substring(4, 6), 10) - 1; // JS months are 0-indexed
    const day = parseInt(dateTimeStr.substring(6, 8), 10);
    const hours = parseInt(dateTimeStr.substring(9, 11), 10);
    const minutes = parseInt(dateTimeStr.substring(11, 13), 10);
    const seconds = parseInt(dateTimeStr.substring(13, 15), 10);
    // Navitia typically uses UTC or the local time of the covered area.
    // For consistency, using UTC here. Adjust if local timezone interpretation is needed.
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
}

/**
 * Formats a Date object to a more readable string (e.g., HH:mm).
 * @param date The Date object.
 * @returns Formatted time string.
 */
function formatTime(date: Date): string {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });
}

// --- Function to Call Navitia API ---
async function callNavitia(
    fromStationId: string,
    toStationId: string,
    currentDateTimeForAPI: string,
    apiKey: string
): Promise<Response> {
    const params = new URLSearchParams({
        from: fromStationId,
        to: toStationId,
        datetime: currentDateTimeForAPI,
        datetime_represents: 'departure',
        count: '20', // Request a decent number of journeys to filter from
    });
    const journeysUrl = `${NAVITIA_BASE_URL}/coverage/${COVERAGE}/journeys?${params.toString()}`;

    // Basic Auth: username is the API key, password is empty
    const basicAuthToken = Buffer.from(`${apiKey}:`).toString('base64');

    return fetch(journeysUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${basicAuthToken}`,
            'Accept': 'application/json'
        }
    });
}

// --- Main Function to Get and Display Train Journeys ---
async function getAndDisplayTrainJourneys(): Promise<TrainJourneysResult> {
    const queryInitiationTime = new Date();
    let requestedApiDepartureTimeISO: string | null = null;

    if (!API_KEY) {
        return {
            fromStationId: FROM_STATION_ID,
            toStationId: TO_STATION_ID,
            queryTime: queryInitiationTime.toISOString(),
            requestedApiDepartureTime: null, // API call not prepared due to config error
            error: {
                type: "CONFIGURATION_ERROR",
                message: "NAVITIA_API_KEY is not set in your .env file or environment variables. Please create a .env file with NAVITIA_API_KEY=YOUR_KEY or set it as an environment variable."
            }
        };
    }

    const now = new Date(); // This 'now' is for the departure window and API datetime parameter
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const currentDateTimeForAPI = toNavitiaDateTime(now);
    requestedApiDepartureTimeISO = parseNavitiaDateTime(currentDateTimeForAPI).toISOString();

    try {
        const response = await callNavitia(FROM_STATION_ID, TO_STATION_ID, currentDateTimeForAPI, API_KEY!);

        if (!response.ok) {
            // Attempt to get more detailed error from Navitia if possible
            let errorBody = `Status: ${response.status}`;
            try {
                const errorData = await response.json() as NavitiaJourneysResponse; // Type assertion
                if (errorData.error) {
                    errorBody += ` - ${errorData.error.id}: ${errorData.error.message}`;
                } else {
                    errorBody += ` - ${await response.text()}`;
                }
            } catch (e) {
                // If parsing error body fails, just use the status text
                errorBody += ` - ${response.statusText}`;
            }
            return {
                fromStationId: FROM_STATION_ID,
                toStationId: TO_STATION_ID,
                queryTime: queryInitiationTime.toISOString(),
                requestedApiDepartureTime: requestedApiDepartureTimeISO,
                error: {
                    type: "API_REQUEST_FAILED",
                    message: `API request failed: ${errorBody}`
                }
            };
        }

        const responseData = await response.json() as NavitiaJourneysResponse; // Type assertion

        if (responseData.error) {
            return {
                fromStationId: FROM_STATION_ID,
                toStationId: TO_STATION_ID,
                queryTime: queryInitiationTime.toISOString(),
                requestedApiDepartureTime: requestedApiDepartureTimeISO,
                error: {
                    type: "NAVITIA_API_ERROR",
                    message: `API Error: ${responseData.error.id} - ${responseData.error.message}`
                }
            };
        }
        
        const validTrainJourneys: Journey[] = [];

        if (responseData.journeys) { // Iterate only if responseData.journeys is an array
            for (const journey of responseData.journeys) {
                const journeyDepartureTime = parseNavitiaDateTime(journey.departure_date_time);

                if (journeyDepartureTime >= now && journeyDepartureTime <= oneHourFromNow) {
                    const hasTrainSection = journey.sections.some(section =>
                        section.type === 'public_transport' &&
                        section.display_informations &&
                        TRAIN_COMMERCIAL_MODES.some(mode => section.display_informations!.commercial_mode.toUpperCase().includes(mode))
                    );

                    if (hasTrainSection) {
                        validTrainJourneys.push(journey);
                    }
                }
            }
        }

        if (validTrainJourneys.length === 0) {
            return {
                fromStationId: FROM_STATION_ID,
                toStationId: TO_STATION_ID,
                queryTime: queryInitiationTime.toISOString(),
                requestedApiDepartureTime: requestedApiDepartureTimeISO,
                journeys: [],
                message: "No train journeys found departing in the next hour matching criteria."
            };
        }

        validTrainJourneys.sort((a, b) => {
            const arrivalA = parseNavitiaDateTime(a.arrival_date_time).getTime();
            const arrivalB = parseNavitiaDateTime(b.arrival_date_time).getTime();
            return arrivalA - arrivalB;
        });

        return {
            fromStationId: FROM_STATION_ID,
            toStationId: TO_STATION_ID,
            queryTime: queryInitiationTime.toISOString(),
            requestedApiDepartureTime: requestedApiDepartureTimeISO,
            journeys: validTrainJourneys
        };

    } catch (error) {
        // This catches errors from synchronous code before/after fetch, or if fetch itself throws unexpectedly.
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        return {
            fromStationId: FROM_STATION_ID,
            toStationId: TO_STATION_ID,
            queryTime: queryInitiationTime.toISOString(),
            requestedApiDepartureTime: requestedApiDepartureTimeISO, // Will be null if error occurred before its assignment
            error: {
                type: "UNEXPECTED_ERROR_IN_FUNCTION",
                message: errorMessage,
                details: !(error instanceof Error) ? error : undefined
            }
        };
    }
}

// --- Run the main function ---
// Note: `fetch` is natively available in Node.js v18+.
// If using an older version, you might need a polyfill like 'node-fetch'.
getAndDisplayTrainJourneys().then(result => {
    console.log(JSON.stringify(result, null, 2));
}).catch(err => {
    // This catch is a safeguard for unhandled promise rejections from getAndDisplayTrainJourneys itself.
    console.error("Unhandled error calling getAndDisplayTrainJourneys:", JSON.stringify(err, null, 2));
});

// To run this script:
// 1. Create a .env file in the same directory:
//    NAVITIA_API_KEY=YOUR_ACTUAL_API_KEY
// 2. Save this script as a .ts file (e.g., getTrains.ts).
// 3. Ensure you have Node.js (v18+ recommended for native fetch) and TypeScript installed.
// 4. Install dependencies: npm install dotenv @types/node
// 5. Compile: tsc getTrains.ts
// 6. Run: node getTrains.js
// Or directly run with ts-node: npm install -g ts-node typescript (if not already installed globally)
// Then: ts-node getTrains.ts
