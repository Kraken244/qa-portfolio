import type { ReactNode } from 'react'
import styles from './Badge.module.css'

type BadgeTone = 'accent' | 'neutral' | 'outline' | 'danger'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  dot?: boolean
  className?: string
}

export function Badge({
  children,
  tone = 'neutral',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[tone]} ${className}`}>
      {dot ? <span aria-hidden="true" className={styles.dot} /> : null}
      {children}
    </span>
  )
}
