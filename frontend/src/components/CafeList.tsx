import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography
} from '@mui/material';
import axios from 'axios';

interface Cafe {
  id: number;
  name: string;
  description: string;
  logo: string;
  location: string;
  employees: number;
}

const CafeList: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: cafes = [], isLoading } = useQuery<Cafe[]>({
    queryKey: ['cafes', location],
    queryFn: async () => {
      const response = await axios.get(
        location 
          ? `http://127.0.0.1:8000/api/cafes/?location=${location}`
          : 'http://127.0.0.1:8000/api/cafes/'
      );
      return response.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => 
      axios.delete(`http://127.0.0.1:8000/api/cafe/${id}/delete/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] });
      setDeleteDialogOpen(false);
      setSelectedCafe(null);
    }
  });

  const handleAddNew = () => {
    navigate('/cafes/add');
  };

  const handleEdit = (id: number) => {
    navigate(`/cafes/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    setSelectedCafe(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCafe) {
      deleteMutation.mutate(selectedCafe);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Cafes</Typography>
        <Button 
          onClick={handleAddNew}
          variant="contained" 
          color="primary"
        >
          Add New Cafe
        </Button>
      </Stack>

      <TextField
        label="Filter by location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        onClick={() => setLocation('')} 
        variant="contained" 
        color="secondary"
        sx={{ mb: 2 }}
      >
        Clear Filter
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logso</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Employees</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cafes.map((cafe: Cafe) => (
              <TableRow key={cafe.id}>
                <TableCell>
                  <img src={cafe.logo} alt={cafe.name} width="50" />
                </TableCell>
                <TableCell>{cafe.name}</TableCell>
                <TableCell>{cafe.description}</TableCell>
                <TableCell>{cafe.employees}</TableCell>
                <TableCell>{cafe.location}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button 
                      onClick={() => handleEdit(cafe.id)}
                      variant="contained" 
                      color="primary"
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button 
                      onClick={() => handleDelete(cafe.id)}
                      variant="contained" 
                      color="error"
                      size="small"
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this cafe?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CafeList;