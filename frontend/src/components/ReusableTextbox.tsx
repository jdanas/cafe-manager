import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import ReusableTextbox from './ReusableTextbox';

const CafeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [location, setLocation] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchCafe(id);
    }
  }, [id]);

  const fetchCafe = async (id: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cafes/${id}/`);
      const cafe = response.data;
      setName(cafe.name);
      setDescription(cafe.description);
      setLocation(cafe.location);
    } catch (error) {
      console.error('Error fetching cafe:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (logo) formData.append('logo', logo);
    formData.append('location', location);

    try {
      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/cafes/${id}/`, formData);
      } else {
        await axios.post('http://127.0.0.1:8000/api/cafe/', formData);
      }
      navigate('/cafes');
    } catch (error) {
      console.error('Error saving cafe:', error);
    }
  };

  const handleCancel = () => {
    navigate('/cafes');
  };

  return (
    <div>
      <Typography variant="h4">{isEditing ? 'Edit Café' : 'Add New Café'}</Typography>
      <form onSubmit={handleSubmit}>
        <ReusableTextbox
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={6}
          maxLength={10}
          required
        />
        <ReusableTextbox
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={256}
          required
        />
        <TextField
          type="file"
          onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
          inputProps={{ accept: 'image/*', maxSize: 2 * 1024 * 1024 }}
          fullWidth
          margin="normal"
        />
        <ReusableTextbox
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={handleCancel} variant="contained" color="secondary">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default CafeForm;