import type { ReactNode } from 'react'

export type IconName =
  | 'arrow-up-right'
  | 'arrow-right'
  | 'arrow-up'
  | 'check'
  | 'close'
  | 'copy'
  | 'github'
  | 'mail'
  | 'menu'
  | 'telegram'
  | 'terminal'

interface IconDefinition {
  content: ReactNode
  filled?: boolean
  viewBox?: string
}

const icons: Record<IconName, IconDefinition> = {
  'arrow-up-right': {
    content: (
      <>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </>
    ),
  },
  'arrow-right': {
    content: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
  },
  'arrow-up': {
    content: (
      <>
        <path d="M12 19V5" />
        <path d="m6 11 6-6 6 6" />
      </>
    ),
  },
  check: {
    content: <path d="m5 12.5 4.2 4.2L19 6.8" />,
  },
  close: {
    content: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
  },
  copy: {
    content: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
  },
  github: {
    filled: true,
    content: (
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    ),
  },
  mail: {
    content: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </>
    ),
  },
  menu: {
    content: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
  },
  telegram: {
    filled: true,
    content: (
      <path d="M21.73 2.5c-.3-.24-.79-.27-1.17-.1L1.94 10.26c-.8.33-.77 1.45.04 1.74l4.6 1.64 1.8 4.82c.27.72 1.2.9 1.72.34l2.48-2.67 4.63 3.42c.55.4 1.34.11 1.5-.56l3.37-15.24c.08-.38-.02-.78-.35-1.25ZM8.7 13.1l-.05 3.08-.92-2.47 8.82-6.55c.2-.15.4.14.22.31L8.7 13.1Z" />
    ),
  },
  terminal: {
    content: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m7 9 3 3-3 3" />
        <path d="M13 15h4" />
      </>
    ),
  },
}

interface IconProps {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
}

export function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1.7,
}: IconProps) {
  const definition = icons[name]

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={definition.filled ? 'currentColor' : 'none'}
      focusable="false"
      height={size}
      stroke={definition.filled ? 'none' : 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={definition.filled ? undefined : strokeWidth}
      viewBox={definition.viewBox ?? '0 0 24 24'}
      width={size}
    >
      {definition.content}
    </svg>
  )
}
