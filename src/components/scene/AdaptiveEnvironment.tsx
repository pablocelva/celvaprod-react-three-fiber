import { Environment, useEnvironment } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { HDR_4K, getBaselineHDR, shouldProbe } from '../../utils/hdrFallback'

const PROBE_TIMEOUT_MS = 3000

export function SceneLoadedSignal({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady()
  }, [onReady])

  return null
}

function EnvSource({ files }: { files: string }) {
  const envMap = useEnvironment({ files })

  return <Environment map={envMap} background />
}

interface AdaptiveEnvironmentProps {
  onEnvReady: () => void
}

export default function AdaptiveEnvironment({ onEnvReady }: AdaptiveEnvironmentProps) {
  const baseline = useMemo(getBaselineHDR, [])
  const [files, setFiles] = useState(baseline)
  const [probeDone, setProbeDone] = useState(() => !shouldProbe())

  useEffect(() => {
    if (probeDone) return

    const controller = new AbortController()
    const timer = window.setTimeout(() => setProbeDone(true), PROBE_TIMEOUT_MS)

    fetch(HDR_4K, { signal: controller.signal })
      .then((res) => {
        if (!controller.signal.aborted && res.ok) setFiles(HDR_4K)
        setProbeDone(true)
      })
      .catch(() => {})

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [probeDone])

  return (
    <Suspense fallback={null}>
      <EnvSource files={files} />
      {probeDone && <SceneLoadedSignal onReady={onEnvReady} />}
    </Suspense>
  )
}
