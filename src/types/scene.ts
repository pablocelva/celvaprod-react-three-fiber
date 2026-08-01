export interface SceneConfig {
  toneMappingExposure: number
  dpm: boolean
}

export interface LightConfig {
  intensity: number
  color: string
  position: [number, number, number]
}

export interface ModelConfig {
  url: string
  scale: number
  position: [number, number, number]
}
