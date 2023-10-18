import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../resources/header.jpg";
import "./userN-Cuenta.css";
import axios from "axios";

function UserN_Cuenta() {
  const [accountsData, setAccountsData] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("userImage");
    localStorage.removeItem("usuario");
    navigate("/Ingreso");
  };

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/Ingreso");
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setAccountsData(usuario.cuentasAhorro);
  }, []);

  const handleAccountClick = (account) => {
    setSelectedAccount(account);
  };

  const navigateQr = () => {
    navigate("/codigos-qr");
  };

  return (
    <div className="user-cuenta-container">
      <div className="user-section">
        <div className="user-header">
          <div className="user-logo">
            <img src={image} className="userImage" alt="User" />
          </div>
          <div className="user-info">
            <h2 className="white">User Information</h2>
            <p className="white">User: {localStorage.getItem("userName")}</p>
          </div>
        </div>
        {selectedAccount ? (
          <div className="account-details">
            <h2>Account Details</h2>
            <p>Account Number: {selectedAccount.numeroCuenta}</p>
            <p>Balance: {selectedAccount.saldo}</p>
          </div>
        ) : null}
        <div className="logout-button">
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
      <div className="account-list-scroll">
        {accountsData.length > 0 ? (
          accountsData.map((account, index) => (
            <div
              key={index}
              className={`account-card account-item ${
                selectedAccount &&
                selectedAccount.numeroCuenta === account.numeroCuenta
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleAccountClick(account)}
            >
              Cuenta {account.numeroCuenta}
            </div>
          ))
        ) : (
          <p>No se encontraron cuentas de ahorro.</p>
        )}
      </div>
    </div>
  );
}

export default UserN_Cuenta;
