import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Servicios from './Servicios'

describe('Servicios', () => {
  it('renderiza las 3 cards con título, descripción y link', () => {
    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 2, name: 'Servicios' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Composición Musical' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Producción Musical' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Clases de Música' })).toBeInTheDocument()
    expect(screen.getByText(/música de tu proyecto/i)).toBeInTheDocument()
  })

  it('tiene 3 links "Más info" apuntando a cada servicio', () => {
    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>,
    )

    const links = screen.getAllByRole('link', { name: 'Más info' })
    expect(links).toHaveLength(3)
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toEqual(['/servicios/composicion', '/servicios/produccion', '/servicios/clases'])
  })
})
