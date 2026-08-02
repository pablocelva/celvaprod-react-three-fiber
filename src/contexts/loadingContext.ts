import { createContext, useContext } from 'react'

interface LoadingContextValue {
  isSceneReady: boolean
  setSceneReady: () => void
}

export const LoadingContext = createContext<LoadingContextValue | null>(null)

export const READY_FALLBACK_TIMEOUT_MS = 12_000

export function useLoading(): LoadingContextValue {
  const ctx = useContext(LoadingContext)
  if (!ctx) {
    throw new Error('useLoading debe usarse dentro de <LoadingProvider>')
  }
  return ctx
}
