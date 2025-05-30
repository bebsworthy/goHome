import React, { useState } from 'react';

import {
  AccessTime as AccessTimeIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  TransferWithinAStation as TransferWithinAStationIcon
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Collapse,
  Divider,
  Grid2 as Grid,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { useAtom } from 'jotai';

import {
  Journey,
  Section,
  DisplayInformation,
  errorAtom,
  isLoadingAtom,
  journeyResultsAtom,
  lastSearchAtom,
} from '../../config/state';
import { parseSNCFDateTime } from '@/utils/dateTime';
import DisplayJSON from '../DisplayJSON';

/**
 * Format a date as a human-readable "time ago" string
 * @param date The date to format
 * @returns A string like "2 minutes ago", "1 hour ago", etc.
 */
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute
  if (seconds < 60) {
    return 'just now';
  }

  // Less than an hour
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  // Less than a day
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  // Less than a week
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  // Format as date for older timestamps
  return date.toLocaleDateString();
}

/**
 * Format a date to display time in HH:MM format
 */
const formatTime = (dateStr: string): string => {
  const date = parseSNCFDateTime(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

/**
 * Format duration in minutes to a readable format (e.g., 1h 25m)
 */
const formatDuration = (durationInSeconds: number): string => {
  const minutes = Math.floor(durationInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${minutes}m`;
};

/**
 * Get a color for a transport mode
 * Prioritizes color from API response, then falls back to predefined colors
 */
const getModeColor = (mode?: string, displayInfo?: DisplayInformation): string => {
  // First priority: use color from API if available
  if (displayInfo?.color && displayInfo.color.trim() !== '') {
    // Ensure color has # prefix if it's a hex code without it
    return displayInfo.color.startsWith('#') ? displayInfo.color : `#${displayInfo.color}`;
  }

  // Second priority: use our predefined mappings
  if (mode === 'walking') return '#8c9eff'; // Light blue
  if (displayInfo?.commercial_mode === 'NOMAD') return '#1976d2'; // Blue
  if (displayInfo?.commercial_mode === 'TGV') return '#d32f2f'; // Red
  if (displayInfo?.commercial_mode === 'TER') return '#388e3c'; // Green

  // Fallback
  return '#757575'; // Default gray
};


/**
 * JourneySectionLabel Component
 * Displays the appropriate label for a journey section based on its display information
 */
const JourneySectionLabel: React.FC<{ section: Section }> = ({ section }) => {
  const displayInfo = section.display_informations;
  if (!displayInfo) return null;

  const modeColor = getModeColor(section.mode, section.display_informations);

  // For train we want commercial mode
  let label = displayInfo.commercial_mode || section.mode || section.type;

  // For RER we want the label
  if (displayInfo.physical_mode?.startsWith('RER') && displayInfo.label) {
    label = displayInfo.label;
  }

  return <Box sx={{ display: 'flex', alignItems: 'center', whiteSpace: "nowrap" }}>
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: modeColor,
      color: 'white',
      borderRadius: '5px',
      height: 24,
      fontSize: '0.75rem',
      fontWeight: 'bold',
      pr: 1,
      pl: 1,
      mr: 1,
    }}
  >
    {label}
  </Box>
  <Typography variant="body2" color="text.secondary">{section.display_informations?.headsign}</Typography>
  </Box>
}

/**
 * TripSummary Component
 * Displays key information about the first and last non-walking sections of a journey
 */
const JourneySectionSummary: React.FC<{ sections: Section[], transfers: number, durationInSeconds: number }> = ({ sections, transfers, durationInSeconds }) => {
  // Find first and last non-walking sections
  const nonWalkingSections = sections.filter(section => !SECTION_FILTERS.includes((section.type)));
  if (!nonWalkingSections.length) return null;

  const firstSection = nonWalkingSections[0];
  const lastSection = nonWalkingSections[nonWalkingSections.length - 1];

  // Get the destination from the last section
  let destination = lastSection.display_informations?.direction || lastSection.to.name || lastSection.to.id;
  // Remove text within parentheses from destination
  destination = destination?.replace(/\s*\([^)]*\)/g, '');
  const startTime = formatTime(firstSection.departure_date_time);
  const endTime = formatTime(lastSection.arrival_date_time);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' } }}>
      {/* Times on the left, stacked on small screens */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        mr: 2
      }}>
        <Typography component="span" variant="body2" fontWeight="bold" fontSize={18}>
          {startTime}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          fontWeight="bold"
          fontSize={18}
          sx={{
            display: { xs: 'none', sm: 'inline' },
          }}
          ml={1}
        >
          -
        </Typography>
        <Typography
          component="span"
          variant="body2"
          fontWeight="bold"
          fontSize={18}
          sx={{
            ml: { xs: 0, sm: 1 }
          }}
        >
          {endTime}
        </Typography>
      </Box>

      {/* Stack destination and journey details on small screens */}
      <Grid container spacing={2}
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow: 1,
        }}>
        <Grid size={{ sm: 12, md: 6 }}>
          {destination && (
            <Typography variant="body2" noWrap fontSize={16}>
              {destination}
            </Typography>
          )}
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <JourneySectionLabel section={firstSection} />
            <JourneyTransfersInfo transfers={transfers} />
            <DurationInfo durationInSeconds={durationInSeconds} />
          </Box>
        </Grid> */}
        <Grid size={{ sm: 6, md: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <JourneySectionLabel section={firstSection} />
          </Box>
        </Grid>
        <Grid size={{ sm: 6, md: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <JourneyTransfersInfo transfers={transfers} />
            <DurationInfo durationInSeconds={durationInSeconds} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

/**
 * DurationInfo Component
 * Displays the duration of a journey
 */
const DurationInfo: React.FC<{ durationInSeconds: number }> = ({ durationInSeconds }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', whiteSpace: "nowrap" }}>
      <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
      <Typography variant="body2">{formatDuration(durationInSeconds)}</Typography>
    </Box>
  );
};

/**
 * TransfersInfo Component
 * Displays information about transfers in a journey
 */
const JourneyTransfersInfo: React.FC<{ transfers: number }> = ({ transfers }) => {
  if (transfers === 0) return null;
  if (transfers > 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', whiteSpace: "nowrap" }}>
        <TransferWithinAStationIcon fontSize="small" sx={{ mr: 0.5 }} />
        <Typography variant="body2">{transfers}</Typography>
      </Box>
    );
  }
}

/**
 * Journey Section Component
 * Displays a single section of a journey
 */
const JourneySectionItem: React.FC<{ section: Section }> = ({ section }) => {
  const [showStops, setShowStops] = useState(true);
  const modeColor = getModeColor(section.mode, section.display_informations);

  // More robust handling of location names with proper null checks
  const fromName = section.from?.stop_point?.name || section.from?.name || 'Unknown location';
  const toName = section.to?.stop_point?.name || section.to?.name || 'Unknown location';

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', my: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {formatTime(section.departure_date_time)} - {fromName}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            my: 0.5,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 30,
              bgcolor: modeColor,
              mx: 2,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
                size="small"
                label={section.display_informations?.commercial_mode || section.mode || section.type}
                sx={{
                  bgcolor: modeColor,
                  color: 'white',
                  fontWeight: 'bold',
                  mr: 1,
                }}
              />
              {section.display_informations?.label && (
                <Chip size="small" label={section.display_informations.label} variant="outlined" sx={{ mr: 1 }} />
              )}
              <Typography variant="caption" color="text.secondary">
                {formatDuration(section.duration || 0)}
              </Typography>
              {section.stop_date_times && section.stop_date_times.length > 0 && (
                <>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <ExpandButton
                      expanded={showStops}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowStops(!showStops);
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>

            {section.stop_date_times && section.stop_date_times.length > 0 && (
              <Collapse in={showStops}>
                <Box sx={{ mt: 1, ml: 2 }}>
                  {section.stop_date_times.map((stop, index: number) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: modeColor,
                          opacity: 0.5,
                          mr: 1,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(stop.departure_date_time)} - {stop.stop_point.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            )}
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {formatTime(section.arrival_date_time)} - {toName}
        </Typography>
      </Box>
    </Box>
  );
};

/**
 * Button to expand/collapse journey details
 */
const ExpandButton: React.FC<{
  expanded: boolean;
  onClick: (e: React.MouseEvent) => void;
}> = ({ expanded, onClick }) => (
  <IconButton
    onClick={onClick}
    size="small"
    sx={{
      ml: 1,
      color: 'text.secondary',
      '&:hover': { color: 'primary.main' },
    }}
  >
    {expanded ? (
      <ExpandLessIcon fontSize="small" />
    ) : (
      <ExpandMoreIcon fontSize="small" />
    )}
  </IconButton>
);

const SECTION_FILTERS = ['crow_fly', 'transfer', 'waiting', 'boarding'];

/**
 * Journey Card Component
 * Displays a single journey option
 */
const JourneyCard: React.FC<{ journey: Journey; isFastest?: boolean }> = ({
  journey,
  isFastest = false,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        mb: 2,
        border: isFastest ? '2px solid #4caf50' : 'none',
        position: 'relative',
      }}
    >
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {journey.sections && journey.sections.length > 0 && (
              <JourneySectionSummary sections={journey.sections}
                transfers={journey.nb_transfers}
                durationInSeconds={journey.duration}
              />
            )}
            <ExpandButton expanded={expanded} onClick={toggleExpanded} />
          </Box>

          {/* Journey Sections - Collapsible */}
          {expanded && (
            <Box>
              <Divider />
              {journey.sections
                .filter(section => !SECTION_FILTERS.includes(section.type || ''))
                .map((section, index, filteredSections) => (
                  <React.Fragment key={index}>
                    <JourneySectionItem section={section} />
                    {index < filteredSections.length - 1 && <Divider sx={{ my: 1 }} />}
                  </React.Fragment>
                ))}
              <Divider />
              <DisplayJSON data={journey} />
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

/**
 * Displays the count of journeys found
 */
const JourneyCount: React.FC<{ journeys: Journey[] }> = ({ journeys }) => {
  if (journeys.length === 0) {
    return (
      <Alert severity="info">
        No journeys found. Try different stations or a different time.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary">
        Found {journeys.length}{' '}
        {journeys.length === 1 ? 'journey' : 'journeys'}{' '}
        (sorted by earliest arrival)
      </Typography>
    </Box>
  );
};

/**
 * Displays when the journey results were last updated
 */
const LastUpdated: React.FC<{ timestamp: string }> = ({ timestamp }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
    <Typography variant="body2" color="text.secondary">
      Last updated: {formatTimeAgo(new Date(timestamp))}
    </Typography>
  </Box>
);

/**
 * Journey Results Component
 * Displays the results of a journey search
 */
export default function JourneyResults() {
  const [journeyResults] = useAtom(journeyResultsAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [error] = useAtom(errorAtom);
  const [lastSearch] = useAtom(lastSearchAtom);

  // If there's no search yet, show nothing
  if (!lastSearch && !isLoading && !journeyResults && !error) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>

      {/* Search Info */}
      {!isLoading && lastSearch && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {!error && journeyResults?.journeys && (
              <JourneyCount journeys={journeyResults.journeys} />
            )}

            {lastSearch.timestamp && (
              <LastUpdated timestamp={lastSearch.timestamp} />
            )}

          </Box>
        </>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
            Searching for journeys...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Results */}
      {!isLoading && !error && journeyResults?.journeys && journeyResults.journeys.length >= 0 &&
        <Box sx={{ mt: 2 }}>

          <Stack spacing={2}>
            {/* Sort journeys by earliest arrival time and highlight the one that arrives first */}
            {(() => {
              // Sort journeys by arrival time
              const sortedJourneys = [...journeyResults.journeys].sort(
                (a, b) => parseSNCFDateTime(a.arrival_date_time).getTime() - parseSNCFDateTime(b.arrival_date_time).getTime(),
              );

              // The fastest journey is the one that arrives first (first in the sorted array)
              const fastestJourney = sortedJourneys.length > 0 ? sortedJourneys[0] : null;

              return sortedJourneys.map((journey, index) => (
                <JourneyCard
                  key={index}
                  journey={journey}
                  isFastest={Boolean(
                    fastestJourney &&
                    journey.arrival_date_time === fastestJourney.arrival_date_time,
                  )}
                />
              ));
            })()}
          </Stack>
        </Box>
      }

    </Paper>
  );
}
