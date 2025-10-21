import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const JourneyPlanner: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Journey Planner
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Plan your multimodal trips across Cape Town's transit network
        </Typography>
        
        <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Plan Your Journey
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Journey planning functionality will be implemented here, including:
          </Typography>
          <Box component="ul" sx={{ mt: 2 }}>
            <li>Origin and destination selection</li>
            <li>Multi-modal transport options (MyCiTi, Metrorail, minibus taxis)</li>
            <li>Real-time route optimization</li>
            <li>Transfer points and walking directions</li>
            <li>Journey time and cost estimates</li>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default JourneyPlanner;