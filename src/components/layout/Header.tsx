import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  styled
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GridViewIcon from '@mui/icons-material/GridView';
import InsightsIcon from '@mui/icons-material/Insights';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { Link as RouterLink } from 'react-router-dom';

const Logo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.5rem',
  fontWeight: 700,
  color: theme.palette.common.white,
  textDecoration: 'none',
  marginRight: theme.spacing(3),
  '& span.highlight': {
    color: theme.palette.primary.main,
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  borderRadius: '9999px',
  padding: '8px 24px',
  fontWeight: 600,
}));

// Updated NavItem to use React Router directly
const NavItem = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  color: theme.palette.common.white,
  fontWeight: 500,
  textDecoration: 'none',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
}));

interface HeaderProps {
  open: boolean;
  drawerWidth: number;
  toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Create gradient button with direct styling
  const GradientButton = styled(RouterLink)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.common.white,
    textDecoration: 'none',
    fontWeight: 600,
    padding: '10px 24px',
    borderRadius: '9999px',
    '&:hover': {
      background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    },
  }));

  const OutlinedButton = styled(RouterLink)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 600,
    padding: '8px 24px',
    borderRadius: '9999px',
    '&:hover': {
      backgroundColor: 'rgba(0, 226, 195, 0.08)',
    },
  }));

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo>
            Rep<span className="highlight">Spheres</span>
          </Logo>
        </RouterLink>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavItem to="/market-insights">
              <InsightsIcon sx={{ mr: 1 }} />
              Market Insights
            </NavItem>
            <NavItem to="/crm">
              <GridViewIcon sx={{ mr: 1 }} />
              CRM
            </NavItem>
            <NavItem to="/workspace">
              <WorkspacesIcon sx={{ mr: 1 }} />
              Workspace
            </NavItem>
          </Box>
        )}
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OutlinedButton to="/login">
            <PersonOutlineIcon sx={{ mr: 1 }} />
            Log In
          </OutlinedButton>
          
          <GradientButton to="/signup" sx={{ ml: 2 }}>
            Sign Up
            <ArrowForwardIcon sx={{ ml: 1 }} />
          </GradientButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
