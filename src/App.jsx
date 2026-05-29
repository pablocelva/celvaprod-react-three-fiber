import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
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

function Scroll3DController({ onRouteChange }) {
  const location = useLocation()

  useEffect(() => {
    onRouteChange(location.pathname)
  }, [location.pathname])

  return null
}

function App() {
  useWebVitals()
  
  const handleRouteChange = (path) => {
    // console.log("Ruta cambiada a:", path)
  }

  return (
    <>
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
