import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Grid,
  MenuItem,
  Menu,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagIcon from '@mui/icons-material/Flag';

// Type definition for task data
type Task = {
  id: number;
  title: string;
  description: string;
  project: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed';
  dueDate: string;
  assignee: string;
  completed: boolean;
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>, task: Task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  useEffect(() => {
    // This would be replaced with an actual API call to fetch tasks from Supabase
    // For example:
    // const fetchTasks = async () => {
    //   try {
    //     const { data, error } = await supabaseClient.from('tasks').select('*');
    //     if (error) throw error;
    //     setTasks(data);
    //   } catch (err) {
    //     console.error('Failed to fetch tasks');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // fetchTasks();
    
    // For now, simulate API call with a timeout and mock data
    setTimeout(() => {
      // Mock data
      const mockTasks: Task[] = [
        {
          id: 1,
          title: 'Update homepage design',
          description: 'Implement new hero section and improve responsiveness',
          project: 'Website Redesign',
          priority: 'High',
          status: 'In Progress',
          dueDate: '2025-05-15',
          assignee: 'Jane Smith',
          completed: false
        },
        {
          id: 2,
          title: 'Set up deployment pipeline',
          description: 'Configure CI/CD with automated testing',
          project: 'Website Redesign',
          priority: 'Medium',
          status: 'Todo',
          dueDate: '2025-05-20',
          assignee: 'John Doe',
          completed: false
        },
        {
          id: 3,
          title: 'Create data migration script',
          description: 'Script to transfer customer data to new schema',
          project: 'CRM Integration',
          priority: 'High',
          status: 'Review',
          dueDate: '2025-05-12',
          assignee: 'Alice Johnson',
          completed: false
        },
        {
          id: 4,
          title: 'Document API endpoints',
          description: 'Create comprehensive API documentation',
          project: 'CRM Integration',
          priority: 'Low',
          status: 'Todo',
          dueDate: '2025-05-30',
          assignee: 'Bob Wilson',
          completed: false
        },
        {
          id: 5,
          title: 'Design mobile wireframes',
          description: 'Create wireframes for all key app screens',
          project: 'Mobile App Development',
          priority: 'Medium',
          status: 'Todo',
          dueDate: '2025-06-10',
          assignee: 'Sarah Davis',
          completed: false
        }
      ];
      
      setTasks(mockTasks);
      setLoading(false);
    }, 500);
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <FlagIcon fontSize="small" color="error" />;
      case 'Medium':
        return <FlagIcon fontSize="small" color="warning" />;
      case 'Low':
        return <FlagIcon fontSize="small" color="success" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'default';
      case 'In Progress':
        return 'primary';
      case 'Review':
        return 'warning';
      case 'Completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search tasks..."
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
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ mr: 2 }}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
          >
            New Task
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="tasks table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task) => (
                    <TableRow
                      key={task.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        textDecoration: task.completed ? 'line-through' : 'none',
                        opacity: task.completed ? 0.7 : 1
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {task.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {task.description}
                        </Typography>
                      </TableCell>
                      <TableCell>{task.project}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getPriorityIcon(task.priority)}
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {task.priority}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={task.status}
                          size="small"
                          color={getStatusColor(task.status) as any}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={(e) => handleMoreClick(e, task)}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      No tasks found matching your search.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* Task options menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Change Status</MenuItem>
        <MenuItem onClick={handleClose}>Reassign</MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default Tasks;
