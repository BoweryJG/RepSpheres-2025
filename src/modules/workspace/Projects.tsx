import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, LinearProgress } from '@mui/material';

// Mock data for projects
const projectsData = [
  {
    id: 1,
    name: 'Sales Campaign Q2',
    description: 'Quarterly sales initiative for dental equipment',
    progress: 75,
    status: 'In Progress',
    dueDate: '2025-06-30',
  },
  {
    id: 2,
    name: 'New Client Onboarding',
    description: 'Process for bringing on new dental practices',
    progress: 30,
    status: 'In Progress',
    dueDate: '2025-07-15',
  },
  {
    id: 3,
    name: 'Market Research',
    description: 'Research on emerging dental technology trends',
    progress: 100,
    status: 'Completed',
    dueDate: '2025-05-01',
  },
  {
    id: 4,
    name: 'Product Launch',
    description: 'Launch plan for new whitening system',
    progress: 10,
    status: 'Just Started',
    dueDate: '2025-09-01',
  },
];

const Projects: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'Just Started':
        return 'warning';
      case 'On Hold':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Projects Overview
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage and track all your ongoing projects
      </Typography>

      <Grid container spacing={3}>
        {projectsData.map((project) => (
          <Grid item xs={12} md={6} key={project.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{project.name}</Typography>
                  <Chip 
                    label={project.status} 
                    color={getStatusColor(project.status) as any}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={project.progress} 
                      color={project.progress === 100 ? "success" : "primary"}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${project.progress}%`}</Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
