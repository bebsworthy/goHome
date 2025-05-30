const API_URL = '/api/local';

export interface Event {
  id: number;
  title: string;
  dates: string[];
  startTime?: string;
  endTime?: string;
  location: string;
  city?: string;
  description?: string;
  organizer?: string;
  price?: string;
  category?: string;
  email?: string;
  phone?: string;
}

export interface EventsResponse {
  events: Event[];
  count: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export async function getEvents(startDate: string, endDate: string): Promise<Event[]> {
  try {
    const response = await fetch(
      `${API_URL}/events?start=${startDate}&end=${endDate}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch events: ${JSON.stringify(error)}`);
    }

    const data: EventsResponse = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function updateEvent(event: Event): Promise<Event> {
  try {
    const response = await fetch(`${API_URL}/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update event: ${JSON.stringify(error)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}