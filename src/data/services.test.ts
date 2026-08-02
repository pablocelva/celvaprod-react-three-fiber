import { describe, expect, it } from 'vitest'
import { services } from './services'
import type { ServiceId } from '../types/service'

const SERVICE_IDS: ServiceId[] = ['composicion', 'produccion', 'clases']

describe('services', () => {
  it('tiene exactamente los 3 servicios', () => {
    expect(Object.keys(services)).toEqual(SERVICE_IDS)
  })

  it('cada servicio tiene datos válidos', () => {
    for (const id of SERVICE_IDS) {
      const s = services[id]
      expect(s.id).toBe(id)
      expect(s.title.trim().length).toBeGreaterThan(0)
      expect(s.subtitle.trim().length).toBeGreaterThan(0)
      expect(s.icon.trim().length).toBeGreaterThan(0)
      expect(s.color).toMatch(/^#[0-9a-fA-F]{6}$/)
      expect(s.ctaLabel.trim().length).toBeGreaterThan(0)
      expect(s.ctaAction).toBe('/contacto')
    }
  })

  it('cada servicio tiene features con título y descripción', () => {
    for (const id of SERVICE_IDS) {
      const s = services[id]
      expect(s.features.length).toBeGreaterThan(0)
      for (const f of s.features) {
        expect(f.title.trim().length).toBeGreaterThan(0)
        expect(f.description.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('portfolioUrl y portfolioLabel van juntos y con URL válida', () => {
    for (const id of SERVICE_IDS) {
      const s = services[id]
      if (s.portfolioUrl) {
        expect(s.portfolioUrl.startsWith('https://')).toBe(true)
        expect(s.portfolioLabel).toBeTruthy()
      } else {
        expect(s.portfolioLabel).toBeNull()
      }
    }
  })
})
