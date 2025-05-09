import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Contacts from './Contacts';
import Companies from './Companies';

const CRM: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/companies')) {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/crm/contacts');
        break;
      case 1:
        navigate('/crm/companies');
        break;
      default:
        navigate('/crm/contacts');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Relationship Management
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="crm tabs">
          <Tab label="Contacts" />
          <Tab label="Companies" />
        </Tabs>
      </Box>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
    </Box>
  );
};

export default CRM;
