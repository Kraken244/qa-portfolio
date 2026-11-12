import { useEffect, useRef, useState } from 'react'
import { navItems, profile } from '../../content/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useBodyLock } from '../../hooks/useBodyLock'
import type { SectionId } from '../../types/content'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import styles from './Header.module.css'

const sectionIds: SectionId[] = ['hero', ...navItems.map((item) => item.id)]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds, 'hero')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null)

  useBodyLock(menuOpen)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setIsScrolled(window.scrollY > 12)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    firstMenuLinkRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = menuPanelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )

      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const desktopQuery = window.matchMedia('(min-width: 900px)')
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    desktopQuery.addEventListener('change', handleDesktop)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktopQuery.removeEventListener('change', handleDesktop)
    }
  }, [menuOpen])

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      id="top"
    >
      <div className={`container ${styles.inner}`}>
        <a
          aria-label="QA Portfolio — к началу страницы"
          className={styles.logo}
          href="#top"
          onClick={() => setMenuOpen(false)}
        >
          <span>qa</span>
          <span className={styles.logoSlash}>/</span>
          <span>portfolio</span>
          <span aria-hidden="true" className={styles.logoDot} />
        </a>

        <nav aria-label="Основная навигация" className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  aria-current={
                    activeSection === item.id ? 'location' : undefined
                  }
                  className={styles.navLink}
                  href={`#${item.id}-title`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button
            className={styles.headerCta}
            href="#contacts-title"
            size="sm"
            variant="secondary"
          >
            Связаться
          </Button>
          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className={styles.mobilePanel} id="mobile-menu" ref={menuPanelRef}>
          <nav aria-label="Мобильная навигация">
            <ul className={styles.mobileList}>
              {navItems.map((item, index) => (
                <li key={item.id}>
                  <a
                    className={styles.mobileLink}
                    href={`#${item.id}-title`}
                    onClick={() => setMenuOpen(false)}
                    ref={index === 0 ? firstMenuLinkRef : undefined}
                  >
                    <span className={styles.mobileIndex}>{item.index}</span>
                    <span>{item.label}</span>
                    <Icon
                      className={styles.mobileArrow}
                      name="arrow-up-right"
                      size={20}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileFooter}>
            <p className={styles.mobileLabel}>На связи</p>
            <a className={styles.mobileEmail} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className={styles.mobileSocials}>
              <a
                href={profile.github.href}
                rel="noreferrer noopener"
                target="_blank"
              >
                <Icon name="github" size={17} />
                {profile.github.handle}
              </a>
              <a
                href={profile.telegram.href}
                rel="noreferrer noopener"
                target="_blank"
              >
                <Icon name="telegram" size={17} />
                {profile.telegram.handle}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
