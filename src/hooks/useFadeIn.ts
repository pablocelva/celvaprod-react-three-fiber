import { useState, useEffect } from 'react'

interface UseFadeInReturn {
  visible: boolean
  className: string
}

export function useFadeIn(delay = 50): UseFadeInReturn {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const className = visible ? 'show' : ''

  return { visible, className }
}
