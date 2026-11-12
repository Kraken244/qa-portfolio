import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import styles from './CopyEmailButton.module.css'

interface CopyEmailButtonProps {
  email: string
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const copy = async () => {
    const fallbackCopy = () => {
      const textarea = document.createElement('textarea')
      textarea.value = email
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.append(textarea)
      textarea.select()

      let succeeded = false
      try {
        succeeded = document.execCommand('copy')
      } catch {
        succeeded = false
      }

      textarea.remove()
      return succeeded
    }

    let succeeded = false

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email)
        succeeded = true
      } else {
        succeeded = fallbackCopy()
      }
    } catch {
      succeeded = fallbackCopy()
    }

    if (!succeeded) return

    setCopied(true)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <button
      aria-label={`Скопировать email ${email}`}
      className={`${styles.copy} ${copied ? styles.copied : ''}`}
      onClick={copy}
      type="button"
    >
      <Icon name={copied ? 'check' : 'copy'} size={15} />
      <span aria-live="polite">{copied ? 'Скопировано' : 'Скопировать'}</span>
    </button>
  )
}
