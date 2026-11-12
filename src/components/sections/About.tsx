import { about } from '../../content/about'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import styles from './About.module.css'

export function About() {
  return (
    <Section
      description="Коротко о переходе в QA, учебной практике и роли, которую хочу занять в команде."
      id="about"
      index="03"
      label="About"
      title="Не только баги, но и понимание продукта."
    >
      <div className={styles.grid}>
        <Reveal className={styles.story}>
          <p className={styles.lead}>{about.lead}</p>

          <div className={styles.paragraphs}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.principles}>
            <p className={styles.sectionLabel}>Как я подхожу к работе</p>
            <ul className={styles.principlesList}>
              {about.principles.map((principle) => (
                <li className={styles.principle} key={principle.index}>
                  <span aria-hidden="true" className={styles.principleIndex}>
                    {principle.index}
                  </span>
                  <div>
                    <h3 className={styles.principleTitle}>{principle.title}</h3>
                    <p className={styles.principleText}>{principle.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className={styles.aside} delay={120}>
          <div className={styles.goalCard}>
            <div className={styles.goalHead}>
              <span className={styles.goalLabel}>Карьерная цель</span>
              <Icon
                className={styles.goalIcon}
                name="arrow-up-right"
                size={17}
              />
            </div>
            <p className={styles.goalText}>{about.goal}</p>
          </div>

          <dl className={styles.facts}>
            {about.facts.map((fact) => (
              <div
                className={`${styles.fact} ${fact.placeholder ? styles.placeholder : ''}`}
                key={fact.label}
              >
                <dt className={styles.factLabel}>
                  {fact.label}
                  {fact.placeholder ? (
                    <span className={styles.todo}>добавить</span>
                  ) : null}
                </dt>
                <dd className={styles.factValue}>
                  {fact.value}
                  {fact.note ? (
                    <span className={styles.factNote}>{fact.note}</span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
