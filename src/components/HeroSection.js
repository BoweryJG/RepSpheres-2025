import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import AnimatedOrbHeroBG from './AnimatedOrbHeroBG';

export default function HeroSection() {
  const heroRef = useRef();
  const [showOrb, setShowOrb] = useState(true);

  useEffect(() => {
    const obs = new window.IntersectionObserver(
      ([entry]) => setShowOrb(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: 'relative',
        minHeight: { xs: '90vh', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        zIndex: 1,
        background: 'transparent',
        pt: { xs: 14, md: 22 },
        pb: { xs: 8, md: 14 },
        overflow: 'hidden',
      }}
    >
      <AnimatedOrbHeroBG
        width={480}
        height={480}
        zIndex={1} // Above background (0) but below navbar (1301)
        visible={showOrb}
        // When hero is not visible, trigger dispersal (handled in AnimatedOrbHeroBG)
        disperse={!showOrb}
        style={{
          opacity: 0.85,
          position: 'absolute',
          pointerEvents: 'none',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
        sx={{
          right: 0,
          top: 0,
          left: 0,
          bottom: 0,
        }}
      />
      <Container maxWidth="md" sx={{ mt: { xs: 20, md: 24 } }}>
  <Typography
    variant="h1"
    sx={{
      fontFamily: "'Space Grotesk', 'Montserrat Alternates', Arial, sans-serif",
      fontWeight: 800,
      fontSize: { xs: '2.9rem', md: '4.2rem' },
      mb: 2.5,
      letterSpacing: '-0.03em',
      lineHeight: 1.08,
      background: 'linear-gradient(92deg, #00ffc6 0%, #3a86ff 40%, #7B42F6 80%, #fff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 6px 32px rgba(58,134,255,0.14), 0 1px 0 #00ffc6',
      position: 'relative',
      zIndex: 2,
      animation: 'gradientMove 5s ease-in-out infinite alternate',
      '@keyframes gradientMove': {
        '0%': { backgroundPosition: '0% 50%' },
        '100%': { backgroundPosition: '100% 50%' }
      }
    }}
  >
    The Future of <Box component="span" sx={{
      background: 'linear-gradient(90deg, #fff 10%, #00ffc6 50%, #7B42F6 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 900,
      letterSpacing: '-0.01em',
      textShadow: '0 2px 12px #00ffc688, 0 1px 0 #fff',
      px: 0.5,
      animation: 'shine 2.5s linear infinite alternate',
      '@keyframes shine': {
        '0%': { filter: 'brightness(1.1)' },
        '100%': { filter: 'brightness(1.4)' }
      }
    }}>Sales Intelligence</Box>
  </Typography>
  <Typography
    variant="h6"
    sx={{
      fontFamily: "'DM Sans', Arial, sans-serif",
      color: 'rgba(255,255,255,0.92)',
      mb: 5,
      maxWidth: 600,
      mx: 'auto',
      fontWeight: 400,
      fontSize: { xs: '1.18rem', md: '1.33rem' },
      letterSpacing: '0.03em',
      background: 'linear-gradient(90deg, #b6b6c8 0%, #00ffc6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      position: 'relative',
      zIndex: 2,
    }}
  >
    Real-time insights. Instant automation. Unmatched speed.
  </Typography>
  <Button
    variant="contained"
    size="large"
    href="#schedule"
    sx={{
      px: 6,
      py: 2.1,
      fontWeight: 800,
      fontFamily: "'Space Grotesk', 'Montserrat Alternates', Arial, sans-serif",
      fontSize: { xs: '1.14rem', md: '1.22rem' },
      borderRadius: '30px',
      background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
      boxShadow: '0 4px 24px rgba(123,66,246,0.18), 0 1.5px 18px #00ffc633',
      color: '#fff',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      transition: 'all 0.22s',
      mt: 2,
      position: 'relative',
      zIndex: 2,
      '&:hover': {
        background: 'linear-gradient(270deg, #7B42F6 0%, #00ffc6 100%)',
        boxShadow: '0 8px 36px rgba(123,66,246,0.22), 0 2px 24px #00ffc655',
        color: '#fff',
        transform: 'translateY(-2px) scale(1.045)'
      }
    }}
  >
    Get Started →
  </Button>
</Container>
      {/* Visually stunning SVG wave divider - now absolutely positioned */}
      <Box sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        lineHeight: 0,
        zIndex: 3,
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1440 180" width="100%" height="100" preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#00ffc6" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#7B42F6" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#18182B" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glassBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="14" result="blur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.45"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M0,80 C480,170 960,0 1440,120 L1440,180 L0,180 Z"
            fill="url(#waveGradient)"
            filter="url(#glassBlur)"
          />
        </svg>
      </Box>
    </Box>
  );
}
