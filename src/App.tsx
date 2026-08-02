import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import PageErrorBoundary from './components/PageErrorBoundary/PageErrorBoundary'
import PageLayout from './layouts/PageLayout'
import { useWebVitals } from './hooks/useWebVitals'
import { useLoading } from './contexts/loadingContext'

const Scene3D = lazy(() => import('./components/scene/Scene3D'))
const Home = lazy(() => import('./pages/Home/Home'))
const Servicios = lazy(() => import('./pages/Servicios/Servicios'))
const Composicion = lazy(() => import('./pages/Composicion/Composicion'))
const Produccion = lazy(() => import('./pages/Produccion/Produccion'))
const Clases = lazy(() => import('./pages/Clases/Clases'))
const Contacto = lazy(() => import('./pages/Contacto/Contacto'))

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
  const { isSceneReady } = useLoading()

  useWebVitals()

  useEffect(() => {
    if (!isSceneReady) return
    const timer = window.setTimeout(() => {
      void import('./pages/Servicios/Servicios')
      void import('./pages/Contacto/Contacto')
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [isSceneReady])

  const handleRouteChange = (_path: string) => {}

  return (
    <>
      {!isSceneReady && <LoadingScreen />}
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </ErrorBoundary>
        <Scroll3DController onRouteChange={handleRouteChange} />
        <div style={{
          position: "relative",
          zIndex: 1,
        }}>
          <Suspense fallback={null}>
            <Routes>
              <Route element={<PageLayout />}>
                <Route path="/" element={<PageErrorBoundary><Home /></PageErrorBoundary>} />
                <Route path="/servicios" element={<PageErrorBoundary><Servicios /></PageErrorBoundary>} />
                <Route path="/servicios/composicion" element={<PageErrorBoundary><Composicion /></PageErrorBoundary>} />
                <Route path="/servicios/produccion" element={<PageErrorBoundary><Produccion /></PageErrorBoundary>} />
                <Route path="/servicios/clases" element={<PageErrorBoundary><Clases /></PageErrorBoundary>} />
                <Route path="/contacto" element={<PageErrorBoundary><Contacto /></PageErrorBoundary>} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
