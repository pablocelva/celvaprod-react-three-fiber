import type { RouteName } from '../types'

export const TARGET_POSITIONS: Record<RouteName, { cam: [number, number, number]; model: [number, number, number] }> = {
  '/': { cam: [-2, 3, -5], model: [-2.5, 2, -2] },
  '/servicios': { cam: [6, 2, -5], model: [1, 0.5, -2] },
  '/servicios/composicion': { cam: [8, 2, -5], model: [1.5, 0.5, -2] },
  '/servicios/produccion': { cam: [10, 2, -5], model: [2, 0.5, -2] },
  '/servicios/clases': { cam: [12, 2, -5], model: [2.5, 0.5, -2] },
  '/contacto': { cam: [-5, 1, 3], model: [1, 0.5, -1] },
}

const MOBILE_TARGETS: Partial<Record<RouteName, { cam: [number, number, number]; model: [number, number, number] }>> = {
  '/': { cam: [0, 2, -4], model: [0, 0, -1] },
  '/servicios': { cam: [5, 3, -4], model: [0.5, 0.5, -1.5] },
  '/contacto': { cam: [-4, 2, 2], model: [0.5, 0.5, -0.5] },
}

export function getTargets(
  route: RouteName,
  isMobile: boolean
): { cam: [number, number, number]; model: [number, number, number] } {
  if (!isMobile) return TARGET_POSITIONS[route]
  return MOBILE_TARGETS[route] ?? TARGET_POSITIONS[route]
}
