import React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import { BugReport as BugReportIcon } from '@mui/icons-material';
import TreeJSON from './TreeJSON';

/**
 * Displays JSON data in a formatted, collapsible debug view
 */
const DisplayJSON: React.FC<{ data: unknown }> = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Box>
      <Tooltip title={isOpen ? "Hide debug data" : "Show debug data"}>
        <IconButton 
          onClick={() => setIsOpen(!isOpen)} 
          size="small"
          sx={{ 
            color: isOpen ? 'primary.main' : 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          <BugReportIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Collapse in={isOpen}>
        <TreeJSON data={data} />
      </Collapse>
    </Box>
  );
};

export default DisplayJSON; 