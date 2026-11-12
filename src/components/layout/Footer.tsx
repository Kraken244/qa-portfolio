import { navItems, profile } from '../../content/profile'
import { Icon } from '../ui/Icon'
import styles from './Footer.module.css'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <a
              aria-label="QA Portfolio — к началу страницы"
              className={styles.brand}
              href="#top"
            >
              qa<span className={styles.slash}>/</span>portfolio
            </a>
            <p className={styles.tagline}>
              Портфолио начинающего QA Engineer. Ручное тестирование, API и
              первые шаги в автоматизации.
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <ul className={styles.nav}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}-title`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.socials}>
            <a
              href={profile.github.href}
              rel="noreferrer noopener"
              target="_blank"
            >
              <Icon name="github" size={16} />
              GitHub
            </a>
            <a
              href={profile.telegram.href}
              rel="noreferrer noopener"
              target="_blank"
            >
              <Icon name="telegram" size={16} />
              Telegram
            </a>
            <a href={`mailto:${profile.email}`}>
              <Icon name="mail" size={16} />
              Email
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {currentYear} {profile.name}
          </p>
          <p className={styles.stack}>React · TypeScript · Vite</p>
          <a className={styles.toTop} href="#top">
            Наверх
            <Icon name="arrow-up" size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
