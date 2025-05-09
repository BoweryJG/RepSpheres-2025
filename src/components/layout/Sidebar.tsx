import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  IconButton,
  styled,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ChatIcon from '@mui/icons-material/Chat';
import TranslateIcon from '@mui/icons-material/Translate';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface SidebarProps {
  open: boolean;
  drawerWidth: number;
  toggleDrawer: () => void;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'CRM', icon: <PeopleIcon />, path: '/crm' },
  { text: 'Market Insights', icon: <InsightsIcon />, path: '/market-insights' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Workspace', icon: <WorkspacesIcon />, path: '/workspace' },
  { text: 'Messaging', icon: <ChatIcon />, path: '/messaging' },
  { text: 'Linguistics', icon: <TranslateIcon />, path: '/linguistics' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, drawerWidth, toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box>
      <DrawerHeader>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={item.path}
              selected={isActive(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 226, 195, 0.1)',
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 226, 195, 0.15)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{
                color: isActive(item.path) ? theme.palette.primary.main : 'inherit'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          background: theme.palette.background.paper,
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        },
      }}
    >
      <Toolbar />
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
