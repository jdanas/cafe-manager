import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';
import ReusableTextbox from './ReusableTextbox';

const CafeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [location, setLocation] = useState('');
  const isEditing = false; // Replace with actual logic to determine if editing
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Add your form submission logic here
    try {
      // Example: await saveCafe({ name, description, logo, location });
      console.log('Cafe saved successfully');
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
          onChange={(e) => setLogo((e.target as HTMLInputElement).files ? (e.target as HTMLInputElement).files[0] : null)}
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