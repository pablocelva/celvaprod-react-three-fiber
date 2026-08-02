import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import PageErrorBoundary from './components/PageErrorBoundary/PageErrorBoundary'
import PageLayout from './layouts/PageLayout'
import { useWebVitals } from './hooks/useWebVitals'
import { useLoading } from './contexts/loadingContext'
import { ROUTES } from './router/routes'

const Scene3D = lazy(() => import('./components/scene/Scene3D'))

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
  const [loadingDone, setLoadingDone] = useState(false)

  useWebVitals()

  useEffect(() => {
    if (!isSceneReady || loadingDone) return
    const timer = window.setTimeout(() => setLoadingDone(true), 700)
    return () => window.clearTimeout(timer)
  }, [isSceneReady, loadingDone])

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
      {!loadingDone && <LoadingScreen fading={isSceneReady} />}
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
                {ROUTES.map(({ path, Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <PageErrorBoundary>
                        <Component />
                      </PageErrorBoundary>
                    }
                  />
                ))}
              </Route>
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
