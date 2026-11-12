import type { MouseEventHandler, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit'
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  className?: string
  ariaLabel?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  onClick,
  type = 'button',
  leadingIcon,
  trailingIcon,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {leadingIcon ? <span className={styles.icon}>{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className={styles.icon}>{trailingIcon}</span> : null}
    </>
  )

  if (href) {
    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        href={href}
        rel={external ? 'noreferrer noopener' : undefined}
        target={external ? '_blank' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  )
}
