import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Produccion() {
    
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 50); // pequeña espera para activar transición
    }, []);
    
    return (
        <>
            <Navbar />
            <div className={`form-container ${visible ? "show" : ""}`}>
                <div className="servicio-desc">
                    <h1>Producción Musical</h1>
                    <br />
                    <h2>🎵 Servicios incluidos:</h2>
                    <ul>
                        <li>Producción musical integral (grabación, mezcla, mastering)</li>
                        <li>Composición y arreglos (beats, armonía, melodía, estructura, arreglos)</li>
                        <li>Acompañamiento creativo</li>
                        <li>Hasta 2 revisiones por etapa (mezcla y master)</li>
                        <li>Entrega de WAV, MP3 y stems</li>
                    </ul>
                    <a href="https://tidal.com/playlist/3e4d6291-c495-4505-a37a-f68530fa30c2" target="_blank" rel="noreferrer"><button className="cta1">Portafolio de Producción Musical</button></a>
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