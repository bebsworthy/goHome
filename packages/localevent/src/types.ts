export interface Event {
  id: number;
  title: string;
  dates: string[];
  location: string;
  startTime?: string;
  endTime?: string;
  city?: string;
  description?: string;
  organizer?: string;
  price?: string;
  category?: string;
  email?: string;
  phone?: string;
  images?: string[];
  latitude?: number;
  longitude?: number;
  rawText?: string;
}

export interface EventResponse {
  events: Event[];
  count: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface ErrorResponse {
  error: unknown;
}

export interface DeleteResponse {
  message: string;
}

export enum ImageStatus {
  PENDING = 'pending',
  DONE = 'done',
  FAILED = 'failed'
}