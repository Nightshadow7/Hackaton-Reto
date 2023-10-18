import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ingreso.css"
import logoOne from "../resources/logoComultrasan.png"
import logoTwo from "../resources/financiera_comultrasan.png"
import swal from 'sweetalert2/src/sweetalert2.js';
import "sweetalert2/dist/sweetalert2.css";

function Ingreso() {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const InputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === 'user') {
            setUser(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (password !== "") {

            if (user !== "") {

                const dataJSON = {
                    "user": user,
                    "password": password
                }
            navigate('/home')
                console.log(dataJSON)
            } else {
                new swal({
                    icon: 'error',
                    title: 'Datos vacios',
                    text: 'porfavor llena todos los datos'
                });
            }

        } else {

            new swal({
                icon: 'error',
                title: 'Datos vacios',
                text: 'porfavor llena todos los datos'
            });
        }

    }






const NavigateHome = () => {
    navigate("/")
}

return (
    <>
        <div className="natvar">
            <div className="logo">
                <img src={logoOne} alt="#logo" className="logoImgOne" />
                <img src={logoTwo} alt="#logo" className="logoImgTwo" />
            </div>
            <div className="exit">
                <h1 className="x" onClick={NavigateHome}>X</h1>
            </div>
        </div>
        <div className="display">
            <div className="border">
                <div className="contain">
                    <form className="block" onSubmit={onSubmit}>
                        <h1 className="Ingreso">INGRESO</h1>
                        <p className="subTitle">usuario</p>
                        <input
                            type="text"
                            className="Input"
                            onChange={InputChange}
                            value={user}
                            name="user"
                        />
                        <p className="subTitle">contraseña</p>
                        <input
                            type="password"
                            className="Input"
                            onChange={InputChange}
                            value={password}
                            name="password"
                        />

                        <div className="blockButtom">
                            <button type="submit"  className="submit">Ingresar</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </>
);
}

export default Ingreso;