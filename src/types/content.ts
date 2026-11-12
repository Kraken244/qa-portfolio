export type SectionId = 'hero' | 'skills' | 'projects' | 'about' | 'contacts'

export interface NavItem {
  id: Exclude<SectionId, 'hero'>
  label: string
  index: string
}

export interface ProfileLink {
  label: string
  href: string
  handle: string
}

export interface Profile {
  name: string
  shortName: string
  role: string
  focus: string
  headline: string
  intro: string
  availability: string
  email: string
  github: ProfileLink
  telegram: ProfileLink
}

export type SkillStatus = 'practice' | 'learning' | 'progress'

export interface Skill {
  name: string
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  status: SkillStatus
  skills: Skill[]
}

export type ProjectStage = 'demo' | 'in-progress'

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  summary: string
  stage: ProjectStage
  stack: string[]
  tested: string[]
  findings: string[]
  repoUrl?: string
  year: string
  featured?: boolean
}

export interface AboutFact {
  label: string
  value: string
  note?: string
  placeholder?: boolean
}

export interface Principle {
  index: string
  title: string
  text: string
}

export interface ContactLink {
  label: string
  href: string
  handle: string
  icon: 'github' | 'telegram' | 'mail'
}
