import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getTargets } from '../../data/sceneTargets'
import type { RouteName } from '../../types'
import type { ModelRef } from './types'

const LERP_FACTOR = 0.095
const MAX_EXPOSURE = 0.45
const EXPOSURE_STEP = 0.008
const MOBILE_WIDTH = 768

interface CameraControllerProps {
  modelRef: ModelRef
}

export default function CameraController({ modelRef }: CameraControllerProps) {
  const location = useLocation()
  const route = location.pathname as RouteName
  const exposureRef = useRef(0)

  useFrame(({ camera, gl }) => {
    if (exposureRef.current < MAX_EXPOSURE) {
      exposureRef.current = Math.min(exposureRef.current + EXPOSURE_STEP, MAX_EXPOSURE)
    }
    gl.toneMappingExposure = exposureRef.current

    const isMobile = window.innerWidth <= MOBILE_WIDTH
    const { cam, model } = getTargets(route, isMobile)

    camera.position.lerp(new THREE.Vector3(...cam), LERP_FACTOR)

    if (modelRef.current) {
      modelRef.current.position.lerp(new THREE.Vector3(...model), LERP_FACTOR)

      if (route === '/servicios') modelRef.current.rotation.y += 0.02
      else if (route === '/contacto') modelRef.current.rotation.y -= 0.01
      else modelRef.current.rotation.y += 0.005
    }
  })

  return null
}
