import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Projects from './Projects';
import Tasks from './Tasks';
import Calendar from './Calendar';

const Workspace: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/tasks')) {
      setValue(1);
    } else if (path.includes('/calendar')) {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/workspace/projects');
        break;
      case 1:
        navigate('/workspace/tasks');
        break;
      case 2:
        navigate('/workspace/calendar');
        break;
      default:
        navigate('/workspace/projects');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Workspace
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="workspace tabs">
          <Tab label="Projects" />
          <Tab label="Tasks" />
          <Tab label="Calendar" />
        </Tabs>
      </Box>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Box>
  );
};

export default Workspace;
