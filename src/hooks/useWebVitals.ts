import { useEffect } from 'react'

/**
 * Hook para monitorear Core Web Vitals
 * Registra LCP, FID/INP y CLS para debugging
 */
export function useWebVitals(): void {
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return

    let lcpObserver: PerformanceObserver | undefined
    let clsObserver: PerformanceObserver | undefined
    let fidObserver: PerformanceObserver | undefined

    interface LayoutShiftEntry extends PerformanceEntry {
      hadRecentInput: boolean
      value: number
    }

    interface LCPEntry extends PerformanceEntry {
      renderTime?: number
      loadTime?: number
    }

    interface EventTimingEntry extends PerformanceEntry {
      processingDuration: number
    }

    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as LCPEntry
        const renderTime = lastEntry.renderTime ?? lastEntry.loadTime ?? 0
        console.log('📊 LCP (Largest Contentful Paint):', renderTime / 1000, 's')
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        list.getEntries().forEach((entry) => {
          const layoutEntry = entry as LayoutShiftEntry
          if (!layoutEntry.hadRecentInput && layoutEntry.value) {
            clsValue += layoutEntry.value
          }
        })
        if (clsValue > 0) {
          console.log('📊 CLS (Cumulative Layout Shift):', clsValue.toFixed(3))
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const timingEntry = entry as EventTimingEntry
          if (timingEntry.processingDuration) {
            console.log('📊 FID/INP (Input Delay):', timingEntry.processingDuration.toFixed(0), 'ms')
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input', 'event'] })

      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach((entry) => {
        console.log(`📊 ${entry.name}:`, (entry.startTime / 1000).toFixed(2), 's')
      })

      const onLoad = () => {
        const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
        if (navTiming) {
          console.log('📊 DNS:', navTiming.domainLookupEnd - navTiming.domainLookupStart, 'ms')
          console.log('📊 TCP:', navTiming.connectEnd - navTiming.connectStart, 'ms')
          console.log('📊 TTFB:', navTiming.responseStart - navTiming.requestStart, 'ms')
          console.log('📊 DOMContentLoaded:', navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart, 'ms')
          console.log('📊 Total Load Time:', navTiming.loadEventEnd - navTiming.fetchStart, 'ms')
        }
      }

      window.addEventListener('load', onLoad)

      return () => {
        lcpObserver?.disconnect()
        clsObserver?.disconnect()
        fidObserver?.disconnect()
        window.removeEventListener('load', onLoad)
      }
    } catch (e) {
      console.warn('Web Vitals not fully supported')
    }
  }, [])
}

export default useWebVitals