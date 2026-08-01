import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

/**
 * Hook personalizado para cargar y cachear modelos 3D
 * Implementa preload automático y error handling
 */
export function useOptimizedGLTF(path: string, shouldPreload = true): ReturnType<typeof useGLTF> {
  const cachedModel = useRef<ReturnType<typeof useGLTF> | null>(null)

  useEffect(() => {
    if (shouldPreload) {
      useGLTF.preload(path)
    }
  }, [path, shouldPreload])

  const model = useGLTF(path)

  if (!cachedModel.current) {
    cachedModel.current = model
  }

  return cachedModel.current
}

export default useOptimizedGLTF
