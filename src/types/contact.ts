export interface ContactFormData {
  name: string
  email: string
  reason: 'produccion' | 'composicion' | 'clases' | 'collaboration' | ''
  message: string
}

export type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error'
