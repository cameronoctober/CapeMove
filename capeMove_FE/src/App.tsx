import React from 'react';
import { Box } from '@mui/material';
import NavBar from './components/Layout/NavBar';
import BottomTabBar from './components/Layout/BottomTabBar';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/common/Toast';
import ErrorBoundary from './components/common/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Box id="app" sx={{ pb: { xs: 7, sm: 0 } }}>
        <NavBar />
        <Box component="main" sx={{ mt: 8, mb: { xs: 8, sm: 0 }, minHeight: 'calc(100vh - 64px)' }}>
          <AppRoutes />
        </Box>
        <BottomTabBar />
        <Toast />
      </Box>
    </ErrorBoundary>
  );
};

export default App;
