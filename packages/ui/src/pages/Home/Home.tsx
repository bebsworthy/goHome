import { useEffect, useState, useCallback } from 'react';
import { Container, Box, Button, Chip, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import HistoryIcon from '@mui/icons-material/History';
import SearchForm from '../../components/SearchForm';
import JourneyResults from '../../components/JourneyResults';
import { useAtom } from 'jotai';
import { lastSearchAtom, originStationAtom, destinationStationAtom, journeyResultsAtom, isLoadingAtom, errorAtom, Station } from '../../config/state';
import { localStorageService } from '../../utils/localStorage';
import { sncfApiService } from '../../utils/sncfApi';

/**
 * Home Page Component
 * 
 * The main landing page of the GoHome application.
 * Displays the search form and handles loading of last search from localStorage.
 */
function Home() {
  const [lastSearch, setLastSearch] = useAtom(lastSearchAtom);
  const [, setOrigin] = useAtom(originStationAtom);
  const [, setDestination] = useAtom(destinationStationAtom);
  const [, setJourneyResults] = useAtom(journeyResultsAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [isUsingSavedSearch, setIsUsingSavedSearch] = useState(false);

  // Function to search for journeys
  const searchJourneys = useCallback(async (origin: Station, destination: Station) => {
    if (!origin || !destination) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Search for journeys
      const journeys = await sncfApiService.searchJourneys(
        origin.id,
        destination.id
      );
      
      // Update journey results
      setJourneyResults(journeys);
      
    } catch (error) {
      console.error('Error searching journeys:', error);
      setError('Failed to load journeys. Please try again.');
      setJourneyResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, setJourneyResults]);
  
  // Load last search from localStorage on component mount
  useEffect(() => {
    const savedSearch = localStorageService.getLastSearch();
    const savedResults = localStorageService.getLastResults();
    
    if (savedSearch) {
      // Set search parameters
      setLastSearch(savedSearch);
      setOrigin(savedSearch.origin);
      setDestination(savedSearch.destination);
      setIsUsingSavedSearch(true);
      
      // If we have saved results, use them instead of making a new request
      if (savedResults) {
        console.log('Loading journey results from localStorage');
        setJourneyResults(savedResults);
      } else {
        // Only make a server request if we don't have saved results
        console.log('No saved results found, fetching from server');
        searchJourneys(savedSearch.origin, savedSearch.destination);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // Empty dependency array to run only once on mount
  
  // Function to clear saved search
  const handleClearSavedSearch = () => {
    // Clear localStorage
    localStorageService.clearLastSearch();
    
    // Clear form and results
    setOrigin(null);
    setDestination(null);
    setJourneyResults(null);
    setLastSearch(null);
    setIsUsingSavedSearch(false);
  };

  return (
    <>
      <meta name="title" content="Home" />
      <Container maxWidth="md">
        {isUsingSavedSearch && lastSearch && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: -2 }}>
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
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <SearchForm />
        </Box>

        <JourneyResults />
      </Container>
    </>
  );
}

export default Home;
