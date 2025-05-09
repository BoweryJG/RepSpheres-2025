import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Will be replaced with actual market insights components
const Dashboard = () => (
  <Box p={3}>
    <Typography variant="h5">Market Insights Dashboard</Typography>
    <Typography variant="body1" mt={2}>
      This dashboard provides an overview of key market trends and insights.
    </Typography>
  </Box>
);

const Trends = () => (
  <Box p={3}>
    <Typography variant="h5">Market Trends</Typography>
    <Typography variant="body1" mt={2}>
      This section displays detailed analytics on emerging market trends and patterns.
    </Typography>
  </Box>
);

const Competitors = () => (
  <Box p={3}>
    <Typography variant="h5">Competitor Analysis</Typography>
    <Typography variant="body1" mt={2}>
      This section provides detailed information about market competitors and comparative analysis.
    </Typography>
  </Box>
);

const MarketInsights: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/trends')) {
      setValue(1);
    } else if (path.includes('/competitors')) {
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
        navigate('/market-insights/competitors');
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
          <Tab label="Competitors" />
        </Tabs>
      </Box>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/competitors" element={<Competitors />} />
      </Routes>
    </Box>
  );
};

export default MarketInsights;
