import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Performance from './Performance';
import Metrics from './Metrics';

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/metrics')) {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/analytics/performance');
        break;
      case 1:
        navigate('/analytics/metrics');
        break;
      default:
        navigate('/analytics/performance');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Analytics
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="analytics tabs">
          <Tab label="Performance" />
          <Tab label="Metrics" />
        </Tabs>
      </Box>
      <Routes>
        <Route path="/" element={<Performance />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </Box>
  );
};

export default Analytics;
