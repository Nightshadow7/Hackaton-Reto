import React, { useEffect, useState, useRef  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Pagos.css";

export default function Pagos() {
  const { id } = useParams();
  const [apiData, setApiData] = useState({});
  const formData = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const body = {};
    for (const [key, value] of form.entries()) {
      body[key] = value;
    }
    localStorage.setItem('payment-info', JSON.stringify(body));
    navigate('/Saldo');
  }

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/qrs/${id}`)
      .then((res) => setApiData(res.data))
      .then(() => console.log(apiData))
      .catch((err) => console.log(err));
  }, []);

  const { plantilla, usuario } = apiData;
  if (usuario == undefined) {
    return <>Loading...</>;
  }

  return (
    <div className="pago-container">
      <div className="formulario-pago">
        <h4>Hacer consignación a {usuario.nombre}</h4>
        <h2>{plantilla.nombre}</h2>
        <form ref={formData} onSubmit={(e) => handleSubmit(e)}>
          {plantilla.campos.map((element, index) => (
            <div className="input-group">
              <label htmlFor={element.titulo}>{element.titulo}</label>
              <input
                id={element.titulo}
                name={element.titulo}
                key={index}
                type={element.tipo}
                required={element.requerido}
              />
            </div>
          ))}
          <button type="button" className="pagos-btn">PSE</button>
          <button type="submit" className="pagos-btn">FC</button>
        </form>
      </div>
    </div>
  );
}
