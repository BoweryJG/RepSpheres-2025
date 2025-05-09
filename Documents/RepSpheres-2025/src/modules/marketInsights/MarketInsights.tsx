import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Trends from './Trends';
import Reports from './Reports';

const MarketInsights: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/trends')) {
      setValue(1);
    } else if (path.includes('/reports')) {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/market-insights/dashboard');
        break;
      case 1:
        navigate('/market-insights/trends');
        break;
      case 2:
        navigate('/market-insights/reports');
        break;
      default:
        navigate('/market-insights/dashboard');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Market Insights
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="market insights tabs">
          <Tab label="Dashboard" />
          <Tab label="Trends" />
          <Tab label="Reports" />
        </Tabs>
      </Box>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Box>
  );
};

export default MarketInsights;
