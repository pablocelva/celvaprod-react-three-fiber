import { Environment, useEnvironment } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { HDR_4K, getBaselineHDR, probe4K, shouldProbe } from '../../utils/hdrFallback'

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

    let cancelled = false

    probe4K(HDR_4K, PROBE_TIMEOUT_MS).then((use4k) => {
      if (cancelled) return
      if (use4k) setFiles(HDR_4K)
      setProbeDone(true)
    })

    return () => {
      cancelled = true
    }
  }, [probeDone])

  return (
    <Suspense fallback={null}>
      <EnvSource files={files} />
      {probeDone && <SceneLoadedSignal onReady={onEnvReady} />}
    </Suspense>
  )
}
