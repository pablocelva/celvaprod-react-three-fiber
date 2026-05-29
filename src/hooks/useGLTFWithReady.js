import { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'

/**
 * Hook personalizado que indica cuando un modelo GLTF está completamente listo
 * Devuelve tanto la scene como un boolean indicando si está lista
 * 
 * @param {string} path - Ruta del modelo
 * @returns {Object} - { scene, ready }
 */
export function useGLTFWithReady(path) {
  const [ready, setReady] = useState(false)
  const gltf = useGLTF(path)

  useEffect(() => {
    // Cuando useGLTF carga, marcamos como ready
    if (gltf && gltf.scene) {
      setReady(true)
    }
  }, [gltf])

  return {
    scene: gltf?.scene,
    ready
  }
}

export default useGLTFWithReady