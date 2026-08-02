import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './PageErrorBoundary.module.css'

interface PageErrorBoundaryProps {
  children: ReactNode
}

interface PageErrorBoundaryState {
  hasError: boolean
}

export class PageErrorBoundary extends Component<
  PageErrorBoundaryProps,
  PageErrorBoundaryState
> {
  constructor(props: PageErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): PageErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error en la página:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.root}>
          <h2 className={styles.title}>Algo salió mal</h2>
          <p className={styles.message}>
            Esta sección no pudo cargarse. Podés volver al inicio o recargar.
          </p>
          <div className={styles.actions}>
            <Link className={styles.link} to="/">
              Volver al inicio
            </Link>
            <button
              className={styles.button}
              type="button"
              onClick={() => window.location.reload()}
            >
              Recargar
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default PageErrorBoundary
