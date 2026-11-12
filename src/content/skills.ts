import type { SkillGroup, SkillStatus } from '../types/content'

export const skillStatusLabels: Record<
  SkillStatus,
  { label: string; description: string }
> = {
  practice: {
    label: 'Практика',
    description: 'Применяю в учебных задачах и демо-проектах',
  },
  learning: {
    label: 'Осваиваю',
    description: 'Изучаю и закрепляю на практике',
  },
  progress: {
    label: 'В процессе',
    description: 'Только начал разбираться',
  },
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Синтаксис, структуры данных и учебные скрипты на Python.',
    status: 'learning',
    skills: [{ name: 'Python' }],
  },
  {
    id: 'testing',
    title: 'Testing',
    description: 'Чек-листы, тест-кейсы и воспроизводимые баг-репорты.',
    status: 'practice',
    skills: [
      { name: 'Manual QA' },
      { name: 'Test Design' },
      { name: 'Bug Reporting' },
    ],
  },
  {
    id: 'api',
    title: 'API',
    description: 'Коллекции запросов, статус-коды, JSON и проверка контрактов.',
    status: 'learning',
    skills: [{ name: 'Postman' }, { name: 'REST API' }],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'SELECT, JOIN, фильтрация и сортировка на учебных данных.',
    status: 'learning',
    skills: [{ name: 'SQL' }],
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Первые автотесты; Selenium — следующий шаг после Pytest.',
    status: 'progress',
    skills: [{ name: 'Pytest' }, { name: 'Selenium' }],
  },
]

export const currentFocus = ['Pytest', 'Selenium', 'SQL-практика']
