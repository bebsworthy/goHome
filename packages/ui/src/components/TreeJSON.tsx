import React, { useState } from 'react';
import {
  Box,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

export type JSONValue = string | number | boolean | null | JSONObject | JSONArray | unknown;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

interface NodeProps {
  name?: string;
  value: JSONValue;
  depth?: number;
}

const TreeNode: React.FC<NodeProps> = ({ name, value, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const indent = depth * 2; // 2 spaces per level
  const spaces = ' '.repeat(indent * 2);

  const renderPrimitive = (val: JSONValue) => {
    if (val === null) return <span style={{ color: '#666' }}>null</span>;
    if (typeof val === 'boolean') return <span style={{ color: '#0d47a1' }}>{val.toString()}</span>;
    if (typeof val === 'number') return <span style={{ color: '#1b5e20' }}>{val}</span>;
    if (typeof val === 'string') return <span style={{ color: '#b71c1c' }}>"{val}"</span>;
    return <span>{String(val)}</span>;
  };

  const renderValue = () => {
    if (value === null || typeof value !== 'object') {
      return renderPrimitive(value);
    }
    
    const isArray = Array.isArray(value);
    const isEmpty = isArray ? value.length === 0 : Object.keys(value || {}).length === 0;
    
    if (isEmpty) {
      return <span>{isArray ? '[]' : '{}'}</span>;
    }

    const items = isArray 
      ? (value as JSONArray).map((item, index) => ({
          key: String(index),
          value: item
        }))
      : Object.entries(value as JSONObject).map(([key, val]) => ({
          key,
          value: val
        }));

    if (!isExpanded) {
      return (
        <span>
          {isArray ? '[' : '{'}{' '}...{' '}{isArray ? ']' : '}'}
        </span>
      );
    }

    return (
      <div style={{ display: 'inline' }}>
        {isArray ? '[' : '{'}{'\n'}
        {items.map(({ key, value: val }, index) => (
          <div key={key} style={{ marginLeft: (indent + 1) * 8 }}>
            {!isArray && (
              <>
                <span style={{ color: '#666' }}>{key}</span>
                <span>: </span>
              </>
            )}
            <TreeNode
              name={isArray ? undefined : key}
              value={val}
              depth={depth + 1}
            />
            {index < items.length - 1 ? ',' : ''}{'\n'}
          </div>
        ))}
        <span style={{ marginLeft: indent * 8 }}>{isArray ? ']' : '}'}</span>
      </div>
    );
  };

  const isExpandable = typeof value === 'object' && value !== null && 
    (Array.isArray(value) ? value.length > 0 : Object.keys(value || {}).length > 0);

  return (
    <span style={{ display: 'inline' }}>
      {isExpandable && (
        <IconButton
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ 
            p: 0,
            mr: 0.5,
            opacity: 0.5,
            '&:hover': { opacity: 1 },
            height: 16,
            width: 16,
            verticalAlign: 'middle',
          }}
        >
          {isExpanded ? <ExpandLessIcon sx={{ fontSize: 14 }} /> : <ExpandMoreIcon sx={{ fontSize: 14 }} />}
        </IconButton>
      )}
      {renderValue()}
    </span>
  );
};

interface TreeJSONProps {
  data: JSONValue;
}

const TreeJSON: React.FC<TreeJSONProps> = ({ data }) => {
  return (
    <Box
      sx={{
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: '0.675rem',
        bgcolor: '#1e1e1e',
        color: '#d4d4d4',
        p: 1.5,
        borderRadius: 1,
        overflowX: 'auto',
        whiteSpace: 'pre',
      }}
    >
      <TreeNode value={data} />
    </Box>
  );
};

export default TreeJSON; 