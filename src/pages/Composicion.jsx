import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Composicion() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 50); // pequeña espera para activar transición
    }, []);
    
    return (
        <>
            <Navbar />
            <div className={`form-container ${visible ? "show" : ""}`}>
                <div className="servicio-desc">
                    <h1>Composición Musical</h1>
                    <br />
                    <h2>🎵 Servicios incluidos:</h2>
                    <ul>
                        <li>Composición original sincronizada</li>
                        <li>Diseño sonoro según requerimientos</li>
                        <li>2 versiones + 2 revisiones incluidas</li>
                        <li>Entrega de WAV, MP3 y stems</li>
                    </ul>
                    <a href="https://soundcloud.com/celvanegra" target="_blank" rel="noreferrer">
                        <button className="cta1">Portafolio de Composición Musical</button>
                    </a>
                    <br />
                    <Link to="/contacto">
                    {/* <a href="https://www.youtube.com/watch?v=5-9-1zC1o-I&list=PLu-2-3-6-0-7-4-5" target="_blank" rel="noreferrer"> */}
                        <button className="cta1">Cuéntame de tu proyecto</button>
                    {/* </a> */}
                    </Link>
                </div>
            </div>
        </>
    )
}