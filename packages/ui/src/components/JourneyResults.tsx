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
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { useAtom } from 'jotai';

import {
  Journey,
  JourneySection,
  errorAtom,
  isLoadingAtom,
  journeyResultsAtom,
  lastSearchAtom,
} from '../config/state';

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
const formatTime = (date: Date): string => {
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
const getModeColor = (mode?: string, commercialMode?: string, apiColor?: string): string => {
  // First priority: use color from API if available
  if (apiColor && apiColor.trim() !== '') {
    // Ensure color has # prefix if it's a hex code without it
    return apiColor.startsWith('#') ? apiColor : `#${apiColor}`;
  }

  // Second priority: use our predefined mappings
  if (mode === 'walking') return '#8c9eff'; // Light blue
  if (commercialMode === 'NOMAD') return '#1976d2'; // Blue
  if (commercialMode === 'TGV') return '#d32f2f'; // Red
  if (commercialMode === 'TER') return '#388e3c'; // Green

  // Fallback
  return '#757575'; // Default gray
};

/**
 * JourneyTimeInfo Component
 * Displays departure and arrival times with optional "Earliest" chip
 */
const JourneyTimeInfo: React.FC<{
  departureTime: Date;
  arrivalTime: Date;
  isFastest?: boolean;
}> = ({ departureTime, arrivalTime, isFastest = false }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6">
        {formatTime(departureTime)} - {formatTime(arrivalTime)}
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
const FirstSectionInfo: React.FC<{ section: JourneySection }> = ({ section }) => {
  const modeColor = getModeColor(section.mode, section.commercialMode, section.color);

  // Helper component for separator dot
  const Separator = () => <span>&#160;&#183;&#160;</span>;

  // Render the appropriate content based on transport type
  const renderContent = () => {
    if (section.physicalMode?.startsWith('RER')) {
      // For TRANSILIEN, display physicalMode, label and headsign
      return (
        <>
          {section.label && (
            <>
              <Separator />
              {section.label}
            </>
          )}
          {section.headsign && (
            <>
              <Separator />
              {section.headsign}
            </>
          )}
        </>
      );
    } else if (section.physicalMode?.startsWith('TER')) {
      // For TER, display commercialMode and headsign
      return (
        <>
          {section.commercialMode}
          {section.headsign && (
            <>
              <Separator />
              {section.headsign}
            </>
          )}
        </>
      );
    } else {
      // For all others, display commercialMode and headsign
      const mode = section.commercialMode || section.mode || section.type;
      return (
        <>
          {mode}
          {section.headsign && (
            <>
              <Separator />
              {section.headsign}
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
const JourneySectionItem: React.FC<{ section: JourneySection }> = ({ section }) => {
  const modeColor = getModeColor(section.mode, section.commercialMode, section.color);

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
          {formatTime(section.departureTime)} - {section.from}
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
            label={section.commercialMode || section.mode || section.type}
            sx={{
              bgcolor: modeColor,
              color: 'white',
              fontWeight: 'bold',
              mr: 1,
            }}
          />
          {section.label && (
            <Chip size="small" label={section.label} variant="outlined" sx={{ mr: 1 }} />
          )}
          <Typography variant="caption" color="text.secondary">
            {formatDuration(section.duration)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {formatTime(section.arrivalTime)} - {section.to}
        </Typography>
      </Box>
    </Box>
  );
};

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
                    departureTime={journey.departureTime}
                    arrivalTime={journey.arrivalTime}
                    isFastest={isFastest}
                  />
                  <Box
                    onClick={toggleExpanded}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ml: 1,
                      cursor: 'pointer',
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {expanded ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMoreIcon fontSize="small" />
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}
                >
                  {journey.sections && journey.sections.length > 0 && (
                    <FirstSectionInfo section={journey.sections[0]} />
                  )}
                  <TransfersInfo transfers={journey.transfers} />
                  <DurationInfo durationInSeconds={journey.duration} />
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
              </Grid>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

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
      {/* Header */}
      <Typography variant="h5" component="h2" gutterBottom>
        Journey Results
      </Typography>

      {/* Search Info */}
      {lastSearch && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1" fontWeight="bold">
              {lastSearch.origin.name}
            </Typography>
            <ArrowForwardIcon sx={{ mx: 1 }} />
            <Typography variant="body1" fontWeight="bold">
              {lastSearch.destination.name}
            </Typography>
          </Box>
          {lastSearch.timestamp && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Last updated: {formatTimeAgo(new Date(lastSearch.timestamp))}
              </Typography>
            </Box>
          )}
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
      {!isLoading && !error && journeyResults && (
        <>
          {journeyResults.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              No journeys found. Try different stations or a different time.
            </Alert>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Found {journeyResults.length} {journeyResults.length === 1 ? 'journey' : 'journeys'}{' '}
                (sorted by earliest arrival)
              </Typography>
              <Stack spacing={2}>
                {/* Sort journeys by earliest arrival time and highlight the one that arrives first */}
                {(() => {
                  // Sort journeys by arrival time
                  const sortedJourneys = [...journeyResults].sort(
                    (a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime(),
                  );

                  // The fastest journey is the one that arrives first (first in the sorted array)
                  const fastestJourney = sortedJourneys.length > 0 ? sortedJourneys[0] : null;

                  return sortedJourneys.map((journey, index) => (
                    <JourneyCard
                      key={index}
                      journey={journey}
                      isFastest={Boolean(
                        fastestJourney &&
                          journey.arrivalTime.getTime() === fastestJourney.arrivalTime.getTime(),
                      )}
                    />
                  ));
                })()}
              </Stack>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
}
