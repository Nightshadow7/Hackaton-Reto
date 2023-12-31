import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import image from "../resources/header.jpg";
import "./userN-Cuenta.css";


function UserNCuenta() {
  const [accountsData, setAccountsData] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("userImage");
    localStorage.removeItem("nombreUsuario");
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
          <div >
            <div className="user-logo">
            <img src={image} className="userImage" alt="User" />
            </div>
            

          </div>
          <div className="user-info">
  {localStorage.getItem("usuario") ? (
    <>
      <h2 className="white">{JSON.parse(localStorage.getItem("usuario")).rol}</h2>
      <p>{JSON.parse(localStorage.getItem("usuario")).nombre}</p>
      <p>{JSON.parse(localStorage.getItem("usuario")).numeroDocumento}</p>
    </>
  ) : (
    <p className="white">Usuario no encontrado en el almacenamiento local</p>
  )}
</div>

        </div>
        {selectedAccount ? (
          <div className="account-details">
            <h2>Account Details</h2>
            <p>Account Number: {selectedAccount.numeroCuenta}</p>
            <p>Balance: ${selectedAccount.saldo.toLocaleString()}</p>
          </div>
        ) : null}
        <div className="logout-button">
          <button onClick={handleLogout} >Cerrar Sesión</button>
        </div>
        <div className="btn-qr">
          <button onClick={navigateQr} >Códigos QR</button>
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

export default UserNCuenta;
