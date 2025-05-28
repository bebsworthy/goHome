import { useState } from 'react';
import { Box, Typography, CircularProgress, IconButton, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { FullSizeCentered } from '@/components/styled';
import StationAutocomplete from '@/components/StationAutocomplete';
import DepartureList from '@/components/DepartureList';
import { sncfApiService } from '@/utils/sncfApi';
import type { Station } from '@/config/state';
import type { Departure } from '@/utils/types';

function DeparturePage() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartures = async (station: Station) => {
    setLoading(true);
    setError(null);
    try {
      const departures = await sncfApiService.getDepartures(station.id);
      setDepartures(departures);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch departures');
      setDepartures([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStationChange = async (station: Station | null) => {
    setSelectedStation(station);
    setError(null);

    if (station) {
      await fetchDepartures(station);
    } else {
      setDepartures([]);
    }
  };

  const handleRefresh = async () => {
    if (selectedStation) {
      await fetchDepartures(selectedStation);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Train Departures
      </Typography>

      <Stack direction="row" spacing={1} sx={{ maxWidth: 600, mb: 4 }}>
        <Box flexGrow={1}>
          <StationAutocomplete
            label="Station"
            value={selectedStation}
            onChange={handleStationChange}
            placeholder="Select a station to see departures"
            required
          />
        </Box>
        <IconButton
          onClick={handleRefresh}
          disabled={!selectedStation || loading}
          aria-label="Refresh departures"
          sx={{ alignSelf: 'center' }}
        >
          <RefreshIcon />
        </IconButton>
      </Stack>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <FullSizeCentered>
          <CircularProgress />
        </FullSizeCentered>
      ) : (
        selectedStation && <DepartureList departures={departures} />
      )}
    </Box>
  );
}

export default DeparturePage; 