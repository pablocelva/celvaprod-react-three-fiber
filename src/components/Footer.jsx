import { 
    FaInstagram, 
    FaYoutube,
    FaSoundcloud
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer">
            <Link className='img-logo-nav' to="/">
                CELVA<strong>PROD</strong>
            </Link>
            <div className="logos">
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
        </footer>
        
    )
}