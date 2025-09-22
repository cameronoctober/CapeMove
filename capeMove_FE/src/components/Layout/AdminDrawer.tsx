import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AdminDrawer: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        <ListItem button component={Link} to="/admin/users" onClick={onClose}>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/admin/incidents" onClick={onClose}>
          <ListItemText primary="Incidents" />
        </ListItem>
        <ListItem button component={Link} to="/admin/routes" onClick={onClose}>
          <ListItemText primary="Routes" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/admin/logs" onClick={onClose}>
          <ListItemText primary="System Logs" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminDrawer;
