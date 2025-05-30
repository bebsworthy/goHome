import { Box, Container } from '@mui/material';

import JourneyResults from '../../components/sncf/JourneyResults';
import SearchForm from '../../components/sncf/SearchForm';

/**
 * Home Page Component
 *
 * The main landing page of the GoHome application.
 * Displays the search form and handles loading of last search from localStorage.
 */
function Home() {
  // The hook is used in the SearchForm and JourneyResults components
  // No need to use it directly in the Home component anymore

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
