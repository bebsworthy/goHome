import { formatInTimeZone, toDate } from 'date-fns-tz';

const FRANCE_TIMEZONE = 'Europe/Paris';

/**
 * Formats a JavaScript Date object into SNCF's datetime string format (YYYYMMDDTHHmmss).
 * @param date The JavaScript Date object to format (in local timezone).
 * @returns The formatted datetime string in France timezone.
 */
export function toSNCFDateTime(date: Date): string {
    return formatInTimeZone(date, FRANCE_TIMEZONE, "yyyyMMdd'T'HHmmss");
}

/**
 * Parses SNCF's datetime string (YYYYMMDDTHHmmss) into a JavaScript Date object.
 * @param dateTimeStr The SNCF datetime string.
 * @returns A JavaScript Date object in the local timezone.
 */
export function parseSNCFDateTime(dateTimeStr: string): Date {
    const year = parseInt(dateTimeStr.slice(0, 4));
    const month = parseInt(dateTimeStr.slice(4, 6)) - 1; // JS months are 0-based
    const day = parseInt(dateTimeStr.slice(6, 8));
    const hour = parseInt(dateTimeStr.slice(9, 11));
    const minute = parseInt(dateTimeStr.slice(11, 13));
    const second = parseInt(dateTimeStr.slice(13, 15));

    // Create a Date object in France timezone and convert to UTC
    return toDate(new Date(year, month, day, hour, minute, second), { timeZone: FRANCE_TIMEZONE });
} 