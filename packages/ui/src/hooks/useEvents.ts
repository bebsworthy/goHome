import { useQuery } from '@tanstack/react-query';
import { Event, getEvents } from '@/utils/localeventApi';

export interface DateRange {
  start: string;
  end: string;
}

export function useEvents(dateRange: DateRange) {
  return useQuery({
    queryKey: ['events', dateRange],
    queryFn: () => getEvents(dateRange.start, dateRange.end),
  });
}
