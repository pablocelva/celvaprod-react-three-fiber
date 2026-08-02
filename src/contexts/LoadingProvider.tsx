import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { LoadingContext, READY_FALLBACK_TIMEOUT_MS } from './loadingContext'

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isSceneReady, setIsSceneReady] = useState(false)

  const setSceneReady = useCallback(() => setIsSceneReady(true), [])

  useEffect(() => {
    if (isSceneReady) return
    const timer = setTimeout(setSceneReady, READY_FALLBACK_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [isSceneReady, setSceneReady])

  return (
    <LoadingContext.Provider value={{ isSceneReady, setSceneReady }}>
      {children}
    </LoadingContext.Provider>
  )
}
