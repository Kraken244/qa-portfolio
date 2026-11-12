import { useEffect, useRef } from 'react'
import { projectStageLabels } from '../../content/projects'
import { useBodyLock } from '../../hooks/useBodyLock'
import type { Project } from '../../types/content'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import styles from './ProjectDialog.module.css'

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useBodyLock(Boolean(project))

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (project && !dialog.open) {
      dialog.showModal()
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  const closeDialog = () => {
    dialogRef.current?.close()
  }

  return (
    <dialog
      aria-labelledby="project-dialog-title"
      className={styles.dialog}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog()
      }}
      ref={dialogRef}
    >
      {project ? (
        <div className={styles.surface}>
          <div className={styles.header}>
            <div className={styles.headerMeta}>
              <span aria-hidden="true" className={styles.index}>
                / {project.index}
              </span>
              <Badge
                dot
                tone={project.stage === 'in-progress' ? 'accent' : 'neutral'}
              >
                {projectStageLabels[project.stage].label}
              </Badge>
            </div>
            <button
              aria-label="Закрыть кейс"
              className={styles.close}
              onClick={closeDialog}
              type="button"
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          <div className={styles.scroll}>
            <p className={styles.kicker}>{project.subtitle}</p>
            <h2 className={styles.title} id="project-dialog-title">
              {project.title}
            </h2>
            <p className={styles.summary}>{project.summary}</p>

            <div className={styles.demoNotice}>
              <span aria-hidden="true" className={styles.noticeDot} />
              <p>
                Демонстрационный кейс. Он показывает структуру описания и не
                является реальным коммерческим проектом или опытом.
              </p>
            </div>

            <div className={styles.details}>
              <section className={styles.detailCard}>
                <h3 className={styles.detailTitle}>
                  <span aria-hidden="true">01</span>
                  Что тестировалось
                </h3>
                <ul className={styles.checkList}>
                  {project.tested.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true" className={styles.checkIcon}>
                        <Icon name="check" size={10} strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.detailCard}>
                <h3 className={styles.detailTitle}>
                  <span aria-hidden="true">02</span>
                  Найденные проблемы
                </h3>
                <ul className={styles.findingList}>
                  {project.findings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className={styles.bottom}>
              <div className={styles.stackBlock}>
                <span className={styles.label}>Стек</span>
                <ul className={styles.stack}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {project.repoUrl ? (
                <Button
                  external
                  href={project.repoUrl}
                  leadingIcon={<Icon name="github" size={16} />}
                  size="sm"
                  variant="secondary"
                >
                  Открыть на GitHub
                </Button>
              ) : (
                <span className={styles.repoDisabled}>
                  <Icon name="github" size={15} />
                  Репозиторий скоро появится
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
