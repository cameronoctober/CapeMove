import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const ReportIncident: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Report Incident
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Help improve transit safety by reporting incidents and hazards
        </Typography>
        
        <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Community Reporting
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Incident reporting functionality will be implemented here, including:
          </Typography>
          <Box component="ul" sx={{ mt: 2 }}>
            <li>Location-based incident reporting</li>
            <li>Photo and description uploads</li>
            <li>Incident categorization (safety, delays, infrastructure)</li>
            <li>Community moderation system</li>
            <li>Real-time incident notifications</li>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ReportIncident;