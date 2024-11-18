import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, RadioGroup, FormControlLabel, Radio, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import ReusableTextbox from './ReusableTextbox';

const EmployeeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [cafe, setCafe] = useState('');
  const [cafes, setCafes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchCafes();
    if (id) {
      setIsEditing(true);
      fetchEmployee(id);
    }
  }, [id]);

  const fetchCafes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cafes/');
      console.log('Fetched cafes:', response.data); // Log the fetched data
      setCafes(response.data);
    } catch (error: any) {
      console.error('Error fetching cafes:', error.response ? error.response.data : error.message);
    }
  };

  const fetchEmployee = async (id: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/employees/${id}/`);
      const employee = response.data;
      setName(employee.name);
      setEmail(employee.email_address);
      setPhoneNumber(employee.phone_number);
      setGender(employee.gender);
      setCafe(employee.cafe);
    } catch (error: any) {
      console.error('Error fetching employee:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const employeeData = {
      name,
      email_address: email,
      phone_number: phoneNumber,
      gender,
      cafe,
    };

    try {
      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/employees/${id}/`, employeeData);
      } else {
        await axios.post('http://127.0.0.1:8000/api/employees/', employeeData);
      }
      navigate('/employees');
    } catch (error: any) {
      console.error('Error saving employee:', error.response ? error.response.data : error.message);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div>
      <Typography variant="h4">{isEditing ? 'Edit Employee' : 'Add New Employee'}</Typography>
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
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <ReusableTextbox
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
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
        <Button onClick={handleCancel} variant="contained" color="secondary">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EmployeeForm;