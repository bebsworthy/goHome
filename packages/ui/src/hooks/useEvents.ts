import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Event, getEvents, updateEvent } from '@/utils/localeventApi';

export interface DateRange {
  start: string;
  end: string;
}

export function useEvents(dateRange: DateRange) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['events', dateRange],
    queryFn: () => getEvents(dateRange.start, dateRange.end),
  });

  const updateMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      // Invalidate the events query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    ...query,
    updateEvent: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
