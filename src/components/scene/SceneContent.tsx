import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import type { Group } from 'three'
import AdaptiveEnvironment, { SceneLoadedSignal } from './AdaptiveEnvironment'
import CameraController from './CameraController'
import FallbackModel from './FallbackModel'
import MicrofonoModel from './MicrofonoModel'

const MODEL_URL = '/microfono/scene.gltf'

export default function SceneContent() {
  const modelRef = useRef<Group>(null)

  useEffect(() => {
    try {
      useGLTF.preload(MODEL_URL)
    } catch (_e) {
      // Silent fail
    }
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} color={0xf62456} />
      <spotLight position={[0, 10, 5]} angle={Math.PI / 3} penumbra={0.5} intensity={200} castShadow />

      <Suspense fallback={<FallbackModel modelRef={modelRef} />}>
        <MicrofonoModel modelRef={modelRef} />
        <SceneLoadedSignal />
      </Suspense>

      <AdaptiveEnvironment />

      <CameraController modelRef={modelRef} />

      <OrbitControls
        enableDamping
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={0.5}
        maxPolarAngle={1.5}
        target={[0, 1, 0]}
      />
    </>
  )
}
