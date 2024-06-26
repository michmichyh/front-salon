import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login.js'; 
import Register from './components/Register/Register.js';
import Inicio from './components/Inicio/Inicio.js';
import Agendamientos from './components/Agendamientos/Agendamientos.js';
function AppRoutes() {
  return (
    <Router>
      <div className='Routes'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Agendamientos" element={<Agendamientos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;