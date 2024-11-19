import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CafeList from './components/CafeList';
import CafeForm from './components/CafeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/cafes" element={<CafeList />} />
        <Route path="/cafes/add" element={<CafeForm />} />
        <Route path="/cafes/edit/:id" element={<CafeForm />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/add" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeForm />} />
        <Route path="/" element={<CafeList />} />
      </Routes>
    </Router>
  );
};

export default App;