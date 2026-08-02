import { describe, expect, it } from 'vitest'
import { getTargets, TARGET_POSITIONS } from './sceneTargets'
import type { RouteName } from '../types/navigation'

const ALL_ROUTES: RouteName[] = [
  '/',
  '/servicios',
  '/servicios/composicion',
  '/servicios/produccion',
  '/servicios/clases',
  '/contacto',
]

describe('TARGET_POSITIONS', () => {
  it('define targets para todas las rutas', () => {
    expect(Object.keys(TARGET_POSITIONS)).toEqual(ALL_ROUTES)
  })

  it('cada target tiene cam y model como vectores 3D numéricos', () => {
    for (const route of ALL_ROUTES) {
      const { cam, model } = TARGET_POSITIONS[route]
      expect(cam).toHaveLength(3)
      expect(model).toHaveLength(3)
      for (const v of [...cam, ...model]) {
        expect(typeof v).toBe('number')
      }
    }
  })
})

describe('getTargets', () => {
  it('desktop usa siempre los targets de desktop', () => {
    for (const route of ALL_ROUTES) {
      expect(getTargets(route, false)).toBe(TARGET_POSITIONS[route])
    }
  })

  it('mobile usa el override cuando existe', () => {
    const mobile = getTargets('/servicios', true)
    expect(mobile).not.toBe(TARGET_POSITIONS['/servicios'])
  })

  it('mobile cae al target de desktop cuando no hay override', () => {
    const withoutOverride: RouteName[] = ['/servicios/composicion', '/servicios/produccion', '/servicios/clases']
    for (const route of withoutOverride) {
      expect(getTargets(route, true)).toBe(TARGET_POSITIONS[route])
    }
  })
})
