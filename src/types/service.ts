export interface ServiceFeature {
  title: string
  description: string
}

export interface Service {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  features: ServiceFeature[]
  badges: string[]
  portfolioUrl: string | null
  portfolioLabel: string | null
  ctaLabel: string
  ctaAction: string
}

export type ServiceId = 'composicion' | 'produccion' | 'clases'

export type ServiceMap = Record<ServiceId, Service>
