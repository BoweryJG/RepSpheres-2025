import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function CTASection() {
  return (
    <Box id="schedule" sx={{
      py: { xs: 4, md: 6 },
      px: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderTop: '1px solid rgba(255,255,255,0.12)',
    }}>
      <Typography variant="h2" sx={{
        fontWeight: 800,
        textAlign: 'center',
        mb: 2,
        background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Ready to Transform Your Sales Team?
      </Typography>
      <Typography sx={{
        textAlign: 'center',
        maxWidth: 600,
        mx: 'auto',
        mb: 5,
        fontSize: { xs: '1.12rem', md: '1.22rem' },
        color: 'rgba(255,255,255,0.97)'
      }}>
        Take the first step toward elite sales performance. Schedule a call with our team to discover how RepSpheres can elevate your results.
      </Typography>
      <Button
        variant="contained"
        href="#contact"
        size="large"
        sx={{
          px: 6,
          py: 2.2,
          fontWeight: 700,
          fontSize: '1.18rem',
          borderRadius: '30px',
          background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 100%)',
          boxShadow: '0 4px 24px rgba(123,66,246,0.18)',
          color: '#fff',
          transition: 'all 0.22s',
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(90deg, #5B3CFF 0%, #00ffc6 100%)',
            boxShadow: '0 8px 36px rgba(123,66,246,0.22)',
            color: '#fff',
            transform: 'translateY(-2px) scale(1.04)'
          },
          display: { xs: 'none', md: 'inline-flex' }
        }}
      >
        Schedule a Call
      </Button>
      {/* Sticky mobile CTA */}
      <Box sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 16,
        zIndex: 2000,
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <Button
          variant="contained"
          href="#contact"
          size="large"
          sx={{
            px: 5,
            py: 1.7,
            fontWeight: 700,
            fontSize: '1.08rem',
            borderRadius: '28px',
            background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 100%)',
            boxShadow: '0 8px 36px 0 rgba(123,66,246,0.22)',
            color: '#fff',
            pointerEvents: 'auto',
            textTransform: 'none',
            transition: 'all 0.22s',
            '&:hover': {
              background: 'linear-gradient(90deg, #5B3CFF 0%, #00ffc6 100%)',
              boxShadow: '0 12px 48px 0 rgba(123,66,246,0.29)',
              color: '#fff',
              transform: 'translateY(-2px) scale(1.04)'
            }
          }}
        >
          Schedule a Call
        </Button>
      </Box>
    </Box>
  );
}
