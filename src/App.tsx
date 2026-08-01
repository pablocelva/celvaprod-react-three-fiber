import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import ErrorBoundary from './components/ErrorBoundary'
import { useWebVitals } from './hooks/useWebVitals'

const Scene3D = lazy(() => import('./components/Scene3D'))
const Home = lazy(() => import('./pages/Home'))
const Servicios = lazy(() => import('./pages/Servicios'))
const Composicion = lazy(() => import('./pages/Composicion'))
const Produccion = lazy(() => import('./pages/Produccion'))
const Clases = lazy(() => import('./pages/Clases'))
const Contacto = lazy(() => import('./pages/Contacto'))

interface Scroll3DControllerProps {
  onRouteChange: (path: string) => void
}

function Scroll3DController({ onRouteChange }: Scroll3DControllerProps) {
  const location = useLocation()

  useEffect(() => {
    onRouteChange(location.pathname)
  }, [location.pathname, onRouteChange])

  return null
}

function App() {
  const [sceneReady, setSceneReady] = useState(false)
  
  useWebVitals()
  
  useEffect(() => {
    // Esperar un poco después de que Scene3D monte para marcar como listo
    const timer = setTimeout(() => {
      setSceneReady(true)
    }, 2000) // 2 segundos de buffer
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleRouteChange = (_path: string) => {
    // console.log("Ruta cambiada a:", path)
  }

  return (
    <>
      {!sceneReady && <LoadingScreen />}
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <Scene3D />
          </Suspense>
        </ErrorBoundary>
        <Scroll3DController onRouteChange={handleRouteChange} />
        <div style={{
          position: "relative",
          zIndex: 1, 
        }}>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/servicios/composicion" element={<Composicion />} />
              <Route path="/servicios/produccion" element={<Produccion />} />
              <Route path="/servicios/clases" element={<Clases />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
