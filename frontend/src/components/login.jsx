import './main.css'
const Login = () => {

    return (
        <main >
            <article>
                <form className="main-container"> 
                    <label> Colocar el nombre de su usuario </label>
                    <input type="text" placeholder="usuario" />
                    <label> Colocar la contrasena de su usuario </label>
                    <input type="text" placeholder="contrasena" />
                    <button type='submti'> Enviar </button>
                </form>
            </article>
        </main>
    );


};

export default Login;