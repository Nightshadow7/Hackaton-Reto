import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Formulario.css';

function Formulario() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/api/formulario')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del formulario', error);
      });
  }, []);

  return (
    <div>
      {data.map((documento, index) => (
        <div key={index} className="formulario">
          <Link to={`/editar-formulario/${index + 1}`}>
            <h2>Formulario {index + 1}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Formulario;


