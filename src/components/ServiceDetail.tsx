import { useNavigate } from 'react-router-dom'
import { IconMusic, IconMicrophone, IconSchool, IconArrowLeft, IconHeadphones, IconSend, type Icon } from '@tabler/icons-react'
import type { Service } from '../types'

const iconMap: Record<string, Icon> = {
  music: IconMusic,
  microphone: IconMicrophone,
  school: IconSchool,
}

interface ServiceDetailProps {
  service: Service
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const navigate = useNavigate()
  const Icon = iconMap[service.icon]
  const accent = service.color

  return (
    <div className="service-detail" style={{ '--accent': accent } as React.CSSProperties}>
      <button className="service-detail__back" onClick={() => navigate('/servicios')}>
        <IconArrowLeft size={18} /> Volver
      </button>

      <div className="service-detail__header">
        <div className="service-detail__icon" style={{ backgroundColor: `${accent}1a` }}>
          <Icon size={36} color={accent} />
        </div>
        <div className="service-detail__header-text">
          <h1 className="service-detail__title">{service.title}</h1>
          <p className="service-detail__subtitle">{service.subtitle}</p>
        </div>
      </div>

      {service.badges && (
        <div className="service-detail__badges">
          {service.badges.map((b) => (
            <span key={b} className="service-detail__badge" style={{ borderColor: accent, color: accent }}>
              {b}
            </span>
          ))}
        </div>
      )}

      <div className="service-detail__features">
        {service.features.map((f) => (
          <div key={f.title} className="service-detail__feature">
            <div className="service-detail__marker" style={{ backgroundColor: accent }} />
            <div>
              <h3 className="service-detail__feature-title">{f.title}</h3>
              <p className="service-detail__feature-desc">{f.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="service-detail__actions">
        {service.portfolioUrl && (
          <a href={service.portfolioUrl} target="_blank" rel="noreferrer" className="service-detail__btn-link">
            <button className="service-detail__btn service-detail__btn--outline">
              <IconHeadphones size={18} /> {service.portfolioLabel}
            </button>
          </a>
        )}
        <button className="service-detail__btn service-detail__btn--primary" onClick={() => navigate(service.ctaAction)}>
          <IconSend size={18} /> {service.ctaLabel}
        </button>
      </div>
    </div>
  )
}
