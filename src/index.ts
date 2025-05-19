// Import axios for making HTTP requests
import axios from 'axios';

// --- Configuration ---
// IMPORTANT: Replace 'YOUR_API_KEY' with your actual Navitia API key.
const API_KEY = 'YOUR_API_KEY';
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


// --- Interfaces for Navitia API Response ---
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

// --- Helper Functions ---

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
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds)); // Use UTC to match Navitia's typical timezone handling
}

/**
 * Formats a Date object to a more readable string (e.g., HH:mm).
 * @param date The Date object.
 * @returns Formatted time string.
 */
function formatTime(date: Date): string {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });
}


// --- Main Function to Get and Display Train Journeys ---
async function getAndDisplayTrainJourneys(): Promise<void> {
    if (API_KEY === 'YOUR_API_KEY') {
        console.error("🛑 Error: Please replace 'YOUR_API_KEY' with your actual Navitia API key in the script.");
        return;
    }

    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const currentDateTimeForAPI = toNavitiaDateTime(now);

    const journeysUrl = `${NAVITIA_BASE_URL}/coverage/${COVERAGE}/journeys`;

    console.log(`🔍 Searching for trains from ${FROM_STATION_ID} to ${TO_STATION_ID}`);
    console.log(`🕒 Departing between ${formatTime(now)} and ${formatTime(oneHourFromNow)} (Paris Time)`);
    console.log(`--------------------------------------------------`);

    try {
        const response = await axios.get<NavitiaJourneysResponse>(journeysUrl, {
            params: {
                from: FROM_STATION_ID,
                to: TO_STATION_ID,
                datetime: currentDateTimeForAPI,
                datetime_represents: 'departure', // Search for journeys starting from 'datetime'
                count: 20, // Request a decent number of journeys to filter from
                // You can add other parameters like 'min_nb_transfers', 'max_nb_transfers', etc.
                // 'allowed_id[]': ['commercial_mode:Train'] // This might be too restrictive if direct train is not available, filtering client-side is more flexible
            },
            auth: {
                username: API_KEY,
                password: '' // Password should be blank as per Navitia docs for token auth
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.data.error) {
            console.error(`API Error: ${response.data.error.id} - ${response.data.error.message}`);
            return;
        }

        if (!response.data.journeys || response.data.journeys.length === 0) {
            console.log("🤷 No journeys found for the specified criteria.");
            return;
        }
        
        const validTrainJourneys: Journey[] = [];

        for (const journey of response.data.journeys) {
            // Parse journey departure time
            const journeyDepartureTime = parseNavitiaDateTime(journey.departure_date_time);

            // Check if the journey departs within the next hour
            if (journeyDepartureTime >= now && journeyDepartureTime <= oneHourFromNow) {
                // Check if the journey contains at least one train section
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

        if (validTrainJourneys.length === 0) {
            console.log("🤷 No train journeys found departing in the next hour.");
            return;
        }

        // Sort the valid train journeys by arrival time
        validTrainJourneys.sort((a, b) => {
            const arrivalA = parseNavitiaDateTime(a.arrival_date_time).getTime();
            const arrivalB = parseNavitiaDateTime(b.arrival_date_time).getTime();
            return arrivalA - arrivalB;
        });

        console.log("\n✅ Upcoming Trains (sorted by arrival time):\n");
        validTrainJourneys.forEach((journey, index) => {
            const departure = parseNavitiaDateTime(journey.departure_date_time);
            const arrival = parseNavitiaDateTime(journey.arrival_date_time);
            
            const trainSections = journey.sections.filter(s => 
                s.type === 'public_transport' && 
                s.display_informations &&
                TRAIN_COMMERCIAL_MODES.some(mode => s.display_informations!.commercial_mode.toUpperCase().includes(mode))
            );
            
            const trainInfo = trainSections.map(s => 
                `${s.display_informations?.commercial_mode} ${s.display_informations?.code || ''} (Direction: ${s.display_informations?.direction || 'N/A'})`
            ).join(', then ');

            console.log(
                `${index + 1}. Departs: ${formatTime(departure)} -> Arrives: ${formatTime(arrival)} (Duration: ${Math.round(journey.duration / 60)} min)`
            );
            console.log(`   Train(s): ${trainInfo}`);
            if (journey.nb_transfers > 0) {
                 console.log(`   Transfers: ${journey.nb_transfers}`);
            }
            console.log(`   ---`);
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(" Axios request failed:", error.message);
            if (error.response) {
                console.error(" Status:", error.response.status);
                console.error(" Data:", error.response.data);
            }
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
}

// --- Run the main function ---
getAndDisplayTrainJourneys();

// To run this script:
// 1. Save it as a .ts file (e.g., getTrains.ts).
// 2. Ensure you have Node.js and TypeScript installed.
// 3. Install axios: npm install axios @types/node
// 4. Compile: tsc getTrains.ts
// 5. Run: node getTrains.js
// Or directly run with ts-node: npm install -g ts-node typescript (if not already installed globally)
// Then: ts-node getTrains.ts
