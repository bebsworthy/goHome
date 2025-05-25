import { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import SearchForm from '../../components/SearchForm';
import JourneyResults from '../../components/JourneyResults';
import { useAtom } from 'jotai';
import { lastSearchAtom, originStationAtom, destinationStationAtom } from '../../config/state';
import { localStorageService } from '../../utils/localStorage';

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
          <SearchForm />
        </Box>

        <JourneyResults />
      </Container>
    </>
  );
}

export default Home;
