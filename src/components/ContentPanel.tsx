import type { ReactNode } from 'react'

type ContentPanelVariant = 'card' | 'hero' | 'cards' | 'contacto'

interface ContentPanelProps {
  variant: ContentPanelVariant
  children: ReactNode
}

export default function ContentPanel({ variant, children }: ContentPanelProps) {
  return (
    <main className={`form-container form-container--${variant}`}>
      {children}
    </main>
  )
}
