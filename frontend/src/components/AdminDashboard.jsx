import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../resources/header.jpg";
import "./adminDashboard.css"
import lupa from '../resources/busqueda-de-lupa.png'
import axios from 'axios'


const getUser = async () => {
  const url = "http://localhost:7000/api/usuarios"

  try {
    const response = await axios.get(url, {
      headers: {
        'content-Type': 'application/json',

      }
    });
    return response
  } catch (error) {
    console.log(error)
  }
}


const userGet = await getUser()

export default function AdminDashboard() {
  const navigate = useNavigate();




  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      return navigate("/Ingreso");
    }
    if (usuario.rol !== "ENTIDAD") {
      return navigate("/UserCuenta");
    }
  }, []);





  const [User, setUser] = useState(userGet.data)



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("userImage");
    localStorage.removeItem("usuario");
    navigate("/Ingreso");
  };



  const [lupaData, setlupaData] = useState("")
  const onChange = async (event) => {
    event.preventDefault()
    const target = event.target;
    const value = target.value;
    setlupaData(value)

  }

  const onsubmit = (event) => {
    event.preventDefault()


    const urlBusqueda = `http://localhost:7000/api/usuario/${""}`
    const search = axios.get(urlBusqueda, {
      headers: {
        'content-Type': 'application/json',
      }
    });
  }

  const [InfoData, setInfoData] = useState({})

  const info = async (event) => {
    event.preventDefault()
    const id = event.target.id
    console.log(id)

    const urlInfo = `http://localhost:7000/api/usuarios/${id}`
    const search = await axios.get(urlInfo, {
      headers: {
        'content-Type': 'application/json',
      }
    });
    setInfoData(search.data)
  }

  


  return (
    <div className="user-cuenta-container">
      <div className="userSection">
        <div className="headInfo">
          <div className="user-header">
            <div>
              <div className="user-logo">
                <img src={image} className="userImage" alt="User" />
              </div>
            </div>
            <div className="user-info">
              <h2 className="white">{usuario.rol}</h2>
              <p className="white">User: {usuario.nombre}</p>
              <p className="white">documeto: {usuario.numeroDocumento}</p>
            </div>
          </div>
          <div className="bottoms">
            <button className="bootom Csecion" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
        <div className="bloqueo">
          <form className="busqueda" onSubmit={onsubmit}>
            <img src={lupa} className="lupa" alt="lupa" />
            <input type="number" className="input" placeholder="Numero de identidad" onChange={onChange} />
            <button type="submit" className="submitSave">Buscar</button>
          </form>
          <div className="lista">
            {
              User.map(us => (
                <div className="seccionUserDocument" id={us._id} onClick={info}>
                  <h1 className="documento">{us.numeroDocumento}</h1>
                  <h1 className="activo">activo</h1>
                </div>
              ))
            }
          </div>
          <div className="user">
          </div>
        </div>
      </div>
      <div className="FuntionSeccion">
        <div className="headerFuntions">
          <div className="informacion">informacion</div>
          {/* <div className="hisMovimientos">Cuentas</div> */}
          <div className="plantillas">+ plantillas</div>
        </div>
        <div className="data">
            {<>
              
              <h1>Nombre: {InfoData.nombre}</h1>
              <h3>correo: {InfoData.correo}</h3>
              <h3>documento: {InfoData.tipoDocumento}</h3>
              <h3>No.identidad: {InfoData.numeroDocumento}</h3>
            </>
            }
        </div>
      </div>
    </div>
  );
}
