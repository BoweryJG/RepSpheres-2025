import React, { useState } from 'react';
import { Box, Typography, Tab, Tabs } from '@mui/material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import TranslateIcon from '@mui/icons-material/Translate';
import DescriptionIcon from '@mui/icons-material/Description';

// Import submodule components
import AIChat from './AIChat';
import Translator from './Translator';
import Templates from './Templates';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`linguistics-tabpanel-${index}`}
      aria-labelledby={`linguistics-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Linguistics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(() => {
    const path = location.pathname;
    if (path.includes('/translator')) {
      return 1;
    } else if (path.includes('/templates')) {
      return 2;
    } else {
      return 0;
    }
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/linguistics/chat');
        break;
      case 1:
        navigate('/linguistics/translator');
        break;
      case 2:
        navigate('/linguistics/templates');
        break;
      default:
        navigate('/linguistics/chat');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Linguistics
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="linguistics tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            icon={<ChatIcon />} 
            label="AI Chat" 
            iconPosition="start" 
          />
          <Tab 
            icon={<TranslateIcon />} 
            label="Translator" 
            iconPosition="start" 
          />
          <Tab 
            icon={<DescriptionIcon />} 
            label="Templates" 
            iconPosition="start" 
          />
        </Tabs>
      </Box>
      
      <Routes>
        <Route path="/" element={<AIChat />} />
        <Route path="/chat" element={<AIChat />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </Box>
  );
};

export default Linguistics;
