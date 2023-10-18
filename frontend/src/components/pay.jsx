import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Pay = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const startScanner = async () => {
      const scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 500,
          height: 500,
        },
        fps: 2,
      });

      const success = (result) => {
        setScanResult(result);
        alert(result);
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

    startScanner();
  }, []);

  return (
    <>
      <h1>Escanea el código QR para hacer pagos</h1>
      {scanResult ? (
        <div>
          Success: <a href={"https://" + scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader"> </div>
      )}
    </>
  );
};

export default Pay;
