import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';

// Type definitions
type Project = {
  id: number;
  name: string;
  description: string;
  startDate: string; // ISO Date string
  dueDate: string; // ISO Date string
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold';
  progress: number; // 0-100
  client?: string;
  team: string[];
  budget?: number;
  tags: string[];
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Planning',
    progress: 0,
    client: '',
    team: [],
    budget: undefined,
    tags: [],
    priority: 'Medium'
  });

  useEffect(() => {
    // This would be replaced with an actual API call to fetch projects from Supabase
    // For now, simulate API call with a timeout and mock data
    setTimeout(() => {
      const mockProjects: Project[] = [
        {
          id: 1,
          name: 'Website Redesign',
          description: 'Redesign company website with new branding guidelines',
          startDate: '2025-04-10',
          dueDate: '2025-06-15',
          status: 'In Progress',
          progress: 65,
          client: 'Acme Inc.',
          team: ['John Doe', 'Jane Smith', 'Alice Johnson'],
          budget: 8500,
          tags: ['design', 'frontend', 'ux'],
          priority: 'High'
        },
        {
          id: 2,
          name: 'Mobile App Development',
          description: 'Develop a cross-platform mobile application',
          startDate: '2025-03-01',
          dueDate: '2025-08-30',
          status: 'In Progress',
          progress: 40,
          client: 'Tech Innovations',
          team: ['Mike Brown', 'Sarah Davis', 'Robert Wilson'],
          budget: 12000,
          tags: ['mobile', 'react-native', 'api-integration'],
          priority: 'Medium'
        },
        {
          id: 3,
          name: 'CRM Integration',
          description: 'Integrate new CRM system with existing platform',
          startDate: '2025-05-01',
          dueDate: '2025-06-30',
          status: 'Planning',
          progress: 15,
          client: 'Global Solutions',
          team: ['Emily Taylor', 'James Miller'],
          budget: 5000,
          tags: ['crm', 'api', 'integration'],
          priority: 'High'
        },
        {
          id: 4,
          name: 'Brand Strategy',
          description: 'Develop new brand strategy and guidelines',
          startDate: '2025-02-15',
          dueDate: '2025-04-30',
          status: 'Completed',
          progress: 100,
          client: 'XYZ Corp',
          team: ['Anna Garcia', 'Tom Lee'],
          budget: 4500,
          tags: ['branding', 'marketing', 'design'],
          priority: 'Medium'
        },
        {
          id: 5,
          name: 'Data Analytics Dashboard',
          description: 'Create interactive analytics dashboard',
          startDate: '2025-04-20',
          dueDate: '2025-07-15',
          status: 'On Hold',
          progress: 35,
          client: 'Data Systems Inc.',
          team: ['Chris Evans', 'Diana Chen', 'Mark Johnson'],
          budget: 9800,
          tags: ['analytics', 'dashboard', 'data-visualization'],
          priority: 'Low'
        }
      ];
      
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = projects.filter(project => 
        project.name.toLowerCase().includes(lowercasedSearch) ||
        project.description.toLowerCase().includes(lowercasedSearch) ||
        project.client?.toLowerCase().includes(lowercasedSearch) ||
        project.tags.some(tag => tag.toLowerCase().includes(lowercasedSearch))
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCreateProject = () => {
    // This would be replaced with an actual API call to create a project in Supabase
    // For now, just update the local state
    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    const newProjectData: Project = {
      ...newProject as any,
      id: newId
    };
    
    setProjects([...projects, newProjectData]);
    setOpenDialog(false);
    setNewProject({
      name: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Planning',
      progress: 0,
      client: '',
      team: [],
      budget: undefined,
      tags: [],
      priority: 'Medium'
    });
  };

  const handleProjectChange = (field: keyof Project, value: any) => {
    setNewProject({
      ...newProject,
      [field]: value
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'primary';
      case 'In Progress':
        return 'info';
      case 'Review':
        return 'warning';
      case 'Completed':
        return 'success';
      case 'On Hold':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'info';
      case 'High':
        return 'warning';
      case 'Urgent':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
        >
          New Project
        </Button>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search projects..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredProjects.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography>No projects found matching your criteria.</Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} md={6} lg={4} key={project.id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 6
                    }
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FolderIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6" component="div" noWrap>
                            {project.name}
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {project.description}
                      </Typography>
                      
                      <Box sx={{ mb: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={project.progress} 
                          sx={{ height: 8, borderRadius: 2 }} 
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="caption">{project.progress}% Complete</Typography>
                          <Chip 
                            label={project.status}
                            size="small"
                            color={getStatusColor(project.status) as any}
                          />
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2">
                          <strong>Client:</strong>
                        </Typography>
                        <Typography variant="body2">{project.client}</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2">
                          <strong>Timeline:</strong>
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(project.startDate)} - {formatDate(project.dueDate)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2">
                          <strong>Remaining:</strong>
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color={
                            getDaysRemaining(project.dueDate) < 0 
                              ? 'error.main' 
                              : getDaysRemaining(project.dueDate) < 7 
                                ? 'warning.main' 
                                : 'text.primary'
                          }
                        >
                          {getDaysRemaining(project.dueDate) < 0 
                            ? `${Math.abs(getDaysRemaining(project.dueDate))} days overdue` 
                            : getDaysRemaining(project.dueDate) === 0 
                              ? 'Due today'
                              : `${getDaysRemaining(project.dueDate)} days`
                          }
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          <strong>Priority:</strong>
                        </Typography>
                        <Chip 
                          label={project.priority}
                          size="small"
                          color={getPriorityColor(project.priority) as any}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Team:</strong>
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {project.team.map((member, index) => (
                            <Avatar
                              key={index}
                              sx={{ 
                                width: 28, 
                                height: 28, 
                                fontSize: '0.875rem',
                                mr: 0.5,
                                mb: 0.5,
                                bgcolor: `primary.${(index % 3) + 1}00`
                              }}
                            >
                              {member.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                          ))}
                        </Box>
                      </Box>
                      
                      <Box>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Tags:</strong>
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {project.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              size="small"
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.75rem', 
                                height: 24
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
                      <Button size="small" color="primary">View Details</Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* New Project Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Project Name"
                fullWidth
                variant="outlined"
                value={newProject.name}
                onChange={(e) => handleProjectChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={newProject.description}
                onChange={(e) => handleProjectChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                variant="outlined"
                value={newProject.startDate}
                onChange={(e) => handleProjectChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                variant="outlined"
                value={newProject.dueDate}
                onChange={(e) => handleProjectChange('dueDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newProject.status}
                  label="Status"
                  onChange={(e) => handleProjectChange('status', e.target.value)}
                >
                  <MenuItem value="Planning">Planning</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Review">Review</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="On Hold">On Hold</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newProject.priority}
                  label="Priority"
                  onChange={(e) => handleProjectChange('priority', e.target.value)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Client"
                fullWidth
                variant="outlined"
                value={newProject.client}
                onChange={(e) => handleProjectChange('client', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget"
                fullWidth
                variant="outlined"
                type="number"
                value={newProject.budget}
                onChange={(e) => handleProjectChange('budget', e.target.value ? parseFloat(e.target.value) : undefined)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tags (comma separated)"
                fullWidth
                variant="outlined"
                value={newProject.tags?.join(', ')}
                onChange={(e) => handleProjectChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                placeholder="e.g. design, frontend, api"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateProject}
            disabled={!newProject.name || !newProject.description || !newProject.startDate || !newProject.dueDate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
