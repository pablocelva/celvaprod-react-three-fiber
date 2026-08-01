import { Link } from 'react-router-dom'
import ContentPanel from '../components/ContentPanel'
import IconLogos from '../components/IconLogos'

export default function Home() {
    return (
        <ContentPanel variant="hero">
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
        </ContentPanel>
    )
}
