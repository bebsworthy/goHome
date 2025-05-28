import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import type { Departure } from '../utils/types';

interface DepartureListProps {
  departures: Departure[];
}

/**
 * Parses SNCF's datetime string (YYYYMMDDTHHmmss) into a JavaScript Date object.
 * @param dateTimeStr The SNCF datetime string (e.g., "20250528T172200")
 */
function parseSNCFDateTime(dateTimeStr: string): Date {
  const year = parseInt(dateTimeStr.slice(0, 4));
  const month = parseInt(dateTimeStr.slice(4, 6)) - 1; // JS months are 0-based
  const day = parseInt(dateTimeStr.slice(6, 8));
  const hour = parseInt(dateTimeStr.slice(9, 11));
  const minute = parseInt(dateTimeStr.slice(11, 13));
  const second = parseInt(dateTimeStr.slice(13, 15));

  // SNCF uses local time (Europe/Paris)
  return new Date(year, month, day, hour, minute, second);
}

/**
 * Formats a date to display time in HH:mm format
 * @param dateStr SNCF datetime string (e.g., "20250528T172200")
 */
function formatTime(dateStr: string): string {
  try {
    const date = parseSNCFDateTime(dateStr);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateStr);
      return '--:--';
    }
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error parsing date:', dateStr, error);
    return '--:--';
  }
}

export default function DepartureList({ departures }: DepartureListProps) {
  if (!departures.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1" color="text.secondary">
          No departures found
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {departures.map((departure, index) => (
        <Card key={`${departure.stop_point.id}-${index}`} variant="outlined">
          <CardContent>
            <Stack spacing={1}>
              {/* Time and Train Info */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="div">
                  {formatTime(departure.stop_date_time.departure_date_time)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {departure.display_informations.commercial_mode}
                </Typography>
              </Stack>

              {/* Train Details */}
              <Stack spacing={0.5}>
                <Typography variant="body1">
                  {departure.display_informations.headsign}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Direction: {departure.route.direction.name}
                </Typography>
              </Stack>

              {/* Platform and Status */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {departure.display_informations.physical_mode}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {departure.display_informations.network}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
} 