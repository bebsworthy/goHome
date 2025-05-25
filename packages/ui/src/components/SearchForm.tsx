// No useState needed here
import { useAtom } from 'jotai';
import { useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';
import { 
  originStationAtom, 
  destinationStationAtom,
  isLoadingAtom,
  hasValidSearchAtom,
  journeyResultsAtom,
  lastSearchAtom,
  Station
} from '../config/state';
import StationAutocomplete from './StationAutocomplete';
import { sncfApiService } from '../utils/sncfApi';
import { localStorageService } from '../utils/localStorage';

/**
 * Search Form Component
 * 
 * A form for searching train journeys between stations.
 * Uses the StationAutocomplete component for station selection.
 */
export default function SearchForm() {
  const [origin, setOrigin] = useAtom(originStationAtom);
  const [destination, setDestination] = useAtom(destinationStationAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [hasValidSearch] = useAtom(hasValidSearchAtom);
  const [, setJourneyResults] = useAtom(journeyResultsAtom);
  const [, setLastSearch] = useAtom(lastSearchAtom);
  
  // Helper function to search for journeys
  const searchJourneys = async (from: Station, to: Station) => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      // Search for journeys
      const journeys = await sncfApiService.searchJourneys(
        from.id,
        to.id
      );
      
      // Update journey results
      setJourneyResults(journeys);
      
      // Save last search and results to localStorage and atom
      const searchParams = { origin: from, destination: to };
      localStorageService.saveLastSearch(searchParams);
      localStorageService.saveLastResults(journeys);
      setLastSearch(searchParams);
      
    } catch (error) {
      console.error('Error searching journeys:', error);
      setJourneyResults(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to handle search submission
  const handleSearch = () => {
    if (!hasValidSearch || isLoading || !origin || !destination) return;
    searchJourneys(origin, destination);
  };
  
  // Function to swap origin and destination
  const handleSwapStations = () => {
    // Only proceed if we have both origin and destination
    if (!origin || !destination) return;
    
    // Swap the stations
    const newOrigin = destination;
    const newDestination = origin;
    setOrigin(newOrigin);
    setDestination(newDestination);
    
    // The useEffect hook will automatically trigger a search when the values change
  };
  
  // Create debounced versions of origin and destination
  const [debouncedOrigin] = useDebounce(origin, 300);
  const [debouncedDestination] = useDebounce(destination, 300);
  
  // Memoized search function to avoid recreating on every render
  const debouncedSearch = useCallback(() => {
    if (hasValidSearch && debouncedOrigin && debouncedDestination && !isLoading) {
      searchJourneys(debouncedOrigin, debouncedDestination);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedOrigin, debouncedDestination, hasValidSearch, isLoading]);
  
  // Auto-search when debounced values change
  useEffect(() => {
    // Don't trigger on initial render when both are null
    if (debouncedOrigin && debouncedDestination) {
      debouncedSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedOrigin, debouncedDestination]);
  
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
              onClick={handleSwapStations}
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
