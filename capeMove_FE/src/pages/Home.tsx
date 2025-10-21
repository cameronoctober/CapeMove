import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocationOn, DirectionsBus, Schedule, Report } from '@mui/icons-material';
import MapView from '../components/Map/MapView';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
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
              <Grid item xs={12} sm={6}>
                <Card elevation={3} sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 8 } }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <DirectionsBus color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">Journey Planner</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Plan multimodal trips across Cape Town
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/journey')}>Go</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={3} sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 8 } }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Schedule color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">Real-time</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Live vehicle tracking and arrivals
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/realtime')}>Go</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={3} sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 8 } }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <LocationOn color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">Fare Calculator</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Calculate trip costs accurately
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/fares')}>Go</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={3} sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 8 } }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Report color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">Report Issues</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Community-driven incident reporting
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/report')}>Go</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;