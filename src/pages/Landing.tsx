import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, styled } from '@mui/material';
import { motion } from 'framer-motion';

// Define theme variables to match salesiq.netlify.app
const themeVars = {
  primary: '#7b42f6',
  primaryDark: '#5b3cff',
  secondary: '#00ffc6',
  darkBg: '#0b0b20',
  cardBg: '#15142b',
  textLight: '#fff',
  textMuted: '#b39ddb',
  gradientPrimary: 'linear-gradient(135deg, #7b42f6, #00ffc6)',
  gradientText: 'linear-gradient(90deg, #8a65f6, #00ffc6)',
  transitionStandard: 'all 0.3s ease'
};

// Hero section with starry background
const HeroSection = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  color: themeVars.textLight,
  background: `linear-gradient(180deg, ${themeVars.darkBg} 0%, #070B14 100%)`,
  overflow: 'hidden',
  padding: '0 20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url(/stars.png)',
    backgroundSize: 'cover',
    opacity: 0.5,
    zIndex: 0,
  }
});

// Animated orbs using Framer Motion
const Orb = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  zIndex: 1,
});

// Gradient title with glow effect
const GradientTitle = styled(Typography)({
  fontSize: '4.5rem', 
  fontWeight: 700,
  backgroundImage: themeVars.gradientPrimary,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 30px rgba(0, 226, 195, 0.3)',
  marginBottom: '1rem',
  lineHeight: 1.2,
  '@media (max-width: 600px)': {
    fontSize: '2.5rem',
  }
});

// CTA button with gradient background
const CTAButton = styled(Button)({
  background: themeVars.gradientPrimary,
  color: themeVars.textLight,
  padding: '12px 36px',
  borderRadius: '50px',
  fontSize: '1.1rem',
  fontWeight: 600,
  marginTop: '2rem',
  textTransform: 'uppercase',
  boxShadow: '0 4px 12px rgba(123, 66, 246, 0.3)',
  transition: themeVars.transitionStandard,
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  '&:hover': {
    boxShadow: '0 8px 20px rgba(123, 66, 246, 0.5)',
    transform: 'translateY(-3px)',
    background: themeVars.gradientPrimary,
  }
});

// Navigation components
const NavBar = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem 2rem',
  zIndex: 10,
  '@media (max-width: 768px)': {
    padding: '1rem',
  }
});

const Logo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.5rem',
  fontWeight: 700,
  color: themeVars.textLight,
  '& .highlight': {
    color: themeVars.secondary,
  }
});

const NavLinks = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  '@media (max-width: 768px)': {
    display: 'none',
  }
});

const NavLink = styled(RouterLink)({
  color: themeVars.textLight,
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '1rem',
  transition: themeVars.transitionStandard,
  '&:hover': {
    color: themeVars.secondary,
  }
});

const LogoIcon = styled('div')({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  background: themeVars.gradientPrimary,
  marginRight: '10px',
});

const AuthButtons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const LogInButton = styled(RouterLink)({
  padding: '0.5rem 1.5rem',
  borderRadius: '50px',
  border: `1px solid ${themeVars.textLight}`,
  color: themeVars.textLight,
  textDecoration: 'none',
  transition: themeVars.transitionStandard,
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    borderColor: themeVars.secondary,
    color: themeVars.secondary,
  }
});

const SignUpButton = styled(RouterLink)({
  padding: '0.5rem 1.5rem',
  borderRadius: '50px',
  background: themeVars.gradientPrimary,
  color: themeVars.textLight,
  textDecoration: 'none',
  transition: themeVars.transitionStandard,
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(123, 66, 246, 0.5)',
  }
});

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
  </svg>
);

// Section container with dark background
const SectionContainer = styled(Box)(({ nopadding }: { nopadding?: boolean }) => ({
  background: themeVars.darkBg,
  color: themeVars.textLight,
  padding: nopadding ? 0 : '80px 20px',
  position: 'relative',
  overflow: 'hidden',
  '@media (max-width: 600px)': {
    padding: nopadding ? 0 : '60px 20px',
  }
}));

// Feature card component
const FeatureCard = styled(Box)({
  background: themeVars.cardBg,
  borderRadius: '12px',
  padding: '32px 24px',
  textAlign: 'center',
  height: '100%',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  }
});

// Feature icon container
const FeatureIconContainer = styled(Box)({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  fontSize: '2rem',
});

const Landing: React.FC = () => {
  // Generate random stars for the background (matches the SalesIQ effect)
  const [stars, setStars] = useState<{id: number, x: number, y: number, size: number, opacity: number, delay: number}[]>([]);
  
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          delay: Math.random() * 3
        });
      }
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  return (
    <HeroSection>
      {/* Stars in background */}
      {stars.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: 'absolute',
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: star.opacity,
            animation: `twinkle 3s infinite ease-in-out ${star.delay}s`,
            '@keyframes twinkle': {
              '0%, 100%': {
                opacity: star.opacity - 0.1,
                transform: 'scale(0.8)',
              },
              '50%': {
                opacity: star.opacity + 0.2,
                transform: 'scale(1.2)',
              },
            },
          }}
        />
      ))}

      {/* Orbs with animation */}
      <Orb
        style={{
          width: 200,
          height: 200,
          top: '60%',
          right: '15%',
          background: 'radial-gradient(circle at 30% 30%, #4caf50, #2e7d32)',
          boxShadow: '0 0 40px #4caf50',
        }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <Orb
        style={{
          width: 100,
          height: 100,
          top: '30%',
          left: '20%',
          background: 'radial-gradient(circle at 30% 30%, #9c27b0, #6a1b9a)',
          boxShadow: '0 0 20px #9c27b0',
        }}
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <Orb
        style={{
          width: 80,
          height: 80,
          top: '20%',
          right: '25%',
          background: 'radial-gradient(circle at 30% 30%, #e91e63, #b71c1c)',
          boxShadow: '0 0 15px #e91e63',
        }}
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      <Orb
        style={{
          width: 40,
          height: 40,
          top: '50%',
          left: '30%',
          background: 'radial-gradient(circle at 30% 30%, #00bcd4, #0097a7)',
          boxShadow: '0 0 10px #00bcd4',
        }}
        animate={{
          y: [0, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
      
      <Orb
        style={{
          width: 60,
          height: 60,
          bottom: '20%',
          right: '30%',
          background: 'radial-gradient(circle at 30% 30%, #ff9800, #e65100)',
          boxShadow: '0 0 12px #ff9800',
        }}
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Navigation bar */}
      <NavBar>
        <Logo>
          <LogoIcon />
          Rep<span className="highlight">Spheres</span>
        </Logo>

        <NavLinks>
          <NavLink to="/app/market-insights">MARKET INSIGHTS</NavLink>
          <NavLink to="/app/dashboard">SPHERE OS</NavLink>
          <NavLink to="/app/workspace">WORKSPACE</NavLink>
          <NavLink to="#">PODCAST</NavLink>
        </NavLinks>

        <AuthButtons>
          <LogInButton to="/login">LOG IN</LogInButton>
          <SignUpButton to="/signup">
            SIGN UP <ArrowIcon />
          </SignUpButton>
        </AuthButtons>
      </NavBar>

      {/* Hero Content */}
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
        <GradientTitle variant="h1">
          The Future of Sales Intelligence
        </GradientTitle>
        
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'rgba(255,255,255,0.9)', 
            mb: 4, 
            fontWeight: 400,
            '@media (max-width: 600px)': {
              fontSize: '1rem',
            }
          }}
        >
          Real-time insights. Instant automation. Unmatched speed.
        </Typography>
        
        <CTAButton 
          variant="contained" 
          href="/app/dashboard"
          endIcon={<ArrowIcon />}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/app/dashboard';
          }}
        >
          GET STARTED
        </CTAButton>
      </Box>
    </HeroSection>
  );
};

export default Landing;
