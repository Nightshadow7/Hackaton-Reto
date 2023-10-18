import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const RutaProtegida = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token');
  const isLoginPage = rest.path === '/Ingreso'; 

  return (
    <Route
      {...rest}
      element={
        (isLoginPage || (token )) ? (
          <Element />
        ) : (
          <Navigate to="/Ingreso" replace />
        )
      }
    />
  );
};

export default RutaProtegida;
