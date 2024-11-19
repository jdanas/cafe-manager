import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import CafeList from './components/CafeList';
import CafeForm from './components/CafeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4, // padding top & bottom
          px: 2,  // padding left & right
          mt: 2   // margin top
        }}
      >
        <Routes>
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/cafes/add" element={<CafeForm />} />
          <Route path="/cafes/edit/:id" element={<CafeForm />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<EmployeeForm />} />
          <Route path="/employees/edit/:id" element={<EmployeeForm />} />
          <Route path="/" element={<CafeList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;