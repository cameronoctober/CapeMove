import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.onRetry = this.onRetry.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // send to monitoring if available
    // @ts-ignore
    if ((window as any).__SENTRY__) {
      // @ts-ignore
      (window as any).__SENTRY__.captureException(error, info);
    }
    // still log
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, info);
  }

  onRetry() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            An unexpected error occurred. You can try reloading the page.
          </Typography>
          <Button variant="contained" onClick={this.onRetry}>
            Retry
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
