import { render, screen } from '@testing-library/react'
import { Suspense } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import PageErrorBoundary from '../components/PageErrorBoundary/PageErrorBoundary'
import { ROUTES } from './routes'

const expectedContent: Record<string, { level: number; name: string }> = {
  '/': { level: 1, name: 'CELVAPROD' },
  '/servicios': { level: 2, name: 'Servicios' },
  '/servicios/composicion': { level: 1, name: 'Composición Musical' },
  '/servicios/produccion': { level: 1, name: 'Producción Musical' },
  '/servicios/clases': { level: 1, name: 'Clases de Música' },
  '/contacto': { level: 2, name: 'Contacto' },
}

describe('rutas de la app', () => {
  ROUTES.forEach((route) => {
    it(`renderiza la página correcta en ${route.path}`, async () => {
      const Component = route.Component

      render(
        <MemoryRouter initialEntries={[route.path]}>
          <Suspense fallback={null}>
            <Routes>
              <Route
                path={route.path}
                element={
                  <PageErrorBoundary>
                    <Component />
                  </PageErrorBoundary>
                }
              />
            </Routes>
          </Suspense>
        </MemoryRouter>,
      )

      const { level, name } = expectedContent[route.path]
      expect(await screen.findByRole('heading', { level, name })).toBeInTheDocument()
    })
  })
})
