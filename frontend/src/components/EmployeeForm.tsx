import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Typography, TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel } from '@mui/material';

const fetchEmployee = async (id: string) => {
  const response = await axios.get(`http://127.0.0.1:8000/api/employees/${id}/`);
  return response.data;
};

const fetchCafes = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/cafes/');
  return response.data;
};

const saveEmployee = async (data: any) => {
  console.log('Sending data:', data); // Debug print
  if (data.id) {
    return await axios.put(`http://127.0.0.1:8000/api/employees/update/${data.id}/`, data);
  } else {
    return await axios.post('http://127.0.0.1:8000/api/employees/create/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
const EmployeeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [cafe, setCafe] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: cafes = [] } = useQuery({
    queryKey: ['cafes'],
    queryFn: fetchCafes
  });

  const { data: employee, isLoading: isLoadingEmployee } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => fetchEmployee(id!),
    enabled: !!id
  });

  const mutation = useMutation({
    mutationFn: saveEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      navigate('/employees');
    },
    onError: (error) => {
      console.error('Error saving employee:', error);
    }
  });

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email_address);
      setPhoneNumber(employee.phone_number);
      setGender(employee.gender);
      setCafe(employee.cafe);
    }
  }, [employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name,
      email_address: email,
      phone_number: phoneNumber,
      gender,
      cafe,
    });
  };

  if (isLoadingEmployee) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h4">{id ? 'Edit Employee' : 'Add New Employee'}</Typography>
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
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="cafe-label">Assigned Café</InputLabel>
          <Select
            labelId="cafe-label"
            value={cafe}
            onChange={(e) => setCafe(e.target.value)}
          >
            {cafes.map((cafe: any) => (
              <MenuItem key={cafe.id} value={cafe.name}>
                {cafe.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={() => navigate('/employees')} variant="contained" color="secondary">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EmployeeForm;