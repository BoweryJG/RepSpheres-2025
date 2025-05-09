import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';

// Type definitions
type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  project?: string;
  participants: string[];
  category: 'Meeting' | 'Deadline' | 'Task' | 'Personal' | 'Other';
};

type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  events: Event[];
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    participants: [],
    category: 'Meeting'
  });
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // This would be replaced with an actual API call to fetch events from Supabase
    // For example:
    // const fetchEvents = async () => {
    //   try {
    //     const { data, error } = await supabaseClient.from('events').select('*');
    //     if (error) throw error;
    //     setEvents(data);
    //   } catch (err) {
    //     console.error('Failed to fetch events');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // fetchEvents();
    
    // For now, simulate API call with a timeout and mock data
    setTimeout(() => {
      // Mock data
      const today = new Date();
      const mockEvents: Event[] = [
        {
          id: 1,
          title: 'Team Standup',
          description: 'Daily team standup meeting',
          date: new Date(today.getFullYear(), today.getMonth(), 15).toISOString().split('T')[0],
          startTime: '10:00',
          endTime: '10:30',
          project: 'Website Redesign',
          participants: ['John Doe', 'Jane Smith', 'Alice Johnson'],
          category: 'Meeting'
        },
        {
          id: 2,
          title: 'Client Presentation',
          description: 'Present project progress to the client',
          date: new Date(today.getFullYear(), today.getMonth(), 18).toISOString().split('T')[0],
          startTime: '14:00',
          endTime: '15:30',
          project: 'Website Redesign',
          participants: ['John Doe', 'Jane Smith', 'Bob Wilson'],
          category: 'Meeting'
        },
        {
          id: 3,
          title: 'Project Deadline',
          description: 'Submit the first phase of the project',
          date: new Date(today.getFullYear(), today.getMonth(), 25).toISOString().split('T')[0],
          startTime: '18:00',
          endTime: '18:00',
          project: 'Mobile App Development',
          participants: ['Mike Brown', 'Sarah Davis'],
          category: 'Deadline'
        }
      ];
      
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate, events]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Day of the week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Total days in month
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Create array for calendar days
    const days: CalendarDay[] = [];
    
    // Add days from previous month to start the calendar on a Sunday
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        isCurrentMonth: false,
        events: events.filter(event => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
          );
        })
      });
    }
    
    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        events: events.filter(event => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === day &&
            eventDate.getMonth() === month &&
            eventDate.getFullYear() === year
          );
        })
      });
    }
    
    // Add days from next month to fill remaining cells (if needed)
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        events: events.filter(event => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
          );
        })
      });
    }
    
    setCalendarDays(days);
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCreateEvent = () => {
    // This would be replaced with an actual API call to create an event in Supabase
    // For example:
    // const createEvent = async () => {
    //   try {
    //     const { data, error } = await supabaseClient
    //       .from('events')
    //       .insert([newEvent]);
    //     if (error) throw error;
    //     setEvents([...events, { ...newEvent, id: data[0].id }]);
    //   } catch (err) {
    //     console.error('Failed to create event');
    //   }
    // };
    // 
    // createEvent();
    
    // For now, just update the local state
    const newId = Math.max(...events.map(e => e.id), 0) + 1;
    setEvents([...events, { ...newEvent as Event, id: newId }]);
    setOpenDialog(false);
    setNewEvent({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      participants: [],
      category: 'Meeting'
    });
  };

  const handleEventChange = (field: keyof Event, value: any) => {
    setNewEvent({
      ...newEvent,
      [field]: value
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Meeting':
        return 'primary';
      case 'Deadline':
        return 'error';
      case 'Task':
        return 'success';
      case 'Personal':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h5" sx={{ mx: 2 }}>
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
          <Button startIcon={<TodayIcon />} onClick={handleToday} sx={{ ml: 2 }}>
            Today
          </Button>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleDialogOpen}>
          New Event
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          <Grid container>
            {weekDays.map(day => (
              <Grid item key={day} xs={12/7} sx={{ 
                py: 1, 
                borderBottom: '1px solid', 
                borderColor: 'divider',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                {day}
              </Grid>
            ))}
            
            {calendarDays.map((day, index) => (
              <Grid 
                item 
                key={index} 
                xs={12/7} 
                sx={{ 
                  height: 120, 
                  p: 1, 
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: !day.isCurrentMonth ? 'action.hover' : 'transparent',
                  position: 'relative'
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: new Date().toDateString() === day.date.toDateString() ? 'bold' : 'normal',
                    color: new Date().toDateString() === day.date.toDateString() ? 'primary.main' : 'text.primary',
                    mb: 1
                  }}
                >
                  {day.date.getDate()}
                </Typography>
                
                <Box sx={{ overflowY: 'auto', maxHeight: 80 }}>
                  {day.events.map((event) => (
                    <Chip
                      key={event.id}
                      label={event.title}
                      size="small"
                      color={getCategoryColor(event.category) as any}
                      sx={{ mb: 0.5, width: '100%', justifyContent: 'flex-start' }}
                    />
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* New Event Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            fullWidth
            variant="outlined"
            value={newEvent.title}
            onChange={(e) => handleEventChange('title', e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          />
          
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newEvent.description}
            onChange={(e) => handleEventChange('description', e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={new Date(newEvent.date || new Date())}
              onChange={(newValue) => {
                if (newValue) {
                  handleEventChange('date', newValue.toISOString().split('T')[0]);
                }
              }}
              sx={{ width: '100%', mb: 2 }}
            />
          </LocalizationProvider>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Start Time"
                type="time"
                fullWidth
                variant="outlined"
                value={newEvent.startTime}
                onChange={(e) => handleEventChange('startTime', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="End Time"
                type="time"
                fullWidth
                variant="outlined"
                value={newEvent.endTime}
                onChange={(e) => handleEventChange('endTime', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          
          <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={newEvent.category}
              label="Category"
              onChange={(e) => handleEventChange('category', e.target.value)}
            >
              <MenuItem value="Meeting">Meeting</MenuItem>
              <MenuItem value="Deadline">Deadline</MenuItem>
              <MenuItem value="Task">Task</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            margin="dense"
            label="Project (Optional)"
            fullWidth
            variant="outlined"
            value={newEvent.project || ''}
            onChange={(e) => handleEventChange('project', e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateEvent}
            disabled={!newEvent.title || !newEvent.date || !newEvent.startTime || !newEvent.endTime}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
