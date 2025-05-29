import { Box, Card, CardContent, Typography, Stack, Collapse, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { Departure } from '../utils/types';
import { useState, useMemo } from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import { toDate, formatInTimeZone } from 'date-fns-tz';

const FRANCE_TIMEZONE = 'Europe/Paris';

interface DepartureListProps {
  departures: Departure[];
}

/**
 * Parses SNCF's datetime string (YYYYMMDDTHHmmss) into a JavaScript Date object.
 * @param dateTimeStr The SNCF datetime string.
 * @returns A JavaScript Date object in the local timezone.
 */
function parseSNCFDateTime(dateTimeStr: string): Date {
  const year = parseInt(dateTimeStr.slice(0, 4));
  const month = parseInt(dateTimeStr.slice(4, 6)) - 1; // JS months are 0-based
  const day = parseInt(dateTimeStr.slice(6, 8));
  const hour = parseInt(dateTimeStr.slice(9, 11));
  const minute = parseInt(dateTimeStr.slice(11, 13));
  const second = parseInt(dateTimeStr.slice(13, 15));

  // Create a Date object in France timezone and convert to UTC
  return toDate(new Date(year, month, day, hour, minute, second), { timeZone: FRANCE_TIMEZONE });
}

/**
 * Formats a date to display time in HH:mm format in France timezone
 * @param dateStr SNCF datetime string (e.g., "20250528T172200")
 */
function formatTime(dateStr: string): string {
  try {
    const date = parseSNCFDateTime(dateStr);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateStr);
      return '--:--';
    }
    // Format in Paris timezone
    return formatInTimeZone(date, FRANCE_TIMEZONE, 'HH:mm');
  } catch (error) {
    console.error('Error parsing date:', dateStr, error);
    return '--:--';
  }
}

export default function DepartureList({ departures }: DepartureListProps) {
  const [debugOpenMap, setDebugOpenMap] = useState<Record<string, boolean>>({});
  
  // Get unique physical modes and initialize all as selected
  const uniquePhysicalModes = useMemo(() => 
    Array.from(new Set(departures.map(d => d.display_informations.physical_mode))).sort()
  , [departures]);
  
  const [selectedModes, setSelectedModes] = useState<string[]>(uniquePhysicalModes);

  const handleModeToggle = (_: React.MouseEvent<HTMLElement>, newModes: string[]) => {
    setSelectedModes(newModes);
  };

  const toggleDebug = (id: string) => {
    setDebugOpenMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!departures.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1" color="text.secondary">
          No departures found
        </Typography>
      </Box>
    );
  }

  // Filter departures based on selected modes
  const filteredDepartures = departures.filter(departure => 
    selectedModes.includes(departure.display_informations.physical_mode)
  );

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {/* Filter Buttons */}
      <Box sx={{ mb: 2, overflowX: 'auto' }}>
        <ToggleButtonGroup
          value={selectedModes}
          onChange={handleModeToggle}
          aria-label="transport modes"
          size="small"
          sx={{
            flexWrap: 'wrap',
            '& .MuiToggleButtonGroup-grouped': {
              margin: 0.5,
            },
          }}
        >
          {uniquePhysicalModes.map((mode) => (
            <ToggleButton 
              key={mode} 
              value={mode}
              aria-label={mode}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    color: 'white',
                  },
                },
              }}
            >
              {mode}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* No results message */}
      {filteredDepartures.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
          No departures match the selected filters
        </Typography>
      )}

      {/* Departure Cards */}
      {filteredDepartures.map((departure, index) => {
        const departureId = `${departure.stop_point.id}-${index}`;
        return (
          <Card key={departureId} variant="outlined">
            <CardContent>
              <Stack spacing={1}>
                {/* Time and Train Info */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" component="div">
                    {formatTime(departure.stop_date_time.departure_date_time)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">

                    {departure.display_informations.direction} -
                    {/* For TER, use commercial_mode, otherwise use label */}
                    {departure.display_informations.physical_mode.startsWith("TER") ?
                      departure.display_informations.commercial_mode :
                      departure.display_informations.label}
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
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {departure.display_informations.network}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => toggleDebug(departureId)}
                      sx={{ opacity: 0.6 }}
                    >
                      <BugReportIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* debug */}
                <Collapse in={debugOpenMap[departureId]}>
                  <Box sx={{ mt: 1, backgroundColor: '#f5f5f5', borderRadius: 1, p: 1 }}>
                    <pre style={{ fontSize: '10px', margin: 0, whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(departure, null, 2)}
                    </pre>
                  </Box>
                </Collapse>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
} 