import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const BottomTabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAppSelector((s) => s.auth);

  // Map tab index to route path
  const tabRoutes = ['/', '/journey', '/realtime', '/fares', '/report', '/profile'];
  const protectedTabs = [1, 2, 3, 4, 5]; // All except Home are protected
  const [value, setValue] = React.useState<number>(tabRoutes.indexOf(location.pathname));

  React.useEffect(() => {
    setValue(tabRoutes.indexOf(location.pathname));
  }, [location.pathname]);

  const handleChange = (_: any, newValue: number) => {
    // If tab is protected and user is not authenticated, send to login
    if (protectedTabs.includes(newValue) && (!auth.user || !auth.accessToken)) {
      navigate('/login');
    } else {
      setValue(newValue);
      const path = tabRoutes[newValue] ?? '/';
      navigate(path);
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Journey" icon={<DirectionsTransitIcon />} />
        <BottomNavigationAction label="Realtime" icon={<MapIcon />} />
        <BottomNavigationAction label="Fares" icon={<AttachMoneyIcon />} />
        <BottomNavigationAction label="Report" icon={<ReportProblemIcon />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomTabBar;
