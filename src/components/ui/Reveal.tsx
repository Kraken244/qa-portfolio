import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './Reveal.module.css'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  const style = {
    '--reveal-delay': `${delay}ms`,
  } as CSSProperties

  return (
    <div
      className={`${styles.reveal} ${isVisible ? styles.visible : ''} ${className}`}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  )
}
