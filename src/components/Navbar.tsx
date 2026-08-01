import { Link } from 'react-router-dom'
import { useState } from 'react'
import IconLogos from './IconLogos'

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
                <IconLogos />
            </ul>
        </nav>
    )
}