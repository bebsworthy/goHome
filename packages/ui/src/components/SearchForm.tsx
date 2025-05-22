// No useState needed here
import { useAtom } from 'jotai';
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
  lastSearchAtom
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
  
  // Function to swap origin and destination
  const handleSwapStations = () => {
    const tempOrigin = origin;
    setOrigin(destination);
    setDestination(tempOrigin);
  };
  
  // Function to handle search submission
  const handleSearch = async () => {
    if (!hasValidSearch || isLoading) return;
    
    try {
      setIsLoading(true);
      
      // Search for journeys
      const journeys = await sncfApiService.searchJourneys(
        origin!.id,
        destination!.id
      );
      
      // Update journey results
      setJourneyResults(journeys);
      
      // Save last search to localStorage and atom
      const searchParams = { origin: origin!, destination: destination! };
      localStorageService.saveLastSearch(searchParams);
      setLastSearch(searchParams);
      
    } catch (error) {
      console.error('Error searching journeys:', error);
      setJourneyResults(null);
    } finally {
      setIsLoading(false);
    }
  };
  
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
