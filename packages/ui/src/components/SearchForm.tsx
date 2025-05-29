import { useCallback, useState, useEffect } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Collapse,
} from '@mui/material';

import { useJourneyQuery } from '../hooks/useJourneyQuery';
import StationAutocomplete from './StationAutocomplete';

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
    isUsingSavedData,
  } = useJourneyQuery();

  // Initialize isExpanded based on whether we need input
  const [isExpanded, setIsExpanded] = useState(!origin || !destination);

  // Update isExpanded when origin or destination changes
  useEffect(() => {
    // If either origin or destination is missing, expand the form
    if (!origin || !destination) {
      setIsExpanded(true);
    }
  }, [origin, destination]);

  // Function to handle search submission
  const handleSearch = useCallback(() => {
    if (!hasValidSearch || isLoading || !origin || !destination) return;

    // Perform the search with force refresh
    searchJourneys(origin, destination, true);
    // Collapse the form after search
    setIsExpanded(false);
  }, [hasValidSearch, isLoading, origin, destination, searchJourneys]);

  // Function to handle clearing saved search
  const handleClearSavedSearch = useCallback(() => {
    clearSavedSearch();
    // Expand the form when clearing the search
    setIsExpanded(true);
  }, [clearSavedSearch]);

  // Function to handle refresh
  const handleRefresh = useCallback(() => {
    if (!hasValidSearch || isLoading || !origin || !destination) return;
    searchJourneys(origin, destination, true);
  }, [hasValidSearch, isLoading, origin, destination, searchJourneys]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      {/* Collapsed View */}
      {!isExpanded && origin && destination && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Typography variant="h6" component="div" sx={{ mr: 1 }}>
              {origin.name}
            </Typography>
            <ArrowForwardIcon sx={{ mx: 1, color: 'text.secondary' }} />
            <Typography variant="h6" component="div">
              {destination.name}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Refresh search">
              <IconButton
                onClick={handleRefresh}
                disabled={isLoading}
                color="primary"
                size="small"
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Expand search form">
              <IconButton
                onClick={() => setIsExpanded(true)}
                color="primary"
                size="small"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      )}

      {/* Expanded View */}
      <Collapse in={isExpanded}>
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Trip
          </Typography>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Swap stations">
              <IconButton
                onClick={swapStations}
                disabled={!origin && !destination}
                color="primary"
                size="small"
                aria-label="swap stations"
              >
                <SwapHorizIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Collapse search form">
              <IconButton
                onClick={() => setIsExpanded(false)}
                disabled={!origin || !destination}
                color="primary"
                size="small"
              >
                <ExpandLessIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

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
      </Collapse>
    </Paper>
  );
}
