import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/employees/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/employee/${id}/delete/`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleAddNewEmployee = () => {
    navigate('/employees/add');
  };

  return (
    <div>
      <h1>Employees</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Days Worked</TableCell>
              <TableCell>Cafe Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee: any) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email_address}</TableCell>
                <TableCell>{employee.phone_number}</TableCell>
                <TableCell>{employee.days_worked}</TableCell>
                <TableCell>{employee.cafe}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(employee.id)} variant="contained" color="secondary">
                    Delete
                  </Button>
                  {/* Add Edit button */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleAddNewEmployee} variant="contained" color="primary">
        Add New Employee
      </Button>
    </div>
  );
};

export default EmployeeList;