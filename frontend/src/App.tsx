import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CafeList from './components/CafeList';
import EmployeeList from './components/EmployeeList';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/" element={<CafeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;