import { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Box, Chip, CircularProgress, Stack } from '@mui/material';
import { useEvents } from '@/hooks/useEvents';
import dayjs from 'dayjs';

type DateRange<T> = [T | null, T | null];

function getDefaultDateRange(): DateRange<dayjs.Dayjs> {
  const start = dayjs();
  const end = dayjs().add(15, 'day');
  return [start, end];
}

function formatDateRange(range: DateRange<dayjs.Dayjs>): { start: string; end: string } {
  return {
    start: range[0]?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'),
    end: range[1]?.format('YYYY-MM-DD') || dayjs().add(15, 'day').format('YYYY-MM-DD')
  };
}

function formatDate(dates: string[]): string {
  if (dates.length === 1) {
    return new Date(dates[0]).toLocaleDateString();
  }
  return `${new Date(dates[0]).toLocaleDateString()} - ${new Date(dates[dates.length - 1]).toLocaleDateString()}`;
}

function formatTime(startTime?: string, endTime?: string): string {
  if (!startTime) return '';
  if (!endTime) return startTime;
  return `${startTime} - ${endTime}`;
}

function LocalEventPage() {
  const [dateRange, setDateRange] = useState<DateRange<dayjs.Dayjs>>(getDefaultDateRange());
  const { data: events = [], isLoading, error } = useEvents(formatDateRange(dateRange));

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error" variant="h6">
          Error: {error instanceof Error ? error.message : 'An error occurred'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Local Events</Typography>
      <Typography variant="subtitle1" gutterBottom color="textSecondary">
        Next 15 days
      </Typography>

      {events.length === 0 ? (
        <Typography variant="body1">No events found for the selected period.</Typography>
      ) : (
        <List>
          {events.map((event) => (
            <Paper key={event.id} sx={{ mb: 2 }}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div">
                      {event.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {formatDate(event.dates)}
                        {event.startTime && (
                          <> • {formatTime(event.startTime, event.endTime)}</>
                        )}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {event.location}
                        {event.city && <>, {event.city}</>}
                      </Typography>
                      {event.description && (
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {event.description}
                        </Typography>
                      )}
                      <Box sx={{ mt: 1 }}>
                        {event.price && (
                          <Chip 
                            label={event.price} 
                            size="small" 
                            sx={{ mr: 1, mb: 1 }} 
                          />
                        )}
                        {event.category && (
                          <Chip 
                            label={event.category} 
                            size="small" 
                            variant="outlined"
                            sx={{ mr: 1, mb: 1 }} 
                          />
                        )}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}

export default LocalEventPage;
