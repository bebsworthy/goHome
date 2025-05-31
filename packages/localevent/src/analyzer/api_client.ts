import { EventInformation } from "./types.js";

const API_URL = `http://localhost:${process.env.API_PORT || 3000}`;

export async function saveEvent(eventInfo: EventInformation): Promise<{event:{id: any}}> {
  try {

    if (!eventInfo.title) {
      throw new Error('Event title is required');
    }
    if (!eventInfo.dates || eventInfo.dates.length === 0) {
      throw new Error('At least one event date is required');
    }
    
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: eventInfo.title,
        dates: eventInfo.dates,  // API expects dates in YYYY-MM-DD format
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

    if (response.status !== 200) {
      const error = await response.json();
      throw new Error(`Failed to save event: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);
    }

    const savedEvent = await response.json() as any;
    console.log(`Event "${eventInfo.title}" saved with ID ${savedEvent.event.id}`);
    if (savedEvent.duplicateOfId) {
      console.log(`This event is a duplicate of event ID ${savedEvent.duplicateOfId}`);
    }

    return savedEvent
  } catch (error) {
    console.error('Error saving event to database:', error);
    throw error;
  }
}
