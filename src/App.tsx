import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import Login from './modules/authentication/Login';
import Employees  from './components/employee/Employees';
import Departments from './components/department/Department';
import EmployeesDetail from './components/employee/EmployeesDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<Layout />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/department" element={<Departments />} />
          <Route path="/employee/:id" element={<EmployeesDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
