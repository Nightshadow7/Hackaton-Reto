import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ingreso.css";
import logoOne from "../resources/logoComultrasan.png";
import logoTwo from "../resources/financiera_comultrasan.png";
import swal from "sweetalert2/src/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";

function Ingreso() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
        navigate('/Ingreso');
    }
  }, []);

  const InputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "correo") {
      setCorreo(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
  
    if (!correo.trim() || !password.trim()) {
      new swal({
        icon: "error",
        title: "Datos vacíos",
        text: "Por favor llena todos los datos",
      });
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:7000/api/auth", {
        correo,
        password,
      });
  
      if (response.data.usuario) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
  
        // Guardar el nombre del usuario en el localStorage
        localStorage.setItem("nombreUsuario", response.data.usuario.nombre);
  
        // Envía al admin a un dashboard diferente
<<<<<<< HEAD
        if (response.data.usuario.rol === "ENTIDAD") return navigate('/AdminDashboard');
  
=======
        if(response.data.usuario.rol === "ENTIDAD") return navigate('/AdminDashboard');

>>>>>>> 4fa80ac28fc0133400fa278da960bab64c4c7b70
        const imagenBase64 = response.data.usuario.imagen;
        localStorage.setItem("imagen", imagenBase64);
  
        navigate("/UserCuenta");
      } else {
        new swal({
          icon: "error",
          title: "Error de autenticación",
          text: "Usuario o contraseña incorrectos",
        });
      }
    } catch (error) {
      console.error(error);
      new swal({
        icon: "error",
        title: "Error de autenticación",
        text: "Ocurrió un error al autenticar. Inténtalo de nuevo.",
      });
    }
  };
  
  
  

  const NavigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="natvar">
        <div className="logo">
          <img src={logoOne} alt="#logo" className="logoImgOne" />
          <img src={logoTwo} alt="#logo" className="logoImgTwo" />
        </div>
        <div className="exit">
          <h1 className="x" onClick={NavigateHome}>
            X
          </h1>
        </div>
      </div>
      <div className="display">
        <div className="border">
          <div className="contain">
            <form className="block" onSubmit={onSubmit}>
              <h1 className="Ingreso">INGRESO</h1>
              <p className="subTitle">Correo</p> 
              <input
                type="text"
                className="Input"
                onChange={InputChange}
                value={correo}
                name="correo" 
              />
              <p className="subTitle">Contraseña</p> 
              <input
                type="password"
                className="Input"
                onChange={InputChange}
                value={password}
                name="password"
              />

              <div className="blockButtom">
                <button type="submit" className="submit">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ingreso;
