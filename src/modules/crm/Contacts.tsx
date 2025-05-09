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
  IconButton,
  Chip,
  Avatar,
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

// Type definitions
type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: 'Lead' | 'Customer' | 'Prospect' | 'Churned';
  lastContact: string; // ISO Date string
  notes?: string;
  avatar?: string;
};

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    status: 'Lead',
    notes: ''
  });

  useEffect(() => {
    // This would be replaced with an actual API call to fetch contacts from Supabase
    // For example:
    // const fetchContacts = async () => {
    //   try {
    //     const { data, error } = await supabaseClient.from('contacts').select('*');
    //     if (error) throw error;
    //     setContacts(data);
    //     setFilteredContacts(data);
    //   } catch (err) {
    //     console.error('Failed to fetch contacts');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // fetchContacts();
    
    // For now, simulate API call with a timeout and mock data
    setTimeout(() => {
      const mockContacts: Contact[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567',
          company: 'Acme Inc.',
          position: 'CEO',
          status: 'Customer',
          lastContact: '2025-05-01T10:30:00Z',
          notes: 'Key decision maker',
          avatar: 'https://mui.com/static/images/avatar/1.jpg'
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '(555) 987-6543',
          company: 'XYZ Corp',
          position: 'Marketing Director',
          status: 'Lead',
          lastContact: '2025-04-28T14:15:00Z',
          notes: 'Interested in our premium plan',
          avatar: 'https://mui.com/static/images/avatar/2.jpg'
        },
        {
          id: 3,
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.j@example.com',
          phone: '(555) 456-7890',
          company: 'Global Solutions',
          position: 'CTO',
          status: 'Prospect',
          lastContact: '2025-05-05T09:00:00Z',
          notes: 'Follow up about technical requirements'
        },
        {
          id: 4,
          firstName: 'Sarah',
          lastName: 'Williams',
          email: 'swilliams@example.com',
          phone: '(555) 234-5678',
          company: 'Tech Innovations',
          position: 'Product Manager',
          status: 'Customer',
          lastContact: '2025-05-03T16:45:00Z'
        },
        {
          id: 5,
          firstName: 'Robert',
          lastName: 'Brown',
          email: 'rbrown@example.com',
          phone: '(555) 876-5432',
          company: 'Data Systems Inc.',
          position: 'Sales Director',
          status: 'Churned',
          lastContact: '2025-03-15T11:20:00Z',
          notes: 'Moved to competitor product'
        }
      ];
      
      setContacts(mockContacts);
      setFilteredContacts(mockContacts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = contacts.filter(contact => 
        contact.firstName.toLowerCase().includes(lowercasedSearch) ||
        contact.lastName.toLowerCase().includes(lowercasedSearch) ||
        contact.email.toLowerCase().includes(lowercasedSearch) ||
        contact.company.toLowerCase().includes(lowercasedSearch) ||
        contact.position.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchTerm, contacts]);

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

  const handleCreateContact = () => {
    // This would be replaced with an actual API call to create a contact in Supabase
    // For now, just update the local state
    const newId = Math.max(...contacts.map(c => c.id), 0) + 1;
    const newContactData: Contact = {
      ...newContact as any,
      id: newId,
      lastContact: new Date().toISOString()
    };
    
    setContacts([...contacts, newContactData]);
    setOpenDialog(false);
    setNewContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      status: 'Lead',
      notes: ''
    });
  };

  const handleContactChange = (field: keyof Contact, value: any) => {
    setNewContact({
      ...newContact,
      [field]: value
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lead':
        return 'primary';
      case 'Customer':
        return 'success';
      case 'Prospect':
        return 'info';
      case 'Churned':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Contacts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
        >
          Add Contact
        </Button>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search contacts..."
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
                  <TableCell>Email</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Contact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContacts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((contact) => (
                    <TableRow
                      key={contact.id}
                      hover
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            src={contact.avatar} 
                            sx={{ mr: 2 }}
                          >
                            {contact.firstName[0]}{contact.lastName[0]}
                          </Avatar>
                          <Typography>
                            {contact.firstName} {contact.lastName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{contact.position}</TableCell>
                      <TableCell>
                        <Chip 
                          label={contact.status} 
                          color={getStatusColor(contact.status) as any} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(contact.lastContact).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredContacts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No contacts found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredContacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      {/* New Contact Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="First Name"
                fullWidth
                variant="outlined"
                value={newContact.firstName}
                onChange={(e) => handleContactChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                value={newContact.lastName}
                onChange={(e) => handleContactChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                type="email"
                value={newContact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                value={newContact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company"
                fullWidth
                variant="outlined"
                value={newContact.company}
                onChange={(e) => handleContactChange('company', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Position"
                fullWidth
                variant="outlined"
                value={newContact.position}
                onChange={(e) => handleContactChange('position', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newContact.status}
                  label="Status"
                  onChange={(e) => handleContactChange('status', e.target.value)}
                >
                  <MenuItem value="Lead">Lead</MenuItem>
                  <MenuItem value="Prospect">Prospect</MenuItem>
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Churned">Churned</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={newContact.notes}
                onChange={(e) => handleContactChange('notes', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateContact}
            disabled={!newContact.firstName || !newContact.lastName || !newContact.email}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contacts;
