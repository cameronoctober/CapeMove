import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomTabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeToIndex: Record<string, number> = {
    '/': 0,
    '/realtime': 1,
    '/journey': 2,
    '/fares': 3,
    '/report': 4
  };

  const indexToRoute: Record<number, string> = Object.entries(routeToIndex).reduce((acc, [k, v]) => {
    acc[v] = k;
    return acc;
  }, {} as any);

  const [value, setValue] = React.useState<number>(routeToIndex[location.pathname] ?? 0);

  React.useEffect(() => {
    setValue(routeToIndex[location.pathname] ?? 0);
  }, [location.pathname]);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
    const path = indexToRoute[newValue] ?? '/';
    navigate(path);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Map" icon={<MapIcon />} />
        <BottomNavigationAction label="Plan" icon={<DirectionsTransitIcon />} />
        <BottomNavigationAction label="Fares" icon={<AttachMoneyIcon />} />
        <BottomNavigationAction label="Report" icon={<ReportProblemIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomTabBar;
