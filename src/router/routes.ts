import { lazy, type ComponentType } from 'react'
import type { RouteName } from '../types/navigation'

const Home = lazy(() => import('../pages/Home/Home'))
const Servicios = lazy(() => import('../pages/Servicios/Servicios'))
const Composicion = lazy(() => import('../pages/Composicion/Composicion'))
const Produccion = lazy(() => import('../pages/Produccion/Produccion'))
const Clases = lazy(() => import('../pages/Clases/Clases'))
const Contacto = lazy(() => import('../pages/Contacto/Contacto'))

export interface AppRoute {
  path: RouteName
  Component: ComponentType
}

export const ROUTES: AppRoute[] = [
  { path: '/', Component: Home },
  { path: '/servicios', Component: Servicios },
  { path: '/servicios/composicion', Component: Composicion },
  { path: '/servicios/produccion', Component: Produccion },
  { path: '/servicios/clases', Component: Clases },
  { path: '/contacto', Component: Contacto },
]
