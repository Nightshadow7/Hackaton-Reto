import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./Pay.css"; 

const Pay = () => {
  const [scanResult, setScanResult] = useState(null);

  const startScanner = async () => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 500,
        height: 500,
      },
      fps: 2,
    }, false);

    const success = (result) => {
      setScanResult(result);
      scanner.clear(); // Detener el escaneo después de encontrar un código QR
    };

    const error = (err) => {
      console.warn(err);
    };

    try {
      await scanner.render(success, error);
    } catch (e) {
      console.error(e);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    startScanner(); // Reinicia el escáner
  };

  useEffect(() => {
    startScanner();
  }, []);

  return (
    <div className="container">
      <h1>Escanea el código QR para hacer pagos</h1>
      <div id="reader"> </div>
      {scanResult ? (
        <div className="result">
          Success: <a href={"https://" + scanResult}>{scanResult}</a>
        </div>
      ) : null}
      {scanResult && (
        <button className="reset-button" onClick={resetScanner}>
          Reiniciar
        </button>
      )}
    </div>
  );
};

export default Pay;
