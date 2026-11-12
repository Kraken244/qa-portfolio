import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  id: string
  index: string
  label: string
  title: string
  description?: string
}

export function SectionHeading({
  id,
  index,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className={styles.heading}>
      <p className={styles.kicker}>
        <span className={styles.index}>{index}</span>
        <span aria-hidden="true" className={styles.line} />
        <span>{label}</span>
      </p>
      <h2 className={styles.title} id={`${id}-title`}>
        {title}
      </h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  )
}
