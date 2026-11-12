import type { ContactLink, NavItem, Profile } from '../types/content'

/**
 * Все личные данные собраны здесь.
 * Замените заглушки на свои значения — компоненты менять не нужно.
 */
export const profile: Profile = {
  name: 'Имя Фамилия',
  shortName: 'ИФ',
  role: 'Junior QA Engineer',
  focus: 'Python · Manual QA · Automation',
  headline: 'Нахожу проблемы раньше, чем их заметит пользователь.',
  intro:
    'Junior QA Engineer в начале пути. Разбираю продукт на сценарии, проверяю краевые случаи и оформляю находки так, чтобы их было легко воспроизвести и исправить. Сейчас ищу первую роль в QA-команде.',
  availability: 'Открыт к junior-позициям и стажировкам',
  email: 'hello@example.com',
  github: {
    label: 'GitHub',
    href: 'https://github.com/username',
    handle: '@username',
  },
  telegram: {
    label: 'Telegram',
    href: 'https://t.me/username',
    handle: '@username',
  },
}

export const navItems: NavItem[] = [
  { id: 'skills', label: 'Навыки', index: '01' },
  { id: 'projects', label: 'Проекты', index: '02' },
  { id: 'about', label: 'Обо мне', index: '03' },
  { id: 'contacts', label: 'Контакты', index: '04' },
]

export const contactLinks: ContactLink[] = [
  {
    label: profile.github.label,
    href: profile.github.href,
    handle: profile.github.handle,
    icon: 'github',
  },
  {
    label: profile.telegram.label,
    href: profile.telegram.href,
    handle: profile.telegram.handle,
    icon: 'telegram',
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    handle: profile.email,
    icon: 'mail',
  },
]
