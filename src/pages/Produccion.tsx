import ContentPanel from '../components/ContentPanel'
import ServiceDetail from '../components/ServiceDetail'
import { services } from '../data/services'

export default function Produccion() {
    return (
        <ContentPanel variant="card">
            <ServiceDetail service={services.produccion} />
        </ContentPanel>
    )
}
