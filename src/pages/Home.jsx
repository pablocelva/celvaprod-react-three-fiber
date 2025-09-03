import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { IconBrandTidal } from '@tabler/icons-react'
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa'

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="about">
                <h1>CELVAPROD</h1>
                <p>CELVAPROD es un estudio independiente de composición y producción musical</p>
                <div className="logos">
                <a href="https://tidal.com/playlist/3e4d6291-c495-4505-a37a-f68530fa30c2" target="_blank" rel="noreferrer">
                    <IconBrandTidal />
                </a>
                <a href="https://soundcloud.com/pablo-lambert-espinoza" target="_blank" rel="noreferrer">
                    <FaSoundcloud />
                </a>
                <a href="https://youtube.com/@CELVAPROD" target="_blank" rel="noreferrer">
                    <FaYoutube />
                </a>
                <a href="https://instagram.com/celvanegra" target="_blank" rel="noreferrer">
                    <FaInstagram />
                </a>
            </div>
                <div className="botones-hero">
                    <Link to="/servicios">
                        <button className='cta1'>Servicios</button>
                    </Link>
                    <Link to="/contacto">
                        <button className='cta2'>Cotiza</button>
                    </Link>
                </div>
                <div className="about-logo">
                    </div>
                    <div className="about-desc">
                    </div>    
            </div>
            {/* <Footer /> */}
        </>
    )
}