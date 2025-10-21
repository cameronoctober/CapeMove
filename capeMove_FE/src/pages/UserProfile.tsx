import React from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import { Person, Settings, Notifications, History } from '@mui/icons-material';

const UserProfile: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Manage your account settings and preferences
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Account Information</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Update your personal information and contact details
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Settings color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Transit Preferences</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Set your preferred transport modes and accessibility needs
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Notifications color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Notification Settings</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Configure alerts for service disruptions and incidents
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <History color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Journey History</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View your past journeys and saved routes
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfile;