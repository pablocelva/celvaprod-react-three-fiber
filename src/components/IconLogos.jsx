import { IconBrandTidal } from '@tabler/icons-react'
import { 
    FaInstagram, 
    FaYoutube,
    FaSoundcloud,
} from 'react-icons/fa'

export default function IconLogos() {
    return (
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
    )
}