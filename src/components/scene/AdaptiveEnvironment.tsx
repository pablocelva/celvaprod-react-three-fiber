import { Environment, useEnvironment } from '@react-three/drei'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useLoading } from '../../contexts/loadingContext'

export const HDR_4K = '/enviorments/river_walk_1_4k.hdr'
export const HDR_2K = '/enviorments/river_walk_1_2k.hdr'
export const HDR_1K = '/enviorments/river_walk_1_1k.hdr'

const HDR_TIMEOUT_MS = 4000

type NetworkInfo = {
  saveData: boolean
  effectiveType: string
}

function getConnection(): NetworkInfo | undefined {
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection
  if (!conn) return undefined
  return { saveData: conn.saveData, effectiveType: conn.effectiveType }
}

function getInitialHDR(): string {
  const conn = getConnection()
  if (!conn) return HDR_4K
  if (conn.saveData || conn.effectiveType === 'slow-2g') return HDR_1K
  if (conn.effectiveType === '2g') return HDR_2K
  return HDR_4K
}

export function SceneLoadedSignal() {
  const { setSceneReady } = useLoading()

  useEffect(() => {
    setSceneReady()
  }, [setSceneReady])

  return null
}

function EnvSource({ files, onReady }: { files: string; onReady: () => void }) {
  const envMap = useEnvironment({ files })

  useEffect(() => {
    onReady()
  }, [onReady, envMap])

  return <Environment map={envMap} background />
}

export default function AdaptiveEnvironment() {
  const [files, setFiles] = useState(getInitialHDR)
  const readyRef = useRef(false)

  const handleReady = useCallback(() => {
    readyRef.current = true
  }, [])

  useEffect(() => {
    if (files !== HDR_4K) return

    const timer = window.setTimeout(() => {
      if (!readyRef.current) setFiles(HDR_2K)
    }, HDR_TIMEOUT_MS)

    return () => window.clearTimeout(timer)
  }, [files])

  return (
    <Suspense fallback={null}>
      <EnvSource files={files} onReady={handleReady} />
      <SceneLoadedSignal />
    </Suspense>
  )
}
