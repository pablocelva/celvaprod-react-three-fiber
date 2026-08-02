import { Link } from 'react-router-dom'
import ContentPanel from '../../components/ContentPanel/ContentPanel'
import IconLogos from '../../components/IconLogos/IconLogos'
import styles from './Home.module.css'

export default function Home() {
    return (
        <ContentPanel variant="hero">
            <div className={styles.about}>
                <h1>CELVAPROD</h1>
                <p>CELVAPROD es un estudio independiente de composición y producción musical</p>
                <IconLogos />
                <div className={styles.botonesHero}>
                    <Link to="/servicios">
                        <button className={styles.cta1}>Servicios</button>
                    </Link>
                    <Link to="/contacto">
                        <button className={styles.cta2}>Cotiza</button>
                    </Link>
                </div>   
            </div>
        </ContentPanel>
    )
}
