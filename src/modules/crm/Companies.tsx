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
  Button,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';

// Type definitions
type Company = {
  id: number;
  name: string;
  industry: string;
  size: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  status: 'Active' | 'Prospect' | 'Inactive' | 'Former';
  location: string;
  website: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  notes?: string;
  createdAt: string; // ISO Date string
};

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    name: '',
    industry: '',
    size: 'Small',
    status: 'Prospect',
    location: '',
    website: '',
    contactPerson: '',
    phone: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    // This would be replaced with an actual API call to fetch companies from Supabase
    // For now, simulate API call with a timeout and mock data
    setTimeout(() => {
      const mockCompanies: Company[] = [
        {
          id: 1,
          name: 'Acme Inc.',
          industry: 'Manufacturing',
          size: 'Large',
          status: 'Active',
          location: 'New York, NY',
          website: 'https://acme.example.com',
          contactPerson: 'John Doe',
          phone: '(555) 123-4567',
          email: 'info@acme.example.com',
          notes: 'Long-term client since 2021',
          createdAt: '2023-02-15T10:30:00Z'
        },
        {
          id: 2,
          name: 'Tech Innovations',
          industry: 'Technology',
          size: 'Medium',
          status: 'Active',
          location: 'San Francisco, CA',
          website: 'https://techinnovations.example.com',
          contactPerson: 'Sarah Williams',
          phone: '(555) 234-5678',
          email: 'contact@techinnovations.example.com',
          createdAt: '2023-06-22T14:15:00Z'
        },
        {
          id: 3,
          name: 'Global Solutions',
          industry: 'Consulting',
          size: 'Enterprise',
          status: 'Prospect',
          location: 'Chicago, IL',
          website: 'https://globalsolutions.example.com',
          contactPerson: 'Michael Johnson',
          phone: '(555) 456-7890',
          email: 'info@globalsolutions.example.com',
          notes: 'Interested in our premium services',
          createdAt: '2024-01-05T09:00:00Z'
        },
        {
          id: 4,
          name: 'Data Systems Inc.',
          industry: 'Information Technology',
          size: 'Small',
          status: 'Inactive',
          location: 'Austin, TX',
          website: 'https://datasystems.example.com',
          contactPerson: 'Robert Brown',
          phone: '(555) 876-5432',
          email: 'contact@datasystems.example.com',
          notes: 'On hold due to budget constraints',
          createdAt: '2022-11-10T16:45:00Z'
        },
        {
          id: 5,
          name: 'XYZ Corp',
          industry: 'Marketing',
          size: 'Medium',
          status: 'Former',
          location: 'Los Angeles, CA',
          website: 'https://xyzcorp.example.com',
          contactPerson: 'Jane Smith',
          phone: '(555) 987-6543',
          email: 'info@xyzcorp.example.com',
          notes: 'Former client, potential for reengagement',
          createdAt: '2021-08-15T11:20:00Z'
        }
      ];
      
      setCompanies(mockCompanies);
      setFilteredCompanies(mockCompanies);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = companies.filter(company => 
        company.name.toLowerCase().includes(lowercasedSearch) ||
        company.industry.toLowerCase().includes(lowercasedSearch) ||
        company.location.toLowerCase().includes(lowercasedSearch) ||
        (company.contactPerson && company.contactPerson.toLowerCase().includes(lowercasedSearch))
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies(companies);
    }
  }, [searchTerm, companies]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCreateCompany = () => {
    // This would be replaced with an actual API call to create a company in Supabase
    // For now, just update the local state
    const newId = Math.max(...companies.map(c => c.id), 0) + 1;
    const newCompanyData: Company = {
      ...newCompany as any,
      id: newId,
      createdAt: new Date().toISOString()
    };
    
    setCompanies([...companies, newCompanyData]);
    setOpenDialog(false);
    setNewCompany({
      name: '',
      industry: '',
      size: 'Small',
      status: 'Prospect',
      location: '',
      website: '',
      contactPerson: '',
      phone: '',
      email: '',
      notes: ''
    });
  };

  const handleCompanyChange = (field: keyof Company, value: any) => {
    setNewCompany({
      ...newCompany,
      [field]: value
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Prospect':
        return 'primary';
      case 'Inactive':
        return 'warning';
      case 'Former':
        return 'error';
      default:
        return 'default';
    }
  };

  const getSizeColor = (size: string) => {
    switch (size) {
      case 'Small':
        return 'info';
      case 'Medium':
        return 'primary';
      case 'Large':
        return 'secondary';
      case 'Enterprise':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Companies</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
        >
          Add Company
        </Button>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search companies..."
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
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Industry</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Contact Person</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCompanies
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((company) => (
                    <TableRow
                      key={company.id}
                      hover
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography>
                            {company.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.location}</TableCell>
                      <TableCell>
                        <Chip 
                          label={company.size} 
                          color={getSizeColor(company.size) as any} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={company.status} 
                          color={getStatusColor(company.status) as any} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{company.contactPerson}</TableCell>
                    </TableRow>
                  ))}
                {filteredCompanies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No companies found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCompanies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      {/* New Company Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Company Name"
                fullWidth
                variant="outlined"
                value={newCompany.name}
                onChange={(e) => handleCompanyChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Industry"
                fullWidth
                variant="outlined"
                value={newCompany.industry}
                onChange={(e) => handleCompanyChange('industry', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Size</InputLabel>
                <Select
                  value={newCompany.size}
                  label="Size"
                  onChange={(e) => handleCompanyChange('size', e.target.value)}
                >
                  <MenuItem value="Small">Small</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Large">Large</MenuItem>
                  <MenuItem value="Enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newCompany.status}
                  label="Status"
                  onChange={(e) => handleCompanyChange('status', e.target.value)}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Prospect">Prospect</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Former">Former</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                fullWidth
                variant="outlined"
                value={newCompany.location}
                onChange={(e) => handleCompanyChange('location', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                fullWidth
                variant="outlined"
                value={newCompany.website}
                onChange={(e) => handleCompanyChange('website', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Person"
                fullWidth
                variant="outlined"
                value={newCompany.contactPerson}
                onChange={(e) => handleCompanyChange('contactPerson', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                value={newCompany.phone}
                onChange={(e) => handleCompanyChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                type="email"
                value={newCompany.email}
                onChange={(e) => handleCompanyChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={newCompany.notes}
                onChange={(e) => handleCompanyChange('notes', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateCompany}
            disabled={!newCompany.name || !newCompany.industry || !newCompany.location}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Companies;
