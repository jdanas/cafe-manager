import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import CafeList from './components/CafeList';
import EmployeeList from './components/EmployeeList';
import CafeForm from './components/CafeForm';
import EmployeeForm from './components/EmployeeForm';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Routes>
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/cafes/add" element={<CafeForm />} />
          <Route path="/cafes/edit/:id" element={<CafeForm />} />
          <Route path="/employees/add" element={<EmployeeForm />} />
          <Route path="/employees/edit/:id" element={<EmployeeForm />} />
          <Route path="/" element={<CafeList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;