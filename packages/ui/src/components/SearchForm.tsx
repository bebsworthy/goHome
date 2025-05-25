import { useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Grid,
  IconButton,
  Tooltip,
  Chip,
  Stack
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import ClearIcon from '@mui/icons-material/Clear';
import StationAutocomplete from './StationAutocomplete';
import { useJourneyQuery } from '../hooks/useJourneyQuery';

/**
 * Search Form Component
 * 
 * A form for searching train journeys between stations.
 * Uses the StationAutocomplete component for station selection.
 */
export default function SearchForm() {
  // Use our custom hook for all journey-related state and actions
  const {
    origin,
    destination,
    isLoading,
    hasValidSearch,
    lastSearch,
    setOrigin,
    setDestination,
    searchJourneys,
    swapStations,
    clearSavedSearch,
    isUsingSavedData
  } = useJourneyQuery();

  // Function to handle search submission
  const handleSearch = useCallback(() => {
    if (!hasValidSearch || isLoading || !origin || !destination) return;
    
    // Perform the search with force refresh
    searchJourneys(origin, destination, true);
  }, [hasValidSearch, isLoading, origin, destination, searchJourneys]);

  // Function to handle clearing saved search
  const handleClearSavedSearch = useCallback(() => {
    clearSavedSearch();
  }, [clearSavedSearch]);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.background.paper
      }}
    >
      {isUsingSavedData && lastSearch && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              icon={<HistoryIcon />}
              label="Using Saved Search"
              color="primary"
              variant="outlined"
              size="small"
            />
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleClearSavedSearch}
              startIcon={<ClearIcon />}
            >
              Clear Saved Search
            </Button>
          </Stack>
        </Box>
      )}
      
      <Typography variant="h5" component="h2" gutterBottom>
        Find Your Train
      </Typography>
      
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <StationAutocomplete
            label="From"
            placeholder="Departure station"
            value={origin}
            onChange={setOrigin}
            required
            testId="origin-station"
          />
        </Grid>
        
        <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Swap stations">
            <IconButton 
              onClick={swapStations}
              disabled={!origin && !destination}
              color="primary"
              size="large"
              aria-label="swap stations"
            >
              <SwapHorizIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <StationAutocomplete
            label="To"
            placeholder="Arrival station"
            value={destination}
            onChange={setDestination}
            required
            testId="destination-station"
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={!hasValidSearch || isLoading}
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </Box>
    </Paper>
  );
}
