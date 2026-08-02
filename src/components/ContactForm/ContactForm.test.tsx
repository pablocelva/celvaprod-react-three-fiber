import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  it('tiene los 4 campos con required', () => {
    render(<ContactForm />)
    expect(screen.getByRole('textbox', { name: /nombre/i })).toBeRequired()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeRequired()
    expect(screen.getByRole('combobox', { name: /motivo/i })).toBeRequired()
    expect(screen.getByRole('textbox', { name: /mensaje/i })).toBeRequired()
  })

  it('el select de motivo tiene las 4 opciones', () => {
    render(<ContactForm />)
    const select = screen.getByRole('combobox', { name: /motivo/i })
    const options = Array.from(select.querySelectorAll('option')).map((o) => o.value)
    expect(options).toEqual(['', 'produccion', 'composicion', 'clases', 'collaboration'])
  })

  it('el form postea a Formspree', () => {
    render(<ContactForm />)
    const form = screen.getByRole('form', { name: 'Formulario de contacto' })
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/xjkakang')
    expect(form).toHaveAttribute('method', 'POST')
  })

  it('no se rompe al enviar', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: 'Enviar' }))
  })
})
