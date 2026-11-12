import { profile } from '../../content/profile'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { TestRunPanel } from '../visuals/TestRunPanel'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero} id="hero">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" className={styles.statusDot} />
              <span>{profile.role}</span>
              <span aria-hidden="true" className={styles.separator} />
              <span className={styles.eyebrowMuted}>{profile.focus}</span>
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className={styles.title} id="hero-title">
              <span className={styles.name}>{profile.name}</span>
              <span className={styles.discipline}>
                <span aria-hidden="true" className={styles.disciplineLine} />
                Тестирование · API · Python
              </span>
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className={styles.headline}>{profile.headline}</p>
            <p className={styles.intro}>{profile.intro}</p>
          </Reveal>

          <Reveal delay={190}>
            <div className={styles.actions}>
              <Button href="#projects-title" size="lg" trailingIcon={<Icon name="arrow-right" size={17} />}>
                Смотреть проекты
              </Button>
              <Button
                external
                href={profile.github.href}
                leadingIcon={<Icon name="github" size={17} />}
                size="lg"
                variant="secondary"
              >
                GitHub
              </Button>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className={styles.meta}>
              <p className={styles.availability}>
                <span aria-hidden="true" className={styles.availabilityDot} />
                {profile.availability}
              </p>
              <a className={styles.emailLink} href={`mailto:${profile.email}`}>
                {profile.email}
                <Icon name="arrow-up-right" size={13} />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.visual} delay={180}>
          <div className={styles.visualInner}>
            <div aria-hidden="true" className={styles.floatingTag}>
              <span className={styles.tagIcon}>
                <Icon name="check" size={13} strokeWidth={2.4} />
              </span>
              <span className={styles.tagCopy}>
                <span className={styles.tagLabel}>test run</span>
                <strong className={styles.tagValue}>1 finding</strong>
              </span>
            </div>
            <TestRunPanel />
            <div aria-hidden="true" className={styles.visualCaption}>
              <span>manual</span>
              <span className={styles.captionLine} />
              <span>api</span>
              <span className={styles.captionLine} />
              <span>automation</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
