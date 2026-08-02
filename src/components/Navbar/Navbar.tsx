import { Link } from 'react-router-dom'
import { useState } from 'react'
import IconLogos from '../IconLogos/IconLogos'
import styles from './Navbar.module.css'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const handleLinkClick = () => setOpen(false)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLogos}>
                <Link className={styles.logoLink} to="/">
                CELVA<strong>PROD</strong>
                </Link>
                <button className={styles.hamburger} onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </div>
            <ul className={`${styles.navLinks} ${open ? styles.open : ''}`}>
                <ul className={`${styles.navLinks} ${styles.open}`}>
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
