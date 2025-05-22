import { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchForm from '@/components/SearchForm';
import { useAtom } from 'jotai';
import { lastSearchAtom, originStationAtom, destinationStationAtom } from '@/config/state';
import { localStorageService } from '@/utils/localStorage';

/**
 * Home Page Component
 * 
 * The main landing page of the GoHome application.
 * Displays the search form and handles loading of last search from localStorage.
 */
function Home() {
  const [, setLastSearch] = useAtom(lastSearchAtom);
  const [, setOrigin] = useAtom(originStationAtom);
  const [, setDestination] = useAtom(destinationStationAtom);

  // Load last search from localStorage on component mount
  useEffect(() => {
    const savedSearch = localStorageService.getLastSearch();
    if (savedSearch) {
      setLastSearch(savedSearch);
      setOrigin(savedSearch.origin);
      setDestination(savedSearch.destination);
    }
  }, [setLastSearch, setOrigin, setDestination]);

  return (
    <>
      <meta name="title" content="Home" />
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            GoHome
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Find your way home with fast SNCF train searches
          </Typography>
        </Box>
        
        <SearchForm />
        
        {/* Journey results will be displayed here in a future task */}
      </Container>
    </>
  );
}

export default Home;
