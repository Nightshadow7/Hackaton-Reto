import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Saldo.css'; 
import { useNavigate } from 'react-router-dom';

function SaldoComponent() {
  const [usuario, setUsuario] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [accountsData, setAccountsData] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [cantidadAPagar, setCantidadAPagar] = useState('');
  const [saldo, setSaldoCuentaSeleccionada] = useState(0);
  const [error, setError] = useState('');
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [saldoCuenta, setSaldoCuenta] = useState(0);
  const [idCuenta, setIdCuenta] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nombre = localStorage.getItem('nombreUsuario');
    setNombreUsuario(nombre);

    // Obtener el usuario almacenado en el localStorage
    const usuarioLocalStorage = JSON.parse(localStorage.getItem('usuario'));

    if (usuarioLocalStorage) {
      setUsuario(usuarioLocalStorage);
      setAccountsData(usuarioLocalStorage.cuentasAhorro);

      if (usuarioLocalStorage.cuentasAhorro.length > 0) {
        const primeraCuenta = usuarioLocalStorage.cuentasAhorro[0];
        setSelectedAccountId(primeraCuenta._id);
        setSaldoCuentaSeleccionada(primeraCuenta.saldo);
        setNumeroCuenta(primeraCuenta.numeroCuenta);
        setSaldoCuenta(primeraCuenta.saldo);
        setIdCuenta(primeraCuenta._id);
      }
    } else {
      // Si el usuario no se encuentra en el localStorage, realiza una solicitud para obtenerlo
      axios.get(`http://localhost:7000/api/usuarios?nombre=${nombre}`)
        .then((response) => {
          const data = response.data;
          if (data && Array.isArray(data) && data.length > 0) {
            setUsuario(data[0]);
            const cuentasUsuario = data[0].cuentasAhorro;
            setAccountsData(cuentasUsuario);

            if (cuentasUsuario.length > 0) {
              const primeraCuenta = cuentasUsuario[0];
              setSelectedAccountId(primeraCuenta._id);
              setSaldoCuentaSeleccionada(primeraCuenta.saldo);
              setNumeroCuenta(primeraCuenta.numeroCuenta);
              setSaldoCuenta(primeraCuenta.saldo);
              setIdCuenta(primeraCuenta._id);
            }
            localStorage.setItem('usuario', JSON.stringify(data[0]));
          }
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario', error);
        });
    }
  }, [nombreUsuario]);

  useEffect(() => {
    if (selectedAccountId) {
      axios.get(`http://localhost:7000/api/saldo?cuenta=${selectedAccountId}`)
        .then((response) => {
          const saldoActualizado = response.data.saldo;
          setSaldoCuentaSeleccionada(saldoActualizado);
        })
        .catch((error) => {
          console.error('Error al obtener el saldo', error);
        });
    }
  }, [selectedAccountId]);

  const handleAccountClick = (account) => {
    setSelectedAccountId(account._id);
    setSaldoCuentaSeleccionada(account.saldo);
    setNumeroCuenta(account.numeroCuenta);
    setSaldoCuenta(account.saldo);
    setIdCuenta(account._id);
  };

  const handleCantidadChange = (event) => {
    setError('');
    const nuevaCantidad = event.target.value;
    setCantidadAPagar(nuevaCantidad);
    
  };
  const realizarPago = () => {
    if (parseFloat(cantidadAPagar) <= 0) {
      console.log('La cantidad a pagar debe ser mayor que cero.');
      setError('La cantidad a pagar debe ser mayor que cero.');
      return;
    }
  
    if (selectedAccountId && parseFloat(cantidadAPagar) <= saldo) {
      console.log('Realizando el pago...');
  
      axios
        .post(`http://localhost:7000/api/pagos/procesar-pago`, {
          numeroCuenta: numeroCuenta,
          saldo: saldo,
          _id: idCuenta,
          cantidadAPagar: cantidadAPagar,
        })
        .then((response) => {
          console.log('Pago exitoso. Respuesta del servidor:', response.data);
  
          const nuevoSaldo = response.data.user.cuentasAhorro.find(cuenta => cuenta._id === idCuenta).saldo;
          console.log('Nuevo saldo después del pago:', nuevoSaldo);
  
          setSaldoCuentaSeleccionada(nuevoSaldo);
          setError('Pago exitoso.');
          setCantidadAPagar('');

          navigate('/Ingreso');     
           })
        .catch((error) => {
          console.error('Error al procesar el pago', error);
          setError('Error al procesar el pago.');
        });
    } else {
      console.log('Saldo insuficiente para realizar el pago.');
      setError('Saldo insuficiente para realizar el pago.');
    }
  }
  
  

  return (
    <div className="container my-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Bienvenido, {nombreUsuario}</h2>
        <h4 className="mb-3">Saldo Actual: ${saldo.toLocaleString()}</h4>
        <div className="account-list-scroll">
          {accountsData.length > 0 ? (
            accountsData.map((account, index) => (
              <div
                key={index}
                className={`account-card account-item mb-2 ${
                  selectedAccountId === account._id ? 'selected' : ''
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
        <div className="payment-container">
  <p>¿Quieres pagar?</p>
  <input
    type="number"
    value={cantidadAPagar}
    onChange={handleCantidadChange}
    placeholder="Ingrese la cantidad a pagar"
  />
  <button onClick={realizarPago}>Pagar</button>
  {error && <p className="error-message">{error}</p>}
</div>

      </div>
    </div>
  );
}


export default SaldoComponent;