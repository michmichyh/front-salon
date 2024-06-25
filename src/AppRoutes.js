import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login.js'; 
import Register from './components/Register/Register.js';

function AppRoutes() {
  return (
    <Router>
      <div className='Routes'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />


        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;