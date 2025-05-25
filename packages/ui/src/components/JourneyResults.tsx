import React from 'react';
import { useAtom } from 'jotai';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Chip,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  LinearProgress,
  Alert
} from '@mui/material';
import { 
  AccessTime as AccessTimeIcon,
  SwapVert as SwapVertIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { 
  journeyResultsAtom, 
  isLoadingAtom, 
  errorAtom,
  lastSearchAtom,
  Journey,
  JourneySection
} from '../config/state';

/**
 * Format a date to display time in HH:MM format
 */
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
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
 */
const getModeColor = (mode?: string, commercialMode?: string): string => {
  if (mode === 'walking') return '#8c9eff'; // Light blue
  if (commercialMode === 'NOMAD') return '#1976d2'; // Blue
  if (commercialMode === 'TGV') return '#d32f2f'; // Red
  if (commercialMode === 'TER') return '#388e3c'; // Green
  return '#757575'; // Default gray
};

/**
 * Journey Section Component
 * Displays a single section of a journey
 */
const JourneySectionItem: React.FC<{ section: JourneySection }> = ({ section }) => {
  const modeColor = getModeColor(section.mode, section.commercialMode);
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
      <Box sx={{ 
        width: 8, 
        height: 8, 
        borderRadius: '50%', 
        bgcolor: modeColor,
        mr: 1
      }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {formatTime(section.departureTime)} - {section.from}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          my: 0.5
        }}>
          <Box sx={{ 
            width: 4, 
            height: 30, 
            bgcolor: modeColor,
            mx: 2
          }} />
          <Chip 
            size="small" 
            label={section.commercialMode || section.mode || section.type}
            sx={{ 
              bgcolor: modeColor,
              color: 'white',
              fontWeight: 'bold',
              mr: 1
            }}
          />
          {section.label && (
            <Chip 
              size="small" 
              label={section.label}
              variant="outlined"
              sx={{ mr: 1 }}
            />
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
const JourneyCard: React.FC<{ journey: Journey }> = ({ journey }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea>
        <CardContent>
          <Grid container spacing={2}>
            {/* Journey Header */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">
                  {formatTime(journey.departureTime)} - {formatTime(journey.arrivalTime)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">
                    {formatDuration(journey.duration)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SwapVertIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {journey.transfers === 0 
                    ? 'Direct' 
                    : `${journey.transfers} ${journey.transfers === 1 ? 'change' : 'changes'}`}
                </Typography>
              </Box>
              <Divider />
            </Grid>
            
            {/* Journey Sections */}
            <Grid item xs={12}>
              {journey.sections.map((section, index) => (
                <React.Fragment key={index}>
                  <JourneySectionItem section={section} />
                  {index < journey.sections.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </Grid>
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            {lastSearch.origin.name}
          </Typography>
          <ArrowForwardIcon sx={{ mx: 1 }} />
          <Typography variant="body1" fontWeight="bold">
            {lastSearch.destination.name}
          </Typography>
        </Box>
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
                Found {journeyResults.length} {journeyResults.length === 1 ? 'journey' : 'journeys'}
              </Typography>
              <Stack spacing={2}>
                {journeyResults.map((journey, index) => (
                  <JourneyCard key={index} journey={journey} />
                ))}
              </Stack>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
}
