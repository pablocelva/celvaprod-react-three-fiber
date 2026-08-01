import { memo } from 'react'
import type { Mesh } from 'three'
import type { ModelRef } from './types'

interface FallbackModelProps {
  modelRef: ModelRef
}

const FallbackModel = memo(function FallbackModel({ modelRef }: FallbackModelProps) {
  return (
    <mesh ref={modelRef as React.RefObject<Mesh | null>} position={[0, 0.5, -1]}>
      <boxGeometry args={[1, 1.5, 1]} />
      <meshPhysicalMaterial color={0xf62456} />
    </mesh>
  )
})

export default FallbackModel
