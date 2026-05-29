import { useEffect } from 'react'

/**
 * Hook para monitorear Core Web Vitals
 * Registra LCP, FID/INP y CLS para debugging
 */
export function useWebVitals() {
  useEffect(() => {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          console.log('📊 LCP (Largest Contentful Paint):', (lastEntry.renderTime || lastEntry.loadTime) / 1000, 's')
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          console.log('📊 CLS (Cumulative Layout Shift):', clsValue.toFixed(3))
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        // First Input Delay (FID) / Interaction to Next Paint (INP)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.processingDuration) {
              console.log('📊 FID/INP (Input Delay):', entry.processingDuration.toFixed(0), 'ms')
            }
          })
        })
        fidObserver.observe({ entryTypes: ['first-input', 'event'] })

        // Paint Timing
        const paintEntries = performance.getEntriesByType('paint')
        paintEntries.forEach((entry) => {
          console.log(`📊 ${entry.name}:`, (entry.startTime / 1000).toFixed(2), 's')
        })

        // Navigation Timing
        window.addEventListener('load', () => {
          const navTiming = performance.getEntriesByType('navigation')[0]
          if (navTiming) {
            console.log('📊 DNS:', navTiming.domainLookupEnd - navTiming.domainLookupStart, 'ms')
            console.log('📊 TCP:', navTiming.connectEnd - navTiming.connectStart, 'ms')
            console.log('📊 TTFB:', navTiming.responseStart - navTiming.requestStart, 'ms')
            console.log('📊 DOMContentLoaded:', navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart, 'ms')
            console.log('📊 Total Load Time:', navTiming.loadEventEnd - navTiming.fetchStart, 'ms')
          }
        })

        return () => {
          lcpObserver.disconnect()
          clsObserver.disconnect()
          fidObserver.disconnect()
        }
      } catch (e) {
        console.warn('Web Vitals not fully supported')
      }
    }
  }, [])
}

export default useWebVitals