import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Importing subcomponents
import Translator from './Translator';
import AIChat from './AIChat';
import Templates from './Templates';

const Linguistics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/ai-chat')) {
      setValue(1);
    } else if (path.includes('/templates')) {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/linguistics/translator');
        break;
      case 1:
        navigate('/linguistics/ai-chat');
        break;
      case 2:
        navigate('/linguistics/templates');
        break;
      default:
        navigate('/linguistics/translator');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Linguistics
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="linguistics tabs">
          <Tab label="Translator" />
          <Tab label="AI Chat" />
          <Tab label="Templates" />
        </Tabs>
      </Box>
      <Routes>
        <Route path="/" element={<Translator />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </Box>
  );
};

export default Linguistics;
