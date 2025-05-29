import React from 'react';

import {
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  SwapVert as SwapVertIcon,
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
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
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
} from '../config/state';
import { parseSNCFDateTime } from '@/utils/dateTime';
import { useJourneyQuery } from '../hooks/useJourneyQuery';
import DisplayJSON from './DisplayJSON';

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
 * JourneyTimeInfo Component
 * Displays departure and arrival times with optional "Earliest" chip
 */
const JourneyTimeInfo: React.FC<{
  departureDateTime: string;
  arrivalDateTime: string;
  isFastest?: boolean;
}> = ({ departureDateTime, arrivalDateTime, isFastest = false }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6">
        {formatTime(departureDateTime)} - {formatTime(arrivalDateTime)}
      </Typography>
      {isFastest && <Chip label="Earliest" color="success" size="small" sx={{ ml: 1 }} />}
    </Box>
  );
};

/**
 * DurationInfo Component
 * Displays the duration of a journey
 */
const DurationInfo: React.FC<{ durationInSeconds: number }> = ({ durationInSeconds }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
      <Typography variant="body2">{formatDuration(durationInSeconds)}</Typography>
    </Box>
  );
};

/**
 * FirstSectionInfo Component
 * Displays key information about the first section of a journey
 */
const FirstSectionInfo: React.FC<{ section: Section }> = ({ section }) => {
  const modeColor = getModeColor(section.mode, section.display_informations);

  // Helper component for separator dot
  const Separator = () => <span>&#160;&#183;&#160;</span>;

  // Render the appropriate content based on transport type
  const renderContent = () => {
    const displayInfo = section.display_informations;
    if (!displayInfo) return null;

    if (displayInfo.physical_mode?.startsWith('RER')) {
      // For TRANSILIEN, display physicalMode, label and headsign
      return (
        <>
          {displayInfo.label && (
            <>
              <Separator />
              {displayInfo.label}
            </>
          )}
          {displayInfo.headsign && (
            <>
              <Separator />
              {displayInfo.headsign}
            </>
          )}
        </>
      );
    } else if (displayInfo.physical_mode?.startsWith('TER')) {
      // For TER, display commercialMode and headsign
      return (
        <>
          {displayInfo.commercial_mode}
          {displayInfo.headsign && (
            <>
              <Separator />
              {displayInfo.headsign}
            </>
          )}
        </>
      );
    } else {
      // For all others, display commercialMode and headsign
      const mode = displayInfo.commercial_mode || section.mode || section.type;
      return (
        <>
          {mode}
          {displayInfo.headsign && (
            <>
              <Separator />
              {displayInfo.headsign}
            </>
          )}
        </>
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: modeColor,
          mr: 1,
        }}
      />
      <Typography variant="body2" color="text.secondary">
        {renderContent()}
      </Typography>
    </Box>
  );
};

/**
 * TransfersInfo Component
 * Displays information about transfers in a journey
 */
const TransfersInfo: React.FC<{ transfers: number }> = ({ transfers }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <SwapVertIcon fontSize="small" sx={{ mr: 0.5 }} />
      <Typography variant="body2" color="text.secondary">
        {transfers === 0 ? 'Direct' : `${transfers} ${transfers === 1 ? 'change' : 'changes'}`}
      </Typography>
    </Box>
  );
};

/**
 * Journey Section Component
 * Displays a single section of a journey
 */
const JourneySectionItem: React.FC<{ section: Section }> = ({ section }) => {
  const modeColor = getModeColor(section.mode, section.display_informations);
  const fromName = section.from.stop_point?.name || section.from.name || 'Unknown location';
  const toName = section.to.stop_point?.name || section.to.name || 'Unknown location';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: modeColor,
          mr: 1,
        }}
      />
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
          <Grid container spacing={2}>
            {/* Journey Header */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <JourneyTimeInfo
                    departureDateTime={journey.departure_date_time}
                    arrivalDateTime={journey.arrival_date_time}
                    isFastest={isFastest}
                  />
                  
                </Box>

                <Box
                  sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}
                >
                  {journey.sections && journey.sections.length > 0 && (
                    <FirstSectionInfo section={journey.sections[0]} />
                  )}
                  <TransfersInfo transfers={journey.nb_transfers} />
                  <DurationInfo durationInSeconds={journey.duration} />
                  <ExpandButton expanded={expanded} onClick={toggleExpanded} />
                </Box>
              </Box>
            </Grid>

            {/* Journey Sections - Collapsible */}
            {expanded && (
              <Grid item xs={12}>
                <Divider />
                {journey.sections.map((section, index) => (
                  <React.Fragment key={index}>
                    <JourneySectionItem section={section} />
                    {index < journey.sections.length - 1 && <Divider sx={{ my: 1 }} />}
                  </React.Fragment>
                ))}
                <Divider />
                <DisplayJSON data={journey} />
              </Grid>
            )}
          </Grid>
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
