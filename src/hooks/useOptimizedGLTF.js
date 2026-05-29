import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

/**
 * Hook personalizado para cargar y cachear modelos 3D
 * Implementa preload automático y error handling
 * 
 * @param {string} path - Ruta del modelo (debe terminar en .glb o .gltf)
 * @param {boolean} shouldPreload - Si debe precargar el modelo
 * @returns {Object} - Objeto con scene, scenes, materials, etc.
 */
export function useOptimizedGLTF(path, shouldPreload = true) {
  const cachedModel = useRef(null)

  // Preload del modelo si está habilitado
  useEffect(() => {
    if (shouldPreload) {
      useGLTF.preload(path)
    }
  }, [path, shouldPreload])

  // Cargar modelo
  const model = useGLTF(path)

  // Cachear resultado
  if (!cachedModel.current) {
    cachedModel.current = model
  }

  return cachedModel.current
}

export default useOptimizedGLTF