import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../slices/authSlice';

const NavBar: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const incidents = useAppSelector((s) => Object.values(s.realtime.incidents));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <IconButton color="inherit" edge="start" component={Link} to="/">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', ml: 1 }}>
            CapeMove
          </Typography>
        </Box>

        <IconButton color="inherit" component={Link} to="/realtime">
          <Badge badgeContent={incidents.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton color="inherit" onClick={handleAvatarClick}>
          <Avatar>{user?.name ? user.name.charAt(0).toUpperCase() : 'G'}</Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>Profile</MenuItem>
          <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
