import "./home.css"
import Header from "./sub-componets/Header"
import image from "../resources/economia_empresa_hero-1024x824.png"

function Home() {
    return ( 
        <div className="displayHome">
            <Header/>
            <div className="body">
                <div className="bienvenido">
                <h1 className="welcome">Bienvenidos</h1>
                </div>
                <div className="contImg">
                <img src={image} alt="bot" className="bot"/>
                </div>
            </div>
        </div>
    );
}

export default Home;