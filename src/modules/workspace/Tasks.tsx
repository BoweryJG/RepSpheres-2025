import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Divider,
  Menu,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FlagIcon from '@mui/icons-material/Flag';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';

// Type definitions
type Task = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string; // ISO Date string
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  category: 'Work' | 'Personal' | 'Meeting' | 'Development' | 'Design' | 'Other';
  assignedTo?: string;
  project?: string;
  createdAt: string; // ISO Date string
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [taskMenuAnchorEl, setTaskMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'completed'>('all');
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    completed: false,
    priority: 'Medium',
    category: 'Work',
    assignedTo: '',
    project: ''
  });

  useEffect(() => {
    // This would be replaced with an actual API call to fetch tasks from Supabase
    // For now, simulate API call with a timeout and mock data
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: 1,
          title: 'Create wireframes for mobile app',
          description: 'Design the initial wireframes for the mobile application based on requirements',
          dueDate: '2025-05-15',
          completed: false,
          priority: 'High',
          category: 'Design',
          assignedTo: 'Jane Smith',
          project: 'Mobile App Development',
          createdAt: '2025-05-01T10:30:00Z'
        },
        {
          id: 2,
          title: 'Set up development environment',
          description: 'Install and configure all necessary tools for the project development',
          dueDate: '2025-05-10',
          completed: true,
          priority: 'Medium',
          category: 'Development',
          assignedTo: 'John Doe',
          project: 'Website Redesign',
          createdAt: '2025-05-02T14:15:00Z'
        },
        {
          id: 3,
          title: 'Client presentation preparation',
          description: 'Prepare slides and demo for the client meeting',
          dueDate: '2025-05-18',
          completed: false,
          priority: 'Urgent',
          category: 'Meeting',
          assignedTo: 'Mike Johnson',
          project: 'CRM Integration',
          createdAt: '2025-05-03T09:00:00Z'
        },
        {
          id: 4,
          title: 'Weekly team meeting',
          description: 'Regular team sync-up to discuss progress and blockers',
          dueDate: '2025-05-12',
          completed: false,
          priority: 'Medium',
          category: 'Meeting',
          assignedTo: 'All Team Members',
          project: '',
          createdAt: '2025-05-04T16:45:00Z'
        },
        {
          id: 5,
          title: 'Research API integration options',
          description: 'Research and document various API integration approaches for the project',
          dueDate: '2025-05-20',
          completed: false,
          priority: 'Low',
          category: 'Development',
          assignedTo: 'Sarah Davis',
          project: 'CRM Integration',
          createdAt: '2025-05-05T11:20:00Z'
        }
      ];
      
      setTasks(mockTasks);
      setFilteredTasks(mockTasks);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...tasks];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(lowercasedSearch) ||
        (task.description && task.description.toLowerCase().includes(lowercasedSearch)) ||
        (task.assignedTo && task.assignedTo.toLowerCase().includes(lowercasedSearch)) ||
        (task.project && task.project.toLowerCase().includes(lowercasedSearch))
      );
    }
    
    // Apply completion filter
    if (filterBy === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filterBy === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }
    
    setFilteredTasks(filtered);
  }, [searchTerm, filterBy, tasks]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleTaskMenuOpen = (event: React.MouseEvent<HTMLElement>, taskId: number) => {
    setTaskMenuAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleTaskMenuClose = () => {
    setTaskMenuAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleCreateTask = () => {
    // This would be replaced with an actual API call to create a task in Supabase
    // For now, just update the local state
    const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
    const newTaskData: Task = {
      ...newTask as any,
      id: newId,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, newTaskData]);
    setOpenDialog(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      priority: 'Medium',
      category: 'Work',
      assignedTo: '',
      project: ''
    });
  };

  const handleTaskChange = (field: keyof Task, value: any) => {
    setNewTask({
      ...newTask,
      [field]: value
    });
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = () => {
    if (selectedTaskId) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== selectedTaskId));
      handleTaskMenuClose();
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work':
        return 'primary';
      case 'Personal':
        return 'secondary';
      case 'Meeting':
        return 'info';
      case 'Development':
        return 'success';
      case 'Design':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDaysRemaining = (dueDate?: string) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Tasks</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
        >
          Add Task
        </Button>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search tasks..."
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
      
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider' }}>
          <Button 
            sx={{ 
              px: 3, 
              py: 1.5, 
              borderBottom: 2, 
              borderColor: filterBy === 'all' ? 'primary.main' : 'transparent',
              borderRadius: 0,
              color: filterBy === 'all' ? 'primary.main' : 'text.secondary',
            }}
            onClick={() => setFilterBy('all')}
          >
            All
          </Button>
          <Button 
            sx={{ 
              px: 3, 
              py: 1.5, 
              borderBottom: 2, 
              borderColor: filterBy === 'active' ? 'primary.main' : 'transparent',
              borderRadius: 0,
              color: filterBy === 'active' ? 'primary.main' : 'text.secondary',
            }}
            onClick={() => setFilterBy('active')}
          >
            Active
          </Button>
          <Button 
            sx={{ 
              px: 3, 
              py: 1.5, 
              borderBottom: 2, 
              borderColor: filterBy === 'completed' ? 'primary.main' : 'transparent',
              borderRadius: 0,
              color: filterBy === 'completed' ? 'primary.main' : 'text.secondary',
            }}
            onClick={() => setFilterBy('completed')}
          >
            Completed
          </Button>
        </Box>
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          {filteredTasks.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography>No tasks found matching your criteria.</Typography>
            </Box>
          ) : (
            <List sx={{ width: '100%' }}>
              {filteredTasks.map((task, index) => (
                <React.Fragment key={task.id}>
                  <ListItem 
                    dense 
                    sx={{ 
                      py: 1.5,
                      opacity: task.completed ? 0.7 : 1,
                      backgroundColor: task.completed ? 'action.hover' : 'transparent'
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            textDecoration: task.completed ? 'line-through' : 'none',
                            fontWeight: task.completed ? 'normal' : 'medium'
                          }}
                        >
                          {task.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          {task.description && (
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {task.description}
                            </Typography>
                          )}
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {task.dueDate && (
                              <Tooltip title="Due date">
                                <Chip
                                  icon={<EventIcon fontSize="small" />}
                                  label={formatDate(task.dueDate)}
                                  size="small"
                                  color={
                                    task.completed
                                      ? 'default'
                                      : getDaysRemaining(task.dueDate) !== null
                                        ? getDaysRemaining(task.dueDate)! < 0
                                          ? 'error'
                                          : getDaysRemaining(task.dueDate)! < 3
                                            ? 'warning'
                                            : 'default'
                                        : 'default'
                                  }
                                  variant={task.completed ? 'outlined' : 'filled'}
                                />
                              </Tooltip>
                            )}
                            <Tooltip title="Priority">
                              <Chip
                                icon={<FlagIcon fontSize="small" />}
                                label={task.priority}
                                size="small"
                                color={task.completed ? 'default' : getPriorityColor(task.priority) as any}
                                variant={task.completed ? 'outlined' : 'filled'}
                              />
                            </Tooltip>
                            <Tooltip title="Category">
                              <Chip
                                label={task.category}
                                size="small"
                                color={task.completed ? 'default' : getCategoryColor(task.category) as any}
                                variant={task.completed ? 'outlined' : 'filled'}
                              />
                            </Tooltip>
                            {task.assignedTo && (
                              <Tooltip title="Assigned to">
                                <Chip
                                  icon={<PersonIcon fontSize="small" />}
                                  label={task.assignedTo}
                                  size="small"
                                  variant="outlined"
                                />
                              </Tooltip>
                            )}
                            {task.project && (
                              <Tooltip title="Project">
                                <Chip
                                  icon={<AssignmentIcon fontSize="small" />}
                                  label={task.project}
                                  size="small"
                                  variant="outlined"
                                />
                              </Tooltip>
                            )}
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={(e) => handleTaskMenuOpen(e, task.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < filteredTasks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      )}

      {/* Task Actions Menu */}
      <Menu
        anchorEl={taskMenuAnchorEl}
        open={Boolean(taskMenuAnchorEl)}
        onClose={handleTaskMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleTaskMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteTask}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ color: 'error' }} />
        </MenuItem>
      </Menu>

      {/* New Task Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Task Title"
                fullWidth
                variant="outlined"
                value={newTask.title}
                onChange={(e) => handleTaskChange('title', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description (Optional)"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={newTask.description}
                onChange={(e) => handleTaskChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Due Date (Optional)"
                type="date"
                fullWidth
                variant="outlined"
                value={newTask.dueDate}
                onChange={(e) => handleTaskChange('dueDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTask.priority}
                  label="Priority"
                  onChange={(e) => handleTaskChange('priority', e.target.value)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newTask.category}
                  label="Category"
                  onChange={(e) => handleTaskChange('category', e.target.value)}
                >
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Meeting">Meeting</MenuItem>
                  <MenuItem value="Development">Development</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Assigned To (Optional)"
                fullWidth
                variant="outlined"
                value={newTask.assignedTo}
                onChange={(e) => handleTaskChange('assignedTo', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project (Optional)"
                fullWidth
                variant="outlined"
                value={newTask.project}
                onChange={(e) => handleTaskChange('project', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateTask}
            disabled={!newTask.title}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks;
