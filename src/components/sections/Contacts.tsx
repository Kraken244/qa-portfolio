import { contactLinks, profile } from '../../content/profile'
import { CopyEmailButton } from '../ui/CopyEmailButton'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import styles from './Contacts.module.css'

export function Contacts() {
  return (
    <Section
      description="Открыт к junior-позициям, стажировкам и разговору о том, как я могу усилить QA-команду."
      id="contacts"
      index="04"
      label="Contacts"
      title="Давайте знакомиться."
    >
      <Reveal delay={60}>
        <div className={styles.panel}>
          <div className={styles.primary}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" className={styles.eyebrowDot} />
              Написать напрямую
            </p>

            <a className={styles.email} href={`mailto:${profile.email}`}>
              {profile.email}
              <span className={styles.emailArrow}>
                <Icon name="arrow-up-right" size={19} />
              </span>
            </a>

            <div className={styles.copyRow}>
              <CopyEmailButton email={profile.email} />
              <span className={styles.hint}>или напишите в Telegram</span>
            </div>

            <p className={styles.availability}>
              <span aria-hidden="true" className={styles.statusDot} />
              {profile.availability}
            </p>
          </div>

          <ul aria-label="Ссылки на контакты" className={styles.links}>
            {contactLinks.map((contact) => {
              const isExternal = contact.icon !== 'mail'

              return (
                <li key={contact.label}>
                  <a
                    className={styles.link}
                    href={contact.href}
                    rel={isExternal ? 'noreferrer noopener' : undefined}
                    target={isExternal ? '_blank' : undefined}
                  >
                    <span className={styles.iconBox}>
                      <Icon name={contact.icon} size={17} />
                    </span>
                    <span className={styles.linkCopy}>
                      <span className={styles.linkLabel}>{contact.label}</span>
                      <span className={styles.handle}>{contact.handle}</span>
                    </span>
                    <Icon
                      className={styles.chevron}
                      name="arrow-up-right"
                      size={16}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
