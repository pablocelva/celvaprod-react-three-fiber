import React from 'react'
import './ErrorBoundary.css'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error en Three.js Canvas:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-title">
            ⚠️ Error en la Experiencia 3D
          </div>
          <div className="error-message">
            La escena 3D no pudo cargar. Intentando recargar...
          </div>
          <button
            className="error-button"
            onClick={() => window.location.reload()}
          >
            Recargar Página
          </button>
          <div className="error-details">
            Si el problema persiste, intenta:
            <br />
            1. Limpiar cache (Ctrl+Shift+Delete)
            <br />
            2. Hard reload (Ctrl+Shift+R)
            <br />
            3. Usar otro navegador
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary