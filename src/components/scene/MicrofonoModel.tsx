import { useGLTF } from '@react-three/drei'
import { memo } from 'react'
import type { ModelRef } from './types'

interface MicrofonoModelProps {
  modelRef: ModelRef
}

const MicrofonoModel = memo(function MicrofonoModel({ modelRef }: MicrofonoModelProps) {
  const { scene } = useGLTF('/microfono/scene.gltf')

  return <primitive ref={modelRef} object={scene} position={[0, 0.5, -1]} />
})

export default MicrofonoModel
