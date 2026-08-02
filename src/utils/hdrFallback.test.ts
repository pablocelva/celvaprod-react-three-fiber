import { afterEach, describe, expect, it, vi } from 'vitest'
import { HDR_1K, HDR_2K, HDR_4K, getBaselineHDR, probe4K, shouldProbe } from './hdrFallback'

function setConnection(conn: { saveData: boolean; effectiveType: string } | undefined) {
  Object.defineProperty(navigator, 'connection', {
    value: conn,
    configurable: true,
  })
}

function unsetConnection() {
  Reflect.deleteProperty(navigator, 'connection')
}

afterEach(() => {
  unsetConnection()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('getBaselineHDR', () => {
  it('usa 2K sin información de red', () => {
    setConnection(undefined)
    expect(getBaselineHDR()).toBe(HDR_2K)
  })

  it('usa 1K con saveData', () => {
    setConnection({ saveData: true, effectiveType: '4g' })
    expect(getBaselineHDR()).toBe(HDR_1K)
  })

  it('usa 1K con slow-2g', () => {
    setConnection({ saveData: false, effectiveType: 'slow-2g' })
    expect(getBaselineHDR()).toBe(HDR_1K)
  })

  it('usa 2K con 4g normal', () => {
    setConnection({ saveData: false, effectiveType: '4g' })
    expect(getBaselineHDR()).toBe(HDR_2K)
  })

  it('usa 2K con 3g', () => {
    setConnection({ saveData: false, effectiveType: '3g' })
    expect(getBaselineHDR()).toBe(HDR_2K)
  })
})

describe('shouldProbe', () => {
  it('sonda sin información de red', () => {
    setConnection(undefined)
    expect(shouldProbe()).toBe(true)
  })

  it('sonda con 4g', () => {
    setConnection({ saveData: false, effectiveType: '4g' })
    expect(shouldProbe()).toBe(true)
  })

  it('no sonda con 3g', () => {
    setConnection({ saveData: false, effectiveType: '3g' })
    expect(shouldProbe()).toBe(false)
  })

  it('no sonda con 2g', () => {
    setConnection({ saveData: false, effectiveType: '2g' })
    expect(shouldProbe()).toBe(false)
  })
})

describe('probe4K', () => {
  it('resuelve true si el fetch responde ok', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true } as Response)
    await expect(probe4K(HDR_4K, 3000, fetcher)).resolves.toBe(true)
    expect(fetcher).toHaveBeenCalledWith(HDR_4K, expect.objectContaining({ signal: expect.any(AbortSignal) }))
  })

  it('resuelve false si la respuesta no es ok', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false } as Response)
    await expect(probe4K(HDR_4K, 3000, fetcher)).resolves.toBe(false)
  })

  it('resuelve false si el fetch falla', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('network down'))
    await expect(probe4K(HDR_4K, 3000, fetcher)).resolves.toBe(false)
  })

  it('aborta el fetch y resuelve false al cumplirse el timeout', async () => {
    vi.useFakeTimers()

    const fetcher = vi.fn(
      (_url: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError')),
          )
        }),
    )

    const pending = probe4K(HDR_4K, 3000, fetcher)
    const assertion = expect(pending).resolves.toBe(false)
    vi.advanceTimersByTime(3000)
    await assertion
  })
})
