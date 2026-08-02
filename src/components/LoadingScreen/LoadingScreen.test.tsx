import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoadingScreen from './LoadingScreen'

describe('LoadingScreen', () => {
  it('muestra el wordmark CELVA PROD', () => {
    render(<LoadingScreen />)
    expect(screen.getByText('PROD')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('CELVAPROD')
  })

  it('renderiza las 5 barras del ecualizador', () => {
    const { container } = render(<LoadingScreen />)
    const eq = container.querySelector('.loading-eq')
    expect(eq).toBeInTheDocument()
    expect(eq?.querySelectorAll('span')).toHaveLength(5)
    expect(eq).toHaveAttribute('aria-hidden', 'true')
  })

  it('no aplica el fade por defecto', () => {
    const { container } = render(<LoadingScreen />)
    expect(container.firstChild).toHaveClass('loading-screen')
    expect(container.firstChild).not.toHaveClass('loading-screen--fade-out')
  })

  it('aplica el fade cuando fading=true', () => {
    const { container } = render(<LoadingScreen fading />)
    expect(container.firstChild).toHaveClass('loading-screen--fade-out')
  })
})
