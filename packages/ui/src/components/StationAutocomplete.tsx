import { useState, useEffect, useMemo, useRef } from 'react';
import { Autocomplete, TextField, CircularProgress, Box, Typography } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { Station } from '../config/state';
import { indexedDBService } from '../utils/indexedDB';
import { sncfApiService } from '../utils/sncfApi';

interface StationAutocompleteProps {
  label: string;
  placeholder?: string;
  value: Station | null;
  onChange: (station: Station | null) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  testId?: string;
}

/**
 * Station Autocomplete Component
 * 
 * A reusable component for station input fields that provides autocomplete
 * suggestions based on the cached SNCF station list.
 * 
 * Features:
 * - Fast response time (<200ms)
 * - Keyboard navigation support
 * - Debounced search for performance
 * - Integration with IndexedDB for offline support
 */
export default function StationAutocomplete({
  label,
  placeholder = 'Enter a station name',
  value,
  onChange,
  disabled = false,
  required = false,
  error = false,
  helperText = '',
  testId = 'station-autocomplete',
}: StationAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Track the last query to prevent duplicate API calls
  const lastQueryRef = useRef<string>('');
  
  // Debounced function to search stations by name
  const searchStations = useMemo(
    () =>
      debounce(async (query: string) => {
        // Don't search if query is too short or same as last query
        if (!query || query.length < 2 || query === lastQueryRef.current) {
          setOptions([]);
          setLoading(false);
          setErrorMessage(null); // Clear any previous errors
          return;
        }
        
        // Update last query reference
        lastQueryRef.current = query;
        
        setLoading(true);
        setErrorMessage(null); // Clear any previous errors
        
        try {
          // First try to search stations in IndexedDB
          let results = await indexedDBService.searchStationsByName(query);
          
          // If we have results from IndexedDB, use them and don't call the API
          if (results && results.length > 0) {
            console.log(`Found ${results.length} results in IndexedDB for "${query}"`);
            setOptions(results);
            setLoading(false);
            return;
          }
          
          // Only call the API if we don't have results from IndexedDB
          console.log('No results in IndexedDB, trying API...');
          try {
            results = await sncfApiService.searchStations(query);
            
            // If we got results from the API, cache them in IndexedDB for future use
            if (results && results.length > 0) {
              console.log(`Caching ${results.length} stations from API to IndexedDB...`);
              try {
                await indexedDBService.cacheStations(results);
              } catch (cacheError) {
                console.error('Error caching stations:', cacheError);
              }
            }
            
            setOptions(results || []);
          } catch (apiError) {
            console.error('API Error searching stations:', apiError);
            
            // Check for rate limit error
            if (apiError instanceof Error && 
                (apiError.message.includes('Rate limit') || apiError.message.includes('429'))) {
              setErrorMessage('Rate limit exceeded. Please try again in a few moments.');
            } else {
              setErrorMessage(apiError instanceof Error ? 
                apiError.message : 'Error searching stations. Please try again.');
            }
            
            setOptions([]);
          }
        } catch (error) {
          console.error('Error searching stations in IndexedDB:', error);
          setOptions([]);
          setErrorMessage('Error accessing local data. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 300), // Increased debounce time to reduce API calls
    []
  );

  // Track previous input value to prevent redundant searches
  const prevInputRef = useRef<string>('');
  
  // Update options when input value changes
  useEffect(() => {
    // Don't search if the autocomplete is closed or input is too short
    if (!open || inputValue.length < 2) {
      return;
    }
    
    // Don't search if the input hasn't changed
    if (inputValue === prevInputRef.current) {
      return;
    }
    
    // Update previous input reference
    prevInputRef.current = inputValue;
    
    console.log(`[Autocomplete] Searching for "${inputValue}"`);
    searchStations(inputValue);

    // Cleanup function to cancel any pending debounced calls
    return () => {
      searchStations.clear();
    };
  }, [inputValue, open, searchStations]);

  return (
    <Autocomplete
      id={`station-autocomplete-${label.toLowerCase().replace(/\s+/g, '-')}`}
      data-testid={testId}
      open={open}
      onOpen={() => {
        setOpen(true);
        // Trigger search on open if we have an input value that's different from the previous one
        if (inputValue.length >= 2 && inputValue !== prevInputRef.current) {
          console.log(`[Autocomplete] Opening with search for "${inputValue}"`);
          prevInputRef.current = inputValue;
          searchStations(inputValue);
        }
      }}
      onClose={() => setOpen(false)}
      value={value}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={loading}
      disabled={disabled}
      filterOptions={(x) => x} // Disable built-in filtering as we're doing it server-side
      noOptionsText={
        inputValue.length < 2
          ? 'Type at least 2 characters'
          : 'No stations found'
      }
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Typography variant="body1">{option.name}</Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={required}
          error={error || !!errorMessage}
          helperText={errorMessage || helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
