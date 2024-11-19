import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Typography, TextField, Button } from '@mui/material';

const fetchCafe = async (id: string) => {
  const response = await axios.get(`http://127.0.0.1:8000/api/cafes/${id}/`);
  return response.data;
};

const saveCafe = async (data: any) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  if (data.logo) formData.append('logo', data.logo);
  formData.append('location', data.location);

  if (data.id) {
    await axios.put(`http://127.0.0.1:8000/api/cafes/${data.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    await axios.post('http://127.0.0.1:8000/api/cafes/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

const CafeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: cafe, isLoading } = useQuery(['cafe', id], () => fetchCafe(id!), {
    enabled: !!id,
  });

  const mutation = useMutation(saveCafe, {
    onSuccess: () => {
      queryClient.invalidateQueries('cafes');
      navigate('/cafes');
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (logo) formData.append('logo', logo);
    formData.append('location', location);

    mutation.mutate({ id, name, description, logo, location });
  };

  useEffect(() => {
    if (cafe) {
      setName(cafe.name);
      setDescription(cafe.description);
      setLocation(cafe.location);
    }
  }, [cafe]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h4">{id ? 'Edit Café' : 'Add New Café'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="file"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
              setLogo(target.files[0]);
            } else {
              setLogo(null);
            }
          }}
          inputProps={{ accept: 'image/*' }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={() => navigate('/cafes')} variant="contained" color="secondary">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default CafeForm;