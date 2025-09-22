import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ff5722' }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 1
      }
    }
  }
});

export default theme;
