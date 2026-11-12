import { useEffect, useRef, useState } from 'react'

function shouldRevealImmediately() {
  if (typeof window === 'undefined') return true

  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  )
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(shouldRevealImmediately)

  useEffect(() => {
    const node = ref.current
    if (!node || isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [isVisible])

  return { ref, isVisible }
}
