import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="about">
                <div className="about-logo">
                        {/* <img src="https://raw.githubusercontent.com/pablocelva/casitagames-website/refs/heads/main/src/assets/casita_games_logo.png" alt="Ojito Game" className='casita-logo' /> */}
                    </div>
                    <div className="about-desc">
                        <h1>CELVAPROD</h1>
                        <p>CELVAPROD es un estudio independiente de composición y producción musical</p>
                        <Link to="/servicios">
                            <button className=''>Nuestros Servicios</button>
                        </Link>
                    </div>    
            </div>
        </>
    )
}