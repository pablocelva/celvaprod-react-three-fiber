import type { ReactNode } from 'react'
import styles from './ContentPanel.module.css'

type ContentPanelVariant = 'card' | 'hero' | 'cards' | 'contacto'

interface ContentPanelProps {
  variant: ContentPanelVariant
  children: ReactNode
}

export default function ContentPanel({ variant, children }: ContentPanelProps) {
  return (
    <main className={`${styles.container} ${styles[variant]}`}>
      {children}
    </main>
  )
}
