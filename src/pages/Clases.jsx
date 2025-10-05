import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Clases() {
    
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 50); // pequeña espera para activar transición
    }, []);
    
    return (
        <>
            <Navbar />
            <div className={`form-container ${visible ? "show" : ""}`}>
                <div className="servicio-desc">
                    <h1>Clases de Música</h1>
                    <br />
                    <h2>🎵 Contenidos incluidos:</h2>
                    <ul>
                        <li>Instrumentos (Guitarra, Piano, Bajo)</li>
                        <li>Teoría musical y Armonía</li>
                        <li>Composición y Arreglos</li>
                        <li>Producción musical y Diseño Sonoro</li>
                    </ul>
                    <Link to="/contacto">
                    {/* <a href="https://www.youtube.com/watch?v=5-9-1zC1o-I&list=PLu-2-3-6-0-7-4-5" target="_blank" rel="noreferrer"> */}
                        <button className="cta1">Agenda tu clase</button>
                    {/* </a> */}
                    </Link>
                </div>
            </div>
        </>
    )
}