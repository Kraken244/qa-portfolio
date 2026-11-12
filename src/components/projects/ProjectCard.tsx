import { projectStageLabels } from '../../content/projects'
import type { Project } from '../../types/content'
import { Badge } from '../ui/Badge'
import { Icon } from '../ui/Icon'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project, trigger: HTMLButtonElement) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const stage = projectStageLabels[project.stage]

  return (
    <article className={`${styles.card} ${project.featured ? styles.featured : ''}`}>
      <div className={styles.top}>
        <span aria-hidden="true" className={styles.index}>
          / {project.index}
        </span>
        <Badge
          dot
          tone={project.stage === 'in-progress' ? 'accent' : 'neutral'}
        >
          {stage.label}
        </Badge>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <p className={styles.summary}>{project.summary}</p>
      </div>

      <ul aria-label="Стек проекта" className={styles.stack}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span className={styles.year}>
          <span aria-hidden="true" className={styles.yearDot} />
          {project.year}
        </span>
        <button
          aria-label={`Разобрать кейс «${project.title}»`}
          className={styles.openButton}
          onClick={(event) => onOpen(project, event.currentTarget)}
          type="button"
        >
          Разобрать кейс
          <span className={styles.arrow}>
            <Icon name="arrow-up-right" size={14} />
          </span>
        </button>
      </div>
    </article>
  )
}
