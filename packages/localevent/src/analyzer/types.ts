export interface EventInformation {
    title: string;
    dates: string[];
    time?: string;
    startTime?: string;
    endTime?: string;
    location: string;
    city?: string;
    description?: string | null;
    organizer?: string;
    price?: string | null;
    category?: string | null;
    email?: string | null;
    phone?: string | null;
    rawText?: string;
}
