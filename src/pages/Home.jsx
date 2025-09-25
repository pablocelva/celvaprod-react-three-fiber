import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import IconLogos from '../components/IconLogos'

export default function Home() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 50); // pequeña espera para activar transición
    }, []);
    
    return (
        <div className={`form-container ${visible ? "show" : ""}`}>
            <Navbar />
            <div className="about">
                <h1>CELVAPROD</h1>
                <p>CELVAPROD es un estudio independiente de composición y producción musical</p>
                <IconLogos />
                <div className="botones-hero">
                    <Link to="/servicios">
                        <button className='cta1'>Servicios</button>
                    </Link>
                    <Link to="/contacto">
                        <button className='cta2'>Cotiza</button>
                    </Link>
                </div>   
            </div>
        </div>
    )
}