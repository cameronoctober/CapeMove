import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const RealtimeArrivals: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Real-time Arrivals
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Live vehicle tracking and arrival predictions
        </Typography>
        
        <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Live Transit Information
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time arrivals functionality will be implemented here, including:
          </Typography>
          <Box component="ul" sx={{ mt: 2 }}>
            <li>Live vehicle positions on map</li>
            <li>Arrival predictions for nearby stops</li>
            <li>Service disruptions and delays</li>
            <li>Route status updates</li>
            <li>Integration with Cape Town Open Data Portal</li>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RealtimeArrivals;