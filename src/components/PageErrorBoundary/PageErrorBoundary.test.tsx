import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import PageErrorBoundary from './PageErrorBoundary'

function Boom(): never {
  throw new Error('boom')
}

describe('PageErrorBoundary', () => {
  it('muestra el fallback cuando un hijo lanza un error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    try {
      render(
        <MemoryRouter>
          <PageErrorBoundary>
            <Boom />
          </PageErrorBoundary>
        </MemoryRouter>,
      )

      expect(screen.getByRole('heading', { name: 'Algo salió mal' })).toBeInTheDocument()
      expect(
        screen.getByText('Esta sección no pudo cargarse. Podés volver al inicio o recargar.'),
      ).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/')
      expect(screen.getByRole('button', { name: 'Recargar' })).toBeInTheDocument()
    } finally {
      spy.mockRestore()
    }
  })

  it('renderiza los hijos cuando no hay error', () => {
    render(
      <MemoryRouter>
        <PageErrorBoundary>
          <p>Contenido normal</p>
        </PageErrorBoundary>
      </MemoryRouter>,
    )

    expect(screen.getByText('Contenido normal')).toBeInTheDocument()
    expect(screen.queryByText('Algo salió mal')).not.toBeInTheDocument()
  })
})
