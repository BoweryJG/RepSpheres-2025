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
  LinearProgress,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

// Type definition for project data
type Project = {
  id: number;
  name: string;
  description: string;
  progress: number;
  status: 'Active' | 'Completed' | 'On Hold' | 'Planned';
  dueDate: string;
  team: string[];
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>, project: Project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    // This would be replaced with an actual API call to fetch projects from Supabase
    // For example:
    // const fetchProjects = async () => {
    //   try {
    //     const { data, error } = await supabaseClient.from('projects').select('*');
    //     if (error) throw error;
    //     setProjects(data);
    //   } catch (err) {
    //     console.error('Failed to fetch projects');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // fetchProjects();
    
    // For now, simulate API call with a timeout and mock data
    setTimeout(() => {
      // Mock data
      const mockProjects: Project[] = [
        {
          id: 1,
          name: 'Website Redesign',
          description: 'Complete overhaul of the company website with new UI/UX',
          progress: 75,
          status: 'Active',
          dueDate: '2025-06-15',
          team: ['John Doe', 'Jane Smith']
        },
        {
          id: 2,
          name: 'CRM Integration',
          description: 'Integrate our new CRM system with existing platforms',
          progress: 30,
          status: 'Active',
          dueDate: '2025-07-22',
          team: ['Alice Johnson', 'Bob Wilson']
        },
        {
          id: 3,
          name: 'Mobile App Development',
          description: 'Create a companion mobile app for our main service',
          progress: 10,
          status: 'Planned',
          dueDate: '2025-09-30',
          team: ['Mike Brown', 'Sarah Davis']
        }
      ];
      
      setProjects(mockProjects);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Completed':
        return 'info';
      case 'On Hold':
        return 'warning';
      case 'Planned':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ mr: 1 }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
          >
            Sort
          </Button>
        </Grid>
        <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleDialogOpen}
          >
            New Project
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredProjects.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" noWrap>
                      {project.name}
                    </Typography>
                    <IconButton size="small" onClick={(e) => handleMoreClick(e, project)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Chip 
                    label={project.status} 
                    size="small" 
                    color={getStatusColor(project.status) as any}
                    sx={{ mb: 1, mt: 0.5 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: '3em' }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      Progress:
                    </Typography>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress variant="determinate" value={project.progress} />
                    </Box>
                    <Typography variant="body2">
                      {project.progress}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View Details</Button>
                  <Button size="small">Assign Task</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No projects found matching your search.
          </Typography>
        </Paper>
      )}

      {/* Project options menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Duplicate</MenuItem>
        <MenuItem onClick={handleClose}>Archive</MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Menu>

      {/* New Project Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            variant="outlined"
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Due Date"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Status"
                select
                fullWidth
                variant="outlined"
                defaultValue="Planned"
              >
                <MenuItem value="Planned">Planned</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
