import { useRef, useState } from 'react'
import { projects, projectsNote } from '../../content/projects'
import type { Project } from '../../types/content'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectDialog } from '../projects/ProjectDialog'
import { Badge } from '../ui/Badge'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import styles from './Projects.module.css'

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  return (
    <Section
      description="Не список логотипов, а структура мышления: что проверял, как искал проблемы и что с ними делал. Сейчас это учебные демо-примеры."
      id="projects"
      index="02"
      label="Projects"
      title="Кейсы, которые можно разобрать."
    >
      <Reveal delay={50}>
        <aside className={styles.notice}>
          <Badge dot tone="outline">
            Demo data
          </Badge>
          <p>{projectsNote}</p>
        </aside>
      </Reveal>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <Reveal
            className={styles.revealItem}
            delay={index * 60}
            key={project.id}
          >
            <ProjectCard onOpen={openProject} project={project} />
          </Reveal>
        ))}
      </div>

      <ProjectDialog onClose={closeProject} project={selectedProject} />
    </Section>
  )
}
