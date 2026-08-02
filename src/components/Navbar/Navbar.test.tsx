import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'
import styles from './Navbar.module.css'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
}

describe('Navbar', () => {
  it('el hamburguesa abre y cierra el menú', async () => {
    const user = userEvent.setup()
    const { container } = renderNavbar()

    const list = container.querySelector('ul')
    expect(list).not.toHaveClass(styles.open)

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))
    expect(list).toHaveClass(styles.open)

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))
    expect(list).not.toHaveClass(styles.open)
  })

  it('clic en un link cierra el menú', async () => {
    const user = userEvent.setup()
    const { container } = renderNavbar()

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))
    expect(container.querySelector('ul')).toHaveClass(styles.open)

    await user.click(screen.getByRole('link', { name: 'Servicios' }))
    expect(container.querySelector('ul')).not.toHaveClass(styles.open)
  })

  it('clic en el logo cierra el menú', async () => {
    const user = userEvent.setup()
    const { container } = renderNavbar()

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))
    expect(container.querySelector('ul')).toHaveClass(styles.open)

    await user.click(screen.getByRole('link', { name: 'CELVAPROD' }))
    expect(container.querySelector('ul')).not.toHaveClass(styles.open)
  })
})
