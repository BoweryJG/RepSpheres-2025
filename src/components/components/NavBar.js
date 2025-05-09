import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights';
import AppsIcon from '@mui/icons-material/Apps';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const navLinks = [
  { label: 'Market Insights', href: '/blog.html', emphasize: false, icon: <InsightsIcon sx={{ mr: 1, fontSize: 22 }} />, fire: true },
  { label: 'Sphere OS', href: '/workspace.html', emphasize: false, icon: <AppsIcon sx={{ mr: 1, fontSize: 22 }} /> },
  { label: 'Podcast', href: '/podcast.html', emphasize: true, icon: <PodcastsIcon sx={{ mr: 1, fontSize: 22 }} /> },
];

// Animated fire underline keyframes
const fireUnderlineAnim = {
  '@keyframes fireUnderline': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  }
};


export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Orb SVG for brand
  const orb = (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ marginRight: 10, filter: 'drop-shadow(0 0 6px #7B42F6AA)' }}>
      <defs>
        <radialGradient id="orbGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#00ffc6" />
          <stop offset="100%" stopColor="#7B42F6" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#orbGrad)" opacity="0.85" />
      <circle cx="16" cy="16" r="8" fill="#fff" opacity="0.08" />
    </svg>
  );

  const navButtonStyle = {
    fontWeight: 400,
    letterSpacing: '0.04em',
    fontSize: '1.04rem',
    px: 1.2,
    py: 0,
    borderRadius: 0,
    background: 'none',
    boxShadow: 'none',
    transition: 'color 0.2s, border-bottom 0.2s',
    borderBottom: '2px solid transparent',
    '&:hover': {
      color: '#3a86ff',
      background: 'none',
      borderBottom: '2px solid #3a86ff',
      boxShadow: 'none',
    },
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{
      background: 'linear-gradient(90deg, rgba(24,24,43,0.72) 60%, rgba(123,66,246,0.44) 100%)',
      boxShadow: '0 8px 32px 0 rgba(123,66,246,0.17)',
      backdropFilter: 'blur(22px)',
      borderBottom: '1.5px solid rgba(123,66,246,0.10)',
      zIndex: 1200,
      borderRadius: { xs: '0 0 18px 18px', md: '0 0 32px 32px' },
      mx: { xs: 1, md: 3 },
      mt: { xs: 1, md: 2 },
      width: { xs: 'calc(100% - 8px)', md: 'calc(100% - 48px)' },
      fontFamily: 'Montserrat, DM Sans, Arial, sans-serif',
      fontWeight: 700,
      color: '#fff',
      marginLeft: 6,
      letterSpacing: '0.01em',
      display: 'flex',
      alignItems: 'center',
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 900, fontSize: '1.35rem', letterSpacing: '0.09em', color: '#fff', userSelect: 'none' }}>
          {orb}
          <span style={{ fontWeight: 800, letterSpacing: '0.09em', marginRight: 2 }}>Rep</span>
          <span style={{
            background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            letterSpacing: '0.09em',
            transition: 'background 0.4s',
          }}>
            Spheres
          </span>
        </Box>
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: {
                  background: 'rgba(20,14,38,0.96)',
                  borderLeft: '2.5px solid',
                  borderImage: 'linear-gradient(180deg, #7B42F6 0%, #00ffc6 100%) 1',
                  minWidth: 260,
                  borderTopLeftRadius: 26,
                  borderBottomLeftRadius: 26,
                  boxShadow: '0 8px 48px 4px #7B42F633',
                  p: 1,
                }
              }}
            >
              <List sx={{ mt: 4 }}>
                {navLinks.map((link) => (
                  <ListItem key={link.label} disablePadding>
                    <ListItemButton
                      component="a"
                      href={link.href}
                      sx={{
                        ...navButtonStyle,
                        opacity: link.emphasize ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.09rem',
                        mb: 1,
                        color: '#fff',
                      }}
                    >
                      {link.icon}{link.label}
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItem disablePadding>
                  <ListItemButton component="a" href="/login.html" sx={{
                    ...navButtonStyle,
                    border: '1.5px solid #fff',
                    color: '#fff',
                    mt: 2,
                    mb: 1,
                  }}>
                    <ListItemText primary="Log In" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="/signup.html" sx={{
                    ...navButtonStyle,
                    mt: 2,
                    background: 'linear-gradient(135deg, #7B42F6 0%, #00ffc6 100%)',
                    color: '#fff',
                    boxShadow: '0 4px 20px rgba(123,66,246,0.20)',
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    borderRadius: '32px',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5B3CFF 0%, #00ffc6 100%)',
                      color: '#fff',
                      transform: 'scale(1.04)'
                    }
                  }}>
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            justifyContent: 'center',
            width: '100%',
          }}>
            {navLinks.map((link) => (
              <Box key={link.label} sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Button
                  href={link.href}
                  sx={{
                    ...navButtonStyle,
                    opacity: link.emphasize ? 0.7 : 1,
                    color: '#fff',
                    fontWeight: 400,
                    fontSize: '1.04rem',
                    letterSpacing: '0.04em',
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0,
                    px: 1.8,
                    mx: 0.5,
                    background: 'none',
                    boxShadow: 'none',
                    position: 'relative',
                    zIndex: 2,
                    ...(link.fire ? fireUnderlineAnim : {}),
                  }}
                  disableRipple
                >
                  {link.icon}{link.label}
                  <Box
                    className="nav-underline"
                    sx={{
                      position: 'absolute',
                      left: '10%',
                      bottom: 6,
                      height: 3,
                      width: 0,
                      borderRadius: 2,
                      opacity: 0,
                      background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 100%)',
                      transition: 'width 0.32s cubic-bezier(.8,.2,.2,1), opacity 0.22s',
                      zIndex: 1,
                    }}
                  />
                </Button>
              </Box>
            ))}
            <Button
              href="/login.html"
              variant="outlined"
              startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
              sx={{
                ...navButtonStyle,
                border: '1.5px solid #fff',
                color: '#fff',
                ml: 2,
                fontWeight: 500,
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(6px)',
                borderRadius: '18px',
                px: 2.2,
                fontSize: '1.04rem',
                letterSpacing: '0.04em',
                boxShadow: '0 1px 6px rgba(58,134,255,0.10)',
                transition: 'all 0.18s',
                '&:hover': {
                  background: 'rgba(58,134,255,0.18)',
                  color: '#3a86ff',
                  borderColor: '#3a86ff',
                }
              }}
            >
              Log In
            </Button>
            <Button
              href="/signup.html"
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 20 }} />}
              sx={{
                ...navButtonStyle,
                background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
                color: '#fff',
                fontWeight: 700,
                ml: 2,
                px: 2.8,
                borderRadius: '24px',
                fontSize: '1.09rem',
                letterSpacing: '0.04em',
                boxShadow: '0 2px 18px 0 rgba(123,66,246,0.13)',
                transition: 'all 0.22s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #5B3CFF 0%, #00ffc6 100%)',
                }
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
