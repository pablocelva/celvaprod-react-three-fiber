import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Servicios() {
    
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 50); // pequeña espera para activar transición
    }, []);
    
    return (
        <div className={`form-container ${visible ? "show" : ""}`}>
            <Navbar />
            <h2>Servicios</h2>
            <div className="grid-servicios">
                <div className="card-servicios">
                    <h3>Composición Musical</h3>
                    <p>Si necesitas ayuda para componer tu música, o si necesitas música para tu proyecto, sean canciones, beats, bandas sonoras.</p>
                    <Link to="/contacto">
                        <button className='cta1'>Más info</button>
                    </Link>
                </div>
                <div className="card-servicios">
                    <h3>Producción Musical</h3>
                    <p>Si necesitas ayuda para producir tu música, o si necesitas una mezcla o materización para tu proyecto</p>
                    <Link to="/contacto">
                        <button className='cta1'>Más info</button>
                    </Link>
                </div>
                <div className="card-servicios">
                    <h3>Clases de Música y Consultorías</h3>
                    <p>Si buscas clases de música, composición, instrumentos, producción, armonía, arreglos, o si necesitas una consultoría para evaluar y potenciar tu proyecto</p>
                    <Link to="/contacto">
                        <button className='cta1'>Más info</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}