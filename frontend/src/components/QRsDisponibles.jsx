import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import QrScanner from "qr-scanner";
import QRItem from "./sub-componets/QRItem";
import axios from "axios";
import clipboard from "clipboardy";
import Swal from "sweetalert2";
import "./QRsDisponibles.css";

export default function QRsDisponibles() {
  const navigate = useNavigate();
  const [qrsPerUser, setQrsPerUser] = useState([]);
  const [qrViewer, setQrViewer] = useState("");
  const [linkPago, setLinkPago] = useState("");

  const downloadImg = (img) => {
    saveAs(img, "qr-code.jpg");
  };
  const navigateToLink = (img) => {
    QrScanner.scanImage(img).then((result) => setLinkPago(result));
    const newLink = linkPago.split("http://localhost:3000").pop();
    setLinkPago(newLink);
    navigate(`${newLink}`);
  };
  const copyLinkToClipboard = async  (img) => {
    let result = await QrScanner.scanImage(img);
    clipboard.write(result);
    Swal.fire(
      'Link copiado al portapapeles!',
      'HECHO',
      'success'
    )
  }

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/Ingreso");
    }
    axios
      .get(`http://localhost:7000/api/qrs/byUser/${usuario._id}`)
      .then(({ data }) => setQrsPerUser(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="qr-disponibles-container">
      <div className="qrs-disponibles">
        <div className="qr-up-btns">
          <button
            className="qr-volver-btn"
            onClick={() => navigate("/UserCuenta")}
          >
            Volver
          </button>
          <button
            className="qr-volver-btn"
            onClick={() => navigate("/Formulario")}
          >
            Añadir QR
          </button>
        </div>
        {qrsPerUser === false ? (
          <h2>Este usuario no tiene QR's registrados</h2>
        ) : (
          qrsPerUser.map((el, index) => (
            <>
              <QRItem
                key={index}
                nombre={el.nombre}
                cuentaDestino={el.cuentaDestino}
                qrViewerHandler={() => setQrViewer(el.imagen)}
              />
            </>
          ))
        )}
      </div>
      <div className="qr-viewer">
        <h2>Visualizador de QR's</h2>
        <img onClick={() => navigateToLink(qrViewer)} src={qrViewer} alt="" />
        {qrViewer ? (
          <div className="qr-viewer-buttons">
            <button onClick={() => downloadImg(qrViewer)}>Descargar!</button>
            <button onClick={() => copyLinkToClipboard(qrViewer)}>Link de pago</button>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
