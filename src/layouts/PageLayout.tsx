import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useFadeIn } from '../hooks/useFadeIn'

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
