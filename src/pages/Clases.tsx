import ContentPanel from '../components/ContentPanel'
import ServiceDetail from '../components/ServiceDetail'
import { services } from '../data/services'

export default function Clases() {
    return (
        <ContentPanel variant="card">
            <ServiceDetail service={services.clases} />
        </ContentPanel>
    )
}
