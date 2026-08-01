import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import SceneContent from './SceneContent'

export default function Scene3D() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
      dpr={typeof window !== 'undefined' && window.innerWidth <= 768 ? [1, 1] : [1, 1.5]}
      performance={{ min: 0.5, max: 1 }}
      shadows
      frameloop="always"
      camera={{ position: [0, 1, -5], fov: 75 }}
      gl={{
        toneMapping: THREE.NeutralToneMapping,
        toneMappingExposure: 0.45,
        antialias: true,
        alpha: true,
      }}
    >
      <SceneContent />
    </Canvas>
  )
}
