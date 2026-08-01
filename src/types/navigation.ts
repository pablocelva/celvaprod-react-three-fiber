export type RouteName =
  | '/'
  | '/servicios'
  | '/servicios/composicion'
  | '/servicios/produccion'
  | '/servicios/clases'
  | '/contacto'

export type CameraPosition = [number, number, number]

export interface CameraTarget {
  cam: CameraPosition
  model: CameraPosition
}

export type TargetPositions = Record<RouteName, CameraTarget>
