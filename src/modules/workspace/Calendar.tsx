import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Divider,
  Card,
  CardContent,
  Chip,
  Avatar
} from '@mui/material';

// Mock data for calendar events
const events = [
  {
    id: 1,
    title: 'Client Meeting - Valley Dental',
    date: '2025-05-12',
    time: '09:00 - 10:30',
    type: 'meeting',
    location: 'Online (Zoom)',
    participants: ['Dr. Emily Johnson', 'John Smith']
  },
  {
    id: 2,
    title: 'Product Demo',
    date: '2025-05-12',
    time: '13:00 - 14:00',
    type: 'demo',
    location: 'Downtown Dental Office',
    participants: ['Dr. Sarah Williams', 'Alex Rodriguez', 'Maria Garcia']
  },
  {
    id: 3,
    title: 'Team Weekly Sync',
    date: '2025-05-13',
    time: '10:00 - 11:00',
    type: 'internal',
    location: 'Conference Room B',
    participants: ['Sales Team']
  },
  {
    id: 4,
    title: 'Follow-up Call - Aesthetic Solutions',
    date: '2025-05-13',
    time: '14:30 - 15:00',
    type: 'call',
    location: 'Phone',
    participants: ['Dr. Michael Chen']
  },
  {
    id: 5,
    title: 'Quarterly Business Review',
    date: '2025-05-14',
    time: '09:00 - 12:00',
    type: 'meeting',
    location: 'Main Conference Room',
    participants: ['Executive Team', 'Regional Managers']
  },
  {
    id: 6,
    title: 'Dental Conference',
    date: '2025-05-15',
    time: 'All day',
    type: 'event',
    location: 'Convention Center',
    participants: ['Sales Team', 'Marketing Team']
  }
];

// Group events by date
const groupEventsByDate = () => {
  const grouped: { [key: string]: typeof events } = {};
  
  events.forEach(event => {
    if (!grouped[event.date]) {
      grouped[event.date] = [];
    }
    grouped[event.date].push(event);
  });
  
  return grouped;
};

const getEventTypeColor = (type: string) => {
  switch(type) {
    case 'meeting': return '#3f51b5';
    case 'demo': return '#009688';
    case 'internal': return '#9c27b0';
    case 'call': return '#ff9800';
    case 'event': return '#f44336';
    default: return '#757575';
  }
};

const Calendar: React.FC = () => {
  const groupedEvents = groupEventsByDate();
  const dates = Object.keys(groupedEvents).sort();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Schedule
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Your upcoming meetings and events
      </Typography>
      
      <Grid container spacing={3}>
        {dates.map(date => (
          <Grid item xs={12} key={date}>
            <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {formatDate(date)}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                {groupedEvents[date].map(event => (
                  <Grid item xs={12} md={6} lg={4} key={event.id}>
                    <Card sx={{ height: '100%' }}>
                      <Box 
                        sx={{ 
                          height: 8, 
                          backgroundColor: getEventTypeColor(event.type) 
                        }} 
                      />
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          {event.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                            {event.time}
                          </Typography>
                          <Chip 
                            label={event.type} 
                            size="small"
                            sx={{ 
                              backgroundColor: getEventTypeColor(event.type),
                              color: 'white',
                              height: 20,
                              fontSize: '0.7rem'
                            }}
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Location: {event.location}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {event.participants.map((participant, index) => (
                            <Chip
                              key={index}
                              size="small"
                              avatar={
                                <Avatar sx={{ bgcolor: getEventTypeColor(event.type) }}>
                                  {participant.charAt(0)}
                                </Avatar>
                              }
                              label={participant}
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
