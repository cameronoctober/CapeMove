import React from 'react';
import { CircularProgress, Box } from '@mui/material';

interface Props {
  size?: number;
  overlay?: boolean;
}

const LoadingSpinner: React.FC<Props> = ({ size = 40, overlay = false }) => {
  if (overlay) {
    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.7)',
          zIndex: 1400
        }}
      >
        <CircularProgress size={size} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingSpinner;
