import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import IconLogos from '../components/IconLogos'
import { useFadeIn } from '../hooks/useFadeIn'

export default function Home() {

    const { className } = useFadeIn()
    
    return (
        <>
            <Navbar />
            <div className={`form-container form-container--hero ${className}`}>
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
        </>
    )
}