import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  // Sample data for charts
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales 2025',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Sales 2024',
        data: [8, 15, 2, 4, 1, 2],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const barChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Expenses',
        data: [45, 49, 60, 71],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Sales
            </Typography>
            <Typography component="p" variant="h4">
              $3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              as of 9 May, 2025
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              New Clients
            </Typography>
            <Typography component="p" variant="h4">
              12
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              this month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Conversion Rate
            </Typography>
            <Typography component="p" variant="h4">
              18.2%
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              last 30 days
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Active Campaigns
            </Typography>
            <Typography component="p" variant="h4">
              4
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              currently running
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Sales Performance" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Line 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                  }} 
                  data={lineChartData} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Revenue vs Expenses" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Bar
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  data={barChartData}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Market Distribution" />
            <CardContent>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                <Pie
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  data={pieChartData}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Recent Activities" />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="New client onboarded" 
                    secondary="Acme Corp - 9 May, 2025" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Campaign launched" 
                    secondary="Summer Promotion - 8 May, 2025" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Market report generated" 
                    secondary="Q2 Analysis - 7 May, 2025" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Team meeting" 
                    secondary="Strategy Planning - 6 May, 2025" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
