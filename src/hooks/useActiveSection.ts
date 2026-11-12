import { useEffect, useState } from 'react'

export function useActiveSection<T extends string>(
  sectionIds: readonly T[],
  initial: T,
): T {
  const [active, setActive] = useState<T>(initial)
  const idsKey = sectionIds.join(',')

  useEffect(() => {
    const ids = idsKey.split(',') as T[]
    let frame = 0

    const update = () => {
      frame = 0
      const marker = window.scrollY + window.innerHeight * 0.32
      let current = ids[0] ?? initial

      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.offsetTop <= marker) {
          current = id
        }
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4

      if (isAtBottom) {
        current = ids[ids.length - 1] ?? current
      }

      setActive(current)
    }

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [idsKey, initial])

  return active
}
