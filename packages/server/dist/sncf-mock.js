// Mock data for stations
const mockStations = {
    'stop_area:SNCF:87391003': {
        id: 'stop_area:SNCF:87391003',
        name: 'Paris Gare de Lyon',
        coordinates: {
            longitude: 2.372977,
            latitude: 48.844746
        }
    },
    'stop_area:SNCF:87686006': {
        id: 'stop_area:SNCF:87686006',
        name: 'Lyon Part Dieu',
        coordinates: {
            longitude: 4.859424,
            latitude: 45.760251
        }
    },
    'stop_area:SNCF:87751008': {
        id: 'stop_area:SNCF:87751008',
        name: 'Marseille St Charles',
        coordinates: {
            longitude: 5.380410,
            latitude: 43.303812
        }
    },
    'stop_area:SNCF:87271007': {
        id: 'stop_area:SNCF:87271007',
        name: 'Bordeaux St Jean',
        coordinates: {
            longitude: -0.556437,
            latitude: 44.825881
        }
    },
    'stop_area:SNCF:87113001': {
        id: 'stop_area:SNCF:87113001',
        name: 'Lille Flandres',
        coordinates: {
            longitude: 3.069483,
            latitude: 50.636924
        }
    },
    'stop_area:SNCF:87547000': {
        id: 'stop_area:SNCF:87547000',
        name: 'Strasbourg',
        coordinates: {
            longitude: 7.733973,
            latitude: 48.585094
        }
    },
    'stop_area:SNCF:87212027': {
        id: 'stop_area:SNCF:87212027',
        name: 'Nantes',
        coordinates: {
            longitude: -1.542565,
            latitude: 47.217233
        }
    }
};
// Helper function to generate random journey sections
function generateJourneySections(fromStationId, toStationId, departureTime, arrivalTime) {
    const fromStation = mockStations[fromStationId];
    const toStation = mockStations[toStationId];
    if (!fromStation || !toStation) {
        throw new Error(`Station not found: ${!fromStation ? fromStationId : toStationId}`);
    }
    // For direct journeys
    if (Math.random() > 0.3) {
        return [{
                type: 'public_transport',
                mode: 'rail',
                duration: (arrivalTime.getTime() - departureTime.getTime()) / 1000,
                from: fromStation.name,
                fromId: fromStation.id,
                to: toStation.name,
                toId: toStation.id,
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                commercialMode: Math.random() > 0.5 ? 'TGV' : 'TER',
                physicalMode: 'Train',
                network: 'SNCF',
                label: Math.random() > 0.5 ? 'TGV INOUI' : 'TER',
                headsign: toStation.name,
                tripShortName: Math.random() > 0.5 ? '6231' : '8742'
            }];
    }
    // For journeys with a connection
    else {
        // Choose a random intermediate station
        const intermediateStationIds = Object.keys(mockStations).filter(id => id !== fromStationId && id !== toStationId);
        const intermediateStationId = intermediateStationIds[Math.floor(Math.random() * intermediateStationIds.length)];
        const intermediateStation = mockStations[intermediateStationId];
        // Calculate intermediate time
        const totalDuration = arrivalTime.getTime() - departureTime.getTime();
        const intermediateDuration = totalDuration * (0.4 + Math.random() * 0.2); // 40-60% of total time
        const intermediateTime = new Date(departureTime.getTime() + intermediateDuration);
        // Add 15-30 minutes connection time
        const connectionTime = 15 * 60 * 1000 + Math.random() * 15 * 60 * 1000;
        const secondDepartureTime = new Date(intermediateTime.getTime() + connectionTime);
        return [
            {
                type: 'public_transport',
                mode: 'rail',
                duration: (intermediateTime.getTime() - departureTime.getTime()) / 1000,
                from: fromStation.name,
                fromId: fromStation.id,
                to: intermediateStation.name,
                toId: intermediateStation.id,
                departureTime: departureTime,
                arrivalTime: intermediateTime,
                commercialMode: Math.random() > 0.5 ? 'TGV' : 'TER',
                physicalMode: 'Train',
                network: 'SNCF',
                label: Math.random() > 0.5 ? 'TGV INOUI' : 'TER',
                headsign: intermediateStation.name,
                tripShortName: Math.random() > 0.5 ? '6231' : '8742'
            },
            {
                type: 'public_transport',
                mode: 'rail',
                duration: (arrivalTime.getTime() - secondDepartureTime.getTime()) / 1000,
                from: intermediateStation.name,
                fromId: intermediateStation.id,
                to: toStation.name,
                toId: toStation.id,
                departureTime: secondDepartureTime,
                arrivalTime: arrivalTime,
                commercialMode: Math.random() > 0.5 ? 'TGV' : 'TER',
                physicalMode: 'Train',
                network: 'SNCF',
                label: Math.random() > 0.5 ? 'TGV INOUI' : 'TER',
                headsign: toStation.name,
                tripShortName: Math.random() > 0.5 ? '8521' : '7413'
            }
        ];
    }
}
// Generate a set of mock journeys
function generateMockJourneys(fromStationId, toStationId, now = new Date()) {
    const journeys = [];
    // Generate 5-10 journeys
    const numJourneys = 5 + Math.floor(Math.random() * 6);
    // Start with journeys from the current time
    let departureTime = new Date(now);
    for (let i = 0; i < numJourneys; i++) {
        // Add 20-40 minutes between departures
        departureTime = new Date(departureTime.getTime() + (20 + Math.floor(Math.random() * 21)) * 60 * 1000);
        // Journey duration between 1-4 hours depending on stations
        const durationHours = 1 + Math.random() * 3;
        const durationMs = durationHours * 60 * 60 * 1000;
        const arrivalTime = new Date(departureTime.getTime() + durationMs);
        const sections = generateJourneySections(fromStationId, toStationId, departureTime, arrivalTime);
        journeys.push({
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            duration: durationMs / 1000,
            transfers: sections.length - 1,
            sections: sections,
            requestedApiDepartureTime: now.toISOString()
        });
    }
    // Sort journeys by arrival time
    return journeys.sort((a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime());
}
// Mock implementation of findEarliestArrivingJourneys
export async function findEarliestArrivingJourneys(fromStationId, toStationId, now = new Date()) {
    console.log(`[MOCK API] Finding journeys from ${fromStationId} to ${toStationId}`);
    // Simulate network delay (200-800ms)
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 600));
    // Get or create mock stations for the provided IDs
    const fromStation = getOrCreateMockStation(fromStationId);
    const toStation = getOrCreateMockStation(toStationId);
    // Generate and return mock journeys
    return generateMockJourneys(fromStation.id, toStation.id, now);
}
// Helper function to get an existing station or create a mock one if it doesn't exist
function getOrCreateMockStation(stationId) {
    // If the station exists in our mock data, return it
    if (mockStations[stationId]) {
        return mockStations[stationId];
    }
    // Otherwise, create a mock station with the given ID
    console.log(`[MOCK API] Creating mock station for unknown ID: ${stationId}`);
    // Extract a name from the ID if possible, or use a generic name
    const stationName = stationId.includes(':')
        ? `Mock ${stationId.split(':').pop()}`
        : `Mock Station ${stationId}`;
    // Create a new mock station
    const mockStation = {
        id: stationId,
        name: stationName,
        coordinates: {
            // Generate random coordinates in France
            longitude: 2 + Math.random() * 4, // ~2-6 degrees (roughly France)
            latitude: 43 + Math.random() * 6 // ~43-49 degrees (roughly France)
        }
    };
    // Add it to our mock stations
    mockStations[stationId] = mockStation;
    return mockStation;
}
// Mock implementation of findStations
export async function findStations(query) {
    console.log(`[MOCK API] Searching stations with query: "${query}"`);
    // Simulate network delay (100-500ms)
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 400));
    // Filter stations based on the query (case-insensitive)
    const lowercaseQuery = query.toLowerCase();
    const matchingStations = Object.values(mockStations).filter(station => station.name.toLowerCase().includes(lowercaseQuery));
    console.log(`[MOCK API] Found ${matchingStations.length} stations matching "${query}"`);
    return matchingStations;
}
// Mock implementation of findDepartures
export async function findDepartures(stopAreaId, fromDateTime = new Date(), count = 10) {
    console.log(`[MOCK API] Finding departures from ${stopAreaId}`);
    // Simulate network delay (200-800ms)
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 600));
    // Get or create mock station for the provided ID
    const station = getOrCreateMockStation(stopAreaId);
    // Generate mock departures
    const departures = [];
    let currentTime = new Date(fromDateTime);
    for (let i = 0; i < count; i++) {
        // Add random minutes (5-30) to the current time
        currentTime = new Date(currentTime.getTime() + (5 + Math.random() * 25) * 60000);
        // Generate a random destination from our mock stations
        const destinationIds = Object.keys(mockStations).filter(id => id !== stopAreaId);
        const destinationId = destinationIds[Math.floor(Math.random() * destinationIds.length)];
        const destination = mockStations[destinationId];
        departures.push({
            stop_point: {
                id: `${station.id}:1`,
                name: station.name,
                coord: {
                    lat: station.coordinates.latitude,
                    lon: station.coordinates.longitude
                }
            },
            route: {
                id: `route:SNCF:${Math.random().toString(36).substring(7)}`,
                name: `${station.name} - ${destination.name}`,
                direction: {
                    id: destination.id,
                    name: destination.name
                }
            },
            stop_date_time: {
                departure_date_time: currentTime.toISOString(),
                base_departure_date_time: currentTime.toISOString(),
                arrival_date_time: currentTime.toISOString(),
                base_arrival_date_time: currentTime.toISOString()
            },
            display_informations: {
                network: 'SNCF',
                physical_mode: Math.random() > 0.5 ? 'Train grande vitesse' : 'Train express régional',
                headsign: `${Math.random() > 0.5 ? 'TGV' : 'TER'} ${Math.floor(Math.random() * 9999)}`,
                direction: destination.name,
                commercial_mode: Math.random() > 0.5 ? 'TGV INOUI' : 'TER',
                label: Math.random() > 0.5 ? 'TGV' : 'TER'
            }
        });
    }
    return departures;
}
//# sourceMappingURL=sncf-mock.js.map