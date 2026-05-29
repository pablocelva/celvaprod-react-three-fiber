import React from 'react'

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
        <div style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#f62456',
          fontFamily: 'monospace',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            ⚠️ Error en la Experiencia 3D
          </div>
          <div style={{ fontSize: '14px', color: '#aaa', maxWidth: '600px' }}>
            La escena 3D no pudo cargar. Intentando recargar...
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f62456',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Recargar Página
          </button>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
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