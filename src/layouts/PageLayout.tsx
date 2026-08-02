import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { useFadeIn } from '../hooks/useFadeIn'

/* El wrapper usa las clases GLOBALES `page-transition` y `show` (sin estilos propios).
   Son solo un marcador de estado: la animación de fade la aplica cada contenedor
   (ContentPanel, cards de Servicios) con `:global(.page-transition.show) <clase>`.
   NO se anima opacity/transform aquí: rompería el backdrop-filter de los hijos. */
function TransitionContainer() {
  const { className } = useFadeIn()

  return (
    <div className={`page-transition ${className}`}>
      <Outlet />
    </div>
  )
}

export default function PageLayout() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <TransitionContainer key={location.pathname} />
    </>
  )
}
