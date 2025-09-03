import { Link } from 'react-router-dom'
import { useState } from 'react'
import { IconBrandTidal } from '@tabler/icons-react'
import { 
    FaInstagram, 
    FaYoutube,
    FaSoundcloud,
} from 'react-icons/fa'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const handleLinkClick = () => setOpen(false)

    return (
        <nav className="navbar">
            <div className="nav-logos">
                <Link className='img-logo-nav' to="/">
                CELVA<strong>PROD</strong>
                </Link>
                <button className="hamburger" onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </div>
            <ul className={`nav-links ${open ? 'open' : ''}`}>
                <ul className="nav-links open">
                    <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                    <li><Link to="/servicios" onClick={handleLinkClick}>Servicios</Link></li>
                    {/* <li><Link to="/blog" onClick={handleLinkClick}>Blog</Link></li> */}
                    {/* <li><Link to="/about" onClick={handleLinkClick}>About</Link></li> */}
                    <li><Link to="/contacto" onClick={handleLinkClick}>Contacto</Link></li>
                </ul>
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
            </ul>
        </nav>
    )
}