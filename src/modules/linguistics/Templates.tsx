import React, { useState } from 'react';
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
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';

// Type definitions
type Template = {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  lastModified: Date;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`template-tabpanel-${index}`}
      aria-labelledby={`template-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    title: '',
    content: '',
    category: 'Email',
    tags: [],
    isFavorite: false,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, template: Template) => {
    setAnchorEl(event.currentTarget);
    setSelectedTemplate(template);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCreateTemplate = () => {
    // This would be replaced with an actual API call to create a template in Supabase
    // For now, just update the local state
    const newId = Math.max(...templates.map(t => t.id), 0) + 1;
    setTemplates([
      ...templates, 
      { 
        ...newTemplate as Template, 
        id: newId,
        lastModified: new Date()
      }
    ]);
    setOpenDialog(false);
    setNewTemplate({
      title: '',
      content: '',
      category: 'Email',
      tags: [],
      isFavorite: false,
    });
  };

  const handleToggleFavorite = (id: number) => {
    setTemplates(templates.map(template => 
      template.id === id 
        ? { ...template, isFavorite: !template.isFavorite }
        : template
    ));
  };

  React.useEffect(() => {
    // This would be replaced with an actual API call to fetch templates from Supabase
    // For example:
    // const fetchTemplates = async () => {
    //   try {
    //     const { data, error } = await supabaseClient.from('templates').select('*');
    //     if (error) throw error;
    //     setTemplates(data);
    //   } catch (err) {
    //     console.error('Failed to fetch templates');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // fetchTemplates();
    
    // For now, simulate API call with a timeout and mock data
    setTimeout(() => {
      const mockTemplates: Template[] = [
        {
          id: 1,
          title: 'Sales Follow-up',
          content: 'Hello {name},\n\nThank you for your interest in our products. I wanted to follow up on our conversation about {product}.\n\nDo you have any questions I can answer?\n\nBest regards,\n{sender}',
          category: 'Email',
          tags: ['sales', 'follow-up'],
          isFavorite: true,
          lastModified: new Date(2025, 4, 5) // May 5, 2025
        },
        {
          id: 2,
          title: 'Meeting Agenda',
          content: '# Meeting: {meeting_title}\n\n## Date: {date}\n\n## Attendees\n- {attendee1}\n- {attendee2}\n\n## Agenda\n1. Welcome and Introduction (5 min)\n2. Project Updates (15 min)\n3. Discussion Items (20 min)\n4. Action Items (10 min)\n5. Next Steps (10 min)\n',
          category: 'Meeting',
          tags: ['agenda', 'planning'],
          isFavorite: false,
          lastModified: new Date(2025, 4, 8) // May 8, 2025
        },
        {
          id: 3,
          title: 'Customer Support Response',
          content: 'Hello {customer_name},\n\nThank you for contacting our support team. We appreciate your patience.\n\nRegarding your issue with {issue_description}, we recommend the following steps:\n\n1. {step1}\n2. {step2}\n3. {step3}\n\nIf you continue to experience problems, please let us know.\n\nBest regards,\n{support_agent}\nCustomer Support Team',
          category: 'Email',
          tags: ['support', 'customer'],
          isFavorite: true,
          lastModified: new Date(2025, 4, 10) // May 10, 2025
        }
      ];
      
      setTemplates(mockTemplates);
      setLoading(false);
    }, 500);
  }, []);

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = ['All', 'Email', 'Meeting', 'Social Media', 'Other'];
  
  const categorizedTemplates = tabValue === 0 
    ? filteredTemplates 
    : filteredTemplates.filter(template => template.category === categories[tabValue]);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Content Templates
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create and manage reusable content templates for various communication needs.
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search templates..."
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
        <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ width: { xs: '100%', md: 'auto' } }}
          >
            Filter
          </Button>
        </Grid>
        <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleDialogOpen}
            sx={{ width: { xs: '100%', md: 'auto' } }}
          >
            New Template
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          {categories.map((category, idx) => (
            <Tab key={idx} label={category} />
          ))}
        </Tabs>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {categories.map((category, idx) => (
            <TabPanel key={idx} value={tabValue} index={idx}>
              {categorizedTemplates.length > 0 ? (
                <Grid container spacing={3}>
                  {categorizedTemplates.map((template) => (
                    <Grid item xs={12} sm={6} md={4} key={template.id}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="h6" component="div" noWrap sx={{ mb: 1 }}>
                              {template.title}
                            </Typography>
                            <Box sx={{ display: 'flex' }}>
                              <IconButton 
                                size="small" 
                                onClick={() => handleToggleFavorite(template.id)}
                                color={template.isFavorite ? 'warning' : 'default'}
                              >
                                {template.isFavorite ? <StarIcon /> : <StarOutlineIcon />}
                              </IconButton>
                              <IconButton size="small" onClick={(e) => handleMenuClick(e, template)}>
                                <MoreVertIcon />
                              </IconButton>
                            </Box>
                          </Box>
                          <Chip 
                            label={template.category} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                            sx={{ mb: 2 }}
                          />
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 2,
                              minHeight: '4em',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              whiteSpace: 'pre-line'
                            }}
                          >
                            {template.content}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                            {template.tags.map((tag, idx) => (
                              <Chip key={idx} label={tag} size="small" />
                            ))}
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Last modified: {new Date(template.lastModified).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button 
                            size="small" 
                            startIcon={<ContentCopyIcon />}
                            sx={{ mr: 1 }}
                          >
                            Use
                          </Button>
                          <Button 
                            size="small" 
                            startIcon={<EditIcon />}
                          >
                            Edit
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No templates found matching your criteria.
                  </Typography>
                </Paper>
              )}
            </TabPanel>
          ))}
        </>
      )}

      {/* Template options menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Duplicate</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Menu>

      {/* New Template Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Create New Template</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Template Title"
                fullWidth
                variant="outlined"
                value={newTemplate.title}
                onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                sx={{ mb: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                margin="dense"
                label="Category"
                fullWidth
                variant="outlined"
                value={newTemplate.category}
                onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
              >
                {categories.slice(1).map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Tags (comma separated)"
                fullWidth
                variant="outlined"
                placeholder="e.g. sales, follow-up"
                onBlur={(e) => {
                  if (e.target.value) {
                    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
                    setNewTemplate({...newTemplate, tags: tagsArray});
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Template Content"
                fullWidth
                multiline
                rows={10}
                variant="outlined"
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                placeholder="Enter your template content here. Use {variable} for placeholders."
                sx={{ mb: 1 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateTemplate}
            disabled={!newTemplate.title || !newTemplate.content}
          >
            Create Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Templates;
