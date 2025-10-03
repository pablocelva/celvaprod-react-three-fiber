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
                <div className="about">
                    <h1>Clases de Música</h1>
                    <p>CELVAPROD es un estudio independiente de composición y producción musical</p>
                </div>
            </div>
        </>
    )
}