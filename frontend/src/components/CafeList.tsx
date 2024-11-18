import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const CafeList: React.FC = () => {
  const [cafes, setCafes] = useState([]);
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchCafes();
  }, [location]);

  const fetchCafes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cafes/?location=${location}`);
      setCafes(response.data);
    } catch (error) {
      console.error('Error fetching cafes:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cafe/${id}/delete/`);
      fetchCafes();
    } catch (error) {
      console.error('Error deleting cafe:', error);
    }
  };

  return (
    <div>
      <h1>Cafes</h1>
      <TextField
        label="Filter by location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={() => setLocation('')} variant="contained" color="secondary">
        Clear Filter
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Employees</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cafes.map((cafe: any) => (
              <TableRow key={cafe.id}>
                <TableCell><img src={cafe.logo} alt={cafe.name} width="50" /></TableCell>
                <TableCell>{cafe.name}</TableCell>
                <TableCell>{cafe.description}</TableCell>
                <TableCell>{cafe.employees}</TableCell>
                <TableCell>{cafe.location}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(cafe.id)} variant="contained" color="secondary">
                    Delete
                  </Button>
                  {/* Add Edit button and link to Employee page */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary">Add New Cafe</Button>
    </div>
  );
};

export default CafeList;