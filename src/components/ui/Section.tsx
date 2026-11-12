import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  index: string
  label: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({
  id,
  index,
  label,
  title,
  description,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className={`${styles.section} ${className}`}
      id={id}
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            description={description}
            id={id}
            index={index}
            label={label}
            title={title}
          />
        </Reveal>
        {children}
      </div>
    </section>
  )
}
