import Navbar from '../components/Navbar'
import ServiceDetail from '../components/ServiceDetail'
import { services } from '../data/services'
import { useFadeIn } from '../hooks/useFadeIn'

export default function Composicion() {
    const { className } = useFadeIn()

    return (
        <>
            <Navbar />
            <div className={`form-container form-container--card ${className}`}>
                <ServiceDetail service={services.composicion} />
            </div>
        </>
    )
}