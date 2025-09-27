import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Servicios() {
    
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 50); // pequeña espera para activar transición
    }, []);
    
    return (
        <>
            <Navbar />
            <div className={`form-container ${visible ? "show" : ""}`}>
                <h2>Servicios</h2>
                <div className="grid-servicios">
                    <div className="card-servicios">
                        <h3>Composición Musical</h3>
                        <p>Si necesitas ayuda para la música de tu proyecto, sean canciones, beats, bandas sonoras, diseño sonoro.</p>
                        <Link to="/contacto">
                            <button className='cta1'>Más info</button>
                        </Link>
                    </div>
                    <div className="card-servicios">
                        <h3>Producción Musical</h3>
                        <p>Si necesitas ayuda para producir tu música, o producción adicional, o si necesitas una mezcla o materización para tu proyecto</p>
                        <Link to="/contacto">
                            <button className='cta1'>Más info</button>
                        </Link>
                    </div>
                    <div className="card-servicios">
                        <h3>Clases de Música</h3>
                        <p>Si buscas clases de música, instrumentos (guitarra, piano, bajo, canto), armonía, teoría musical, composición, producción musical, arreglos, diseño sonoro.</p>
                        <Link to="/contacto">
                            <button className='cta1'>Más info</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}