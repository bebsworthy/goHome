import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEvents, updateEvent, deleteEvent } from '@/utils/localeventApi';

export interface DateRange {
  start: string;
  end: string;
}

export function useEvents(dateRange: DateRange) {
  const queryClient = useQueryClient();
  const queryKey = ['events', dateRange];

  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => getEvents(dateRange.start, dateRange.end),
  });

  const { mutate: updateEventMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutate: deleteEventMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    updateEvent: updateEventMutation,
    deleteEvent: deleteEventMutation,
    isUpdating,
    isDeleting,
  };
}
