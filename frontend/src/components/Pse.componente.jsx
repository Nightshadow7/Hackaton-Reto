import React, { useState, useEffect } from 'react';

function PSEComponent({ saldo, cantidadAPagar, onAmountChange, onPaymentResult }) {
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const realizarPago = () => {
    if (parseFloat(cantidadAPagar) <= 0) {
      setError('La cantidad a pagar debe ser mayor que cero.');
      return;
    }

    if (parseFloat(cantidadAPagar) <= saldo) {
      setIsPaying(true);

      // Simulación de PSE: generando un resultado aleatorio (éxito o falla)
      const pagoExitoso = Math.random() < 0.5; // 50% de probabilidad de éxito

      setTimeout(() => {
        setIsPaying(false);
        if (pagoExitoso) {
          const nuevoSaldo = saldo - parseFloat(cantidadAPagar);
          onPaymentResult({ success: true, newSaldo: nuevoSaldo });
        } else {
          onPaymentResult({ success: false, message: 'Pago por PSE rechazado. Inténtalo de nuevo más tarde.' });
        }
      }, 1500);
    } else {
      setError('Saldo insuficiente para realizar el pago por PSE.');
    }
  };

  return (
    <div className="pse-container">
      <h3>Pago por PSE</h3>
      <input
        type="number"
        value={cantidadAPagar}
        onChange={(e) => {
          setError('');
          onPaymentResult({}); // Limpiar resultados previos al cambiar el monto
          onAmountChange(e.target.value); // Llamar a la función onAmountChange
        }}
        placeholder="Ingrese la cantidad a pagar"
        disabled={isPaying}
      />
      <button onClick={realizarPago} disabled={isPaying}>
        Pagar por PSE
      </button>
      {isPaying && <p>Realizando pago por PSE...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default PSEComponent;
