import { useNavigate } from 'react-router-dom'
import { IconMusic, IconMicrophone, IconSchool, IconArrowLeft, IconHeadphones, IconSend, type Icon } from '@tabler/icons-react'
import type { Service } from '../../types'
import styles from './ServiceDetail.module.css'

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
    <div className={styles.root} style={{ '--accent': accent } as React.CSSProperties}>
      <button className={styles.back} onClick={() => navigate('/servicios')}>
        <IconArrowLeft size={18} /> Volver
      </button>

      <div className={styles.header}>
        <div className={styles.icon} style={{ backgroundColor: `${accent}1a` }}>
          <Icon size={36} color={accent} />
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.subtitle}>{service.subtitle}</p>
        </div>
      </div>

      {/* {service.badges && (
        <div className={styles.badges}>
          {service.badges.map((b) => (
            <span key={b} className={styles.badge} style={{ borderColor: accent, color: accent }}>
              {b}
            </span>
          ))}
        </div>
      )} */}

      <div className={styles.features}>
        {service.features.map((f) => (
          <div key={f.title} className={styles.feature}>
            <div className={styles.marker} style={{ backgroundColor: accent }} />
            <div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        {service.portfolioUrl && (
          <a href={service.portfolioUrl} target="_blank" rel="noreferrer" className={styles.btnLink}>
            <button className={`${styles.btn} ${styles.btnOutline}`}>
              <IconHeadphones size={18} /> {service.portfolioLabel}
            </button>
          </a>
        )}
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate(service.ctaAction)}>
          <IconSend size={18} /> {service.ctaLabel}
        </button>
      </div>
    </div>
  )
}
