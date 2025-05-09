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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// Mock template data
const templateCategories = [
  'Follow-up Emails',
  'Patient Communication',
  'Treatment Information',
  'Marketing Copy',
  'Objection Handling',
  'Call Scripts'
];

const initialTemplates = [
  {
    id: 1,
    title: 'Appointment Follow-up',
    content: "Dear [Patient Name],\n\nThank you for visiting [Practice Name] on [Date]. We hope your experience was positive.\n\n[Optional personalized note about treatment]\n\nIf you have any questions about your treatment or experience, please don't hesitate to contact us at [Phone Number].\n\nWe look forward to seeing you at your next appointment on [Next Appointment Date].\n\nBest regards,\n[Doctor Name]\n[Practice Name]",
    category: 'Follow-up Emails',
    tags: ['appointment', 'follow-up'],
    createdAt: new Date('2025-01-15')
  },
  {
    id: 2,
    title: 'Teeth Whitening Benefits',
    content: "Professional teeth whitening can provide numerous benefits:\n\n1. Enhanced appearance and improved smile\n2. Boosted self-confidence\n3. Removal of stubborn stains\n4. Quick and noticeable results\n5. Long-lasting effects with proper care\n\nOur professional whitening treatment is safe, effective, and customized to your specific needs. Results can last 1-3 years with proper maintenance.",
    category: 'Treatment Information',
    tags: ['cosmetic', 'whitening', 'benefits'],
    createdAt: new Date('2025-02-10')
  },
  {
    id: 3,
    title: 'New Technology Call Script',
    content: "Hello Dr. [Name],\n\nThis is [Your Name] from RepSpheres. I'm reaching out because we've recently launched a new imaging system that many practices like yours have found valuable.\n\nIt offers [key benefit 1] and [key benefit 2], which our clients have found helps them [specific outcome].\n\nI'd love to schedule a brief 15-minute demo to show you how it works. Would you have time this week for a quick conversation?\n\n[Handle objections as needed]\n\nThank you for your time, Dr. [Name].",
    category: 'Call Scripts',
    tags: ['sales call', 'technology', 'demo'],
    createdAt: new Date('2025-03-22')
  },
  {
    id: 4,
    title: 'Price Objection Response',
    content: "I understand your concern about the investment. Many of our clients initially had the same question.\n\nWhat they've found is that while there is an upfront cost of $[Amount], the system typically pays for itself within [Timeframe] through [Specific ROI mechanisms].\n\nFor example, Dr. Johnson at Riverdale Dental was able to [specific success story].\n\nWe also offer flexible financing options that allow you to spread the payments over [Terms], which many practices find makes the investment more manageable.",
    category: 'Objection Handling',
    tags: ['objection', 'price', 'value'],
    createdAt: new Date('2025-04-05')
  }
];

interface Template {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
}

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [isNewTemplate, setIsNewTemplate] = useState(true);

  // Dialog form state
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formTags, setFormTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleOpenNewDialog = () => {
    setCurrentTemplate(null);
    setFormTitle('');
    setFormContent('');
    setFormCategory(templateCategories[0]);
    setFormTags([]);
    setIsNewTemplate(true);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (template: Template) => {
    setCurrentTemplate(template);
    setFormTitle(template.title);
    setFormContent(template.content);
    setFormCategory(template.category);
    setFormTags([...template.tags]);
    setIsNewTemplate(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddTag = () => {
    if (newTag && !formTags.includes(newTag)) {
      setFormTags([...formTags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormTags(formTags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveTemplate = () => {
    if (!formTitle.trim() || !formContent.trim() || !formCategory) {
      return; // Simple validation
    }

    if (isNewTemplate) {
      // Create new template
      const newTemplate: Template = {
        id: Math.max(0, ...templates.map(t => t.id)) + 1,
        title: formTitle,
        content: formContent,
        category: formCategory,
        tags: formTags,
        createdAt: new Date()
      };
      setTemplates([...templates, newTemplate]);
    } else if (currentTemplate) {
      // Update existing template
      setTemplates(templates.map(template => 
        template.id === currentTemplate.id 
          ? { 
              ...template, 
              title: formTitle, 
              content: formContent,
              category: formCategory,
              tags: formTags
            } 
          : template
      ));
    }

    handleCloseDialog();
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
    // Could add a toast notification here
  };

  // Filter templates based on search term and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'All' || template.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
          Templates Library
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenNewDialog}
        >
          New Template
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="category-filter-label">
                <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
                Category
              </InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="All">All Categories</MenuItem>
                {templateCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {filteredTemplates.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No templates found matching your criteria.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredTemplates.map(template => (
            <Grid item xs={12} md={6} key={template.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {template.title}
                    </Typography>
                    <Chip 
                      label={template.category} 
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 2,
                    maxHeight: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {template.content}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    {template.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary">
                    Created: {template.createdAt.toLocaleDateString()}
                  </Typography>
                </CardContent>
                
                <Divider />
                
                <CardActions>
                  <IconButton 
                    size="small" 
                    title="Copy template"
                    onClick={() => handleCopyTemplate(template.content)}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    title="Edit template" 
                    onClick={() => handleOpenEditDialog(template)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    title="Delete template"
                    onClick={() => handleDeleteTemplate(template.id)}
                    color="error"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Template Form Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {isNewTemplate ? 'Create New Template' : 'Edit Template'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Template Title"
            type="text"
            fullWidth
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel id="template-category-label">Category</InputLabel>
            <Select
              labelId="template-category-label"
              id="template-category"
              value={formCategory}
              label="Category"
              onChange={(e) => setFormCategory(e.target.value)}
            >
              {templateCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Template Content"
            multiline
            rows={10}
            fullWidth
            value={formContent}
            onChange={(e) => setFormContent(e.target.value)}
            margin="dense"
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
              {formTags.map((tag, index) => (
                <Chip 
                  key={index} 
                  label={tag} 
                  size="small"
                  onDelete={() => handleRemoveTag(tag)}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                label="Add tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button 
                variant="outlined" 
                onClick={handleAddTag}
                disabled={!newTag}
              >
                Add
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveTemplate} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Templates;
