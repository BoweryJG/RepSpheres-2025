import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  Paper,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Mock data for tasks
const tasksData = [
  {
    id: 1,
    title: 'Follow up with Dr. Martinez',
    completed: false,
    priority: 'high',
    dueDate: '2025-05-15',
    category: 'Sales'
  },
  {
    id: 2,
    title: 'Prepare presentation for dental conference',
    completed: false,
    priority: 'medium',
    dueDate: '2025-05-20',
    category: 'Marketing'
  },
  {
    id: 3,
    title: 'Review Q2 sales projections',
    completed: true,
    priority: 'medium',
    dueDate: '2025-05-10',
    category: 'Analytics'
  },
  {
    id: 4,
    title: 'Send product samples to new clinic',
    completed: false,
    priority: 'high',
    dueDate: '2025-05-12',
    category: 'Sales'
  },
  {
    id: 5,
    title: 'Update CRM with new contacts',
    completed: true,
    priority: 'low',
    dueDate: '2025-05-08',
    category: 'Administrative'
  },
];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = React.useState(tasksData);
  const [filter, setFilter] = React.useState('all');
  
  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };
  
  const handleToggleTask = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleDeleteTask = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  
  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    if (filter === 'high') return task.priority === 'high';
    return true;
  });
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
          Tasks
        </Typography>
        
        <FormControl size="small" sx={{ width: 150 }}>
          <InputLabel id="task-filter-label">Filter</InputLabel>
          <Select
            labelId="task-filter-label"
            id="task-filter"
            value={filter}
            label="Filter"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All Tasks</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="high">High Priority</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Paper elevation={2}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {filteredTasks.map((task, index) => (
            <React.Fragment key={task.id}>
              {index > 0 && <Divider component="li" />}
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                }
                sx={{ 
                  opacity: task.completed ? 0.6 : 1,
                  textDecoration: task.completed ? 'line-through' : 'none'
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={task.title}
                  secondary={
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      <Chip 
                        icon={task.priority === 'high' ? <PriorityHighIcon fontSize="small" /> : undefined}
                        label={task.priority}
                        size="small"
                        color={getPriorityColor(task.priority) as any}
                        sx={{ height: 24 }}
                      />
                      <Chip 
                        label={task.category}
                        size="small"
                        variant="outlined"
                        sx={{ height: 24 }}
                      />
                      <Chip 
                        label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                        size="small"
                        variant="outlined"
                        sx={{ height: 24 }}
                      />
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
          {filteredTasks.length === 0 && (
            <ListItem>
              <ListItemText 
                primary="No tasks found"
                secondary="Add a new task or change your filter"
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Tasks;
