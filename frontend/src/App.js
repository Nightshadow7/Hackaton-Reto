import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserN_Cuenta from './components/UserN-Cuenta';
import Ingreso from './components/Ingreso.jsx';
import Home from './components/Home.jsx';
import Plantilla from './components/Plantilla';
import EditPlantilla from './components/EditPlantilla';
import "./app.css"
import Pay from './components/pay';
import QRsDisponibles from './components/QRsDisponibles';
import Formulario from './components/Formulario';
import AdminDashboard from './components/AdminDashboard';
import Pagos from './components/Pagos';
import SaldoComponent from './components/Saldo';

function isUserLoggedIn() {
  const token = localStorage.getItem('token');
  return !!token; 
}

function ProtectedRoute({ element, path }) {
  if (path === '/Ingreso' || isUserLoggedIn()) {
    return element;
  } else {
    return <Navigate to="/UserCuenta" />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ingreso" element={<Ingreso />} />
        <Route path='/pagar' element={<Pay />} />
        <Route path='/codigos-qr' element={<QRsDisponibles />} />
        <Route path='/plantilla' element={<Plantilla />} />
        <Route path='/edit' element={<EditPlantilla />} />
        <Route path="/UserCuenta" element={<UserN_Cuenta />} />
        <Route path="/Formulario" element={<Formulario />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/Saldo" element={<SaldoComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
