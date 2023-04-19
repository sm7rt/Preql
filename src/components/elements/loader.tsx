import { Box, CircularProgress } from '@mui/material';
import React from 'react';

function Loader() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '75%',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
