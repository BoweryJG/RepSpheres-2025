import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import PodcastsIcon from '@mui/icons-material/Podcasts';

export default function Podcasts() {
  return (
    <Box sx={{ py: 6, background: 'rgba(40, 20, 70, 0.55)', color: '#fff' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <PodcastsIcon sx={{ fontSize: 60, color: 'var(--secondary, #00ffc6)' }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Listen to Our Podcast
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Deep dives, interviews, and actionable insights from industry leaders.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="#"
          sx={{ mt: 2 }}
        >
          Go to Podcasts
        </Button>
      </Container>
    </Box>
  );
}
