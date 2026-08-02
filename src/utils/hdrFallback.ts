export const HDR_4K = '/enviorments/river_walk_1_4k.hdr'
export const HDR_2K = '/enviorments/river_walk_1_2k.hdr'
export const HDR_1K = '/enviorments/river_walk_1_1k.hdr'

interface NetworkInfo {
  saveData: boolean
  effectiveType: string
}

function getConnection(): NetworkInfo | undefined {
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection
  if (!conn) return undefined
  return { saveData: conn.saveData, effectiveType: conn.effectiveType }
}

export function getBaselineHDR(): string {
  const conn = getConnection()
  if (!conn) return HDR_2K
  if (conn.saveData || conn.effectiveType === 'slow-2g') return HDR_1K
  return HDR_2K
}

export function shouldProbe(): boolean {
  const conn = getConnection()
  if (!conn) return true
  return conn.effectiveType === '4g'
}
