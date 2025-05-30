import { EventInformation } from "./types";
const API_URL = `http://localhost:${process.env.API_PORT || 3000}`;
export async function saveEvent(eventInfo) {
    try {
        const response = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: eventInfo.title,
                dates: eventInfo.dates, // API expects dates in YYYY-MM-DD format
                startTime: eventInfo.startTime,
                endTime: eventInfo.endTime,
                location: eventInfo.location,
                city: eventInfo.city,
                description: eventInfo.description || undefined,
                organizer: eventInfo.organizer,
                price: eventInfo.price,
                category: eventInfo.category,
                email: eventInfo.email,
                phone: eventInfo.phone,
                rawText: eventInfo.rawText
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to save event: ${JSON.stringify(error)}`);
        }
        const savedEvent = await response.json();
        console.log(`Event "${eventInfo.Title}" saved with ID ${savedEvent.id}`);
    }
    catch (error) {
        console.error('Error saving event to database:', error);
        throw error;
    }
}
//# sourceMappingURL=api_client.js.map