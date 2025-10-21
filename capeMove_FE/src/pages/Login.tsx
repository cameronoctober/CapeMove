import React from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';
import LoginForm from '../components/Auth/LoginForm';

const Login: React.FC = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" paragraph>
            Access your CapeMove account
          </Typography>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;