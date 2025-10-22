import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Paper, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocationOn, DirectionsBus, Schedule, Report } from '@mui/icons-material';
import { planJourney } from '../api/services/journeyService';
import { fetchInitialVehicles } from '../api/services/realtimeService';
import { getFareEstimate } from '../api/services/faresService';
import { reportIncident } from '../api/services/incidentsService';
import MapView from '../components/Map/MapView';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  // Dummy payloads for test calls
  const dummyCoords = { lat: -33.9249, lon: 18.4241 };

  const handleTest = async (feature: 'journey' | 'realtime' | 'fares' | 'report') => {
    try {
      if (feature === 'journey') {
        await planJourney({ origin: dummyCoords, destination: dummyCoords });
        setSnackbar({ open: true, message: 'Journey planner API call succeeded!', severity: 'success' });
      } else if (feature === 'realtime') {
        await fetchInitialVehicles({ lat1: -33.9, lon1: 18.4, lat2: -33.8, lon2: 18.5 });
        setSnackbar({ open: true, message: 'Real-time API call succeeded!', severity: 'success' });
      } else if (feature === 'fares') {
        await getFareEstimate({ origin: dummyCoords, destination: dummyCoords });
        setSnackbar({ open: true, message: 'Fare calculator API call succeeded!', severity: 'success' });
      } else if (feature === 'report') {
        await reportIncident({ description: 'Test incident', location: dummyCoords });
        setSnackbar({ open: true, message: 'Report incident API call succeeded!', severity: 'success' });
      }
    } catch (e: any) {
      setSnackbar({ open: true, message: `API call failed: ${e?.response?.data?.message || e.message || e.toString()}`, severity: 'error' });
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ py: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Welcome to CapeMove
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
            Your comprehensive Cape Town transit companion
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, height: '300px' }}>
                <MapView />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                  <Card
                    elevation={3}
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: 8, backgroundColor: 'action.hover' }
                    }}
                    onClick={() => handleTest('journey')}
                  >
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                      <DirectionsBus color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">Journey Planner</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Plan multimodal trips across Cape Town
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                  <Card
                    elevation={3}
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: 8, backgroundColor: 'action.hover' }
                    }}
                    onClick={() => handleTest('realtime')}
                  >
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                      <Schedule color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">Real-time</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Live vehicle tracking and arrivals
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                  <Card
                    elevation={3}
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: 8, backgroundColor: 'action.hover' }
                    }}
                    onClick={() => handleTest('fares')}
                  >
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                      <LocationOn color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">Fare Calculator</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Calculate trip costs accurately
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                  <Card
                    elevation={3}
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: 8, backgroundColor: 'action.hover' }
                    }}
                    onClick={() => handleTest('report')}
                  >
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                      <Report color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">Report Issues</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Community-driven incident reporting
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;