import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import { store } from './store';
import theme from './styles/theme';
import './index.css';

import { setupAuthInterceptors } from './api/authInterceptor';
import { registerServiceWorker } from './pwa/registerServiceWorker';


// Set up axios interceptors after store is created
setupAuthInterceptors();

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

registerServiceWorker();
