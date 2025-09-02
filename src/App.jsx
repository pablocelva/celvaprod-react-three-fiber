import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Scene from './Scene'
import Scene3D from './components/Scene3D'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Contacto from './pages/Contacto'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './components/Footer'

function Scroll3DController({ onRouteChange }) {
  const location = useLocation()

  // Detecta cambio de ruta
  useEffect(() => {
    onRouteChange(location.pathname)
  }, [location.pathname])

  return null
}

function App() {
    const handleRouteChange = (path) => {
    //console.log("Ruta cambiada a:", path)
  }
  return (
    <>
      <BrowserRouter>
        <Scene3D />
        {/* <Scene /> */}
        <Scroll3DController onRouteChange={handleRouteChange} />
        <div style={{
          position: "relative",
          zIndex: 1, 
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
