import { describe, expect, it } from 'vitest'
import { ROUTES } from './routes'

const EXPECTED_PATHS = [
  '/',
  '/servicios',
  '/servicios/composicion',
  '/servicios/produccion',
  '/servicios/clases',
  '/contacto',
]

describe('ROUTES', () => {
  it('define exactamente las 6 rutas esperadas', () => {
    expect(ROUTES.map((r) => r.path)).toEqual(EXPECTED_PATHS)
  })

  it('no tiene rutas duplicadas', () => {
    const paths = ROUTES.map((r) => r.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('cada ruta tiene un componente definido', () => {
    for (const route of ROUTES) {
      expect(route.Component).toBeTruthy()
    }
  })

  it('las rutas de servicios cuelgan de /servicios', () => {
    for (const route of ROUTES) {
      if (route.path !== '/servicios' && route.path.startsWith('/servicios')) {
        expect(route.path.startsWith('/servicios/')).toBe(true)
      }
    }
  })
})
