import { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import type { Group } from 'three'

interface UseGLTFWithReadyReturn {
  scene: Group | null
  ready: boolean
}

/**
 * Hook personalizado que indica cuando un modelo GLTF está completamente listo
 * Devuelve tanto la scene como un boolean indicando si está lista
 */
export function useGLTFWithReady(path: string): UseGLTFWithReadyReturn {
  const [ready, setReady] = useState(false)
  const gltf = useGLTF(path)

  useEffect(() => {
    if (gltf && gltf.scene) {
      setReady(true)
    }
  }, [gltf])

  return {
    scene: (gltf?.scene as Group) ?? null,
    ready,
  }
}

export default useGLTFWithReady
