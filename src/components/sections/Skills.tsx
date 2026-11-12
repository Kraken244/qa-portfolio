import { currentFocus, skillGroups, skillStatusLabels } from '../../content/skills'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import styles from './Skills.module.css'

export function Skills() {
  return (
    <Section
      description="Пять направлений, которые нужны QA. Без процентов и громких уровней: отмечаю, что уже применяю, что осваиваю и что пока в процессе."
      id="skills"
      index="01"
      label="Skills"
      title="Карта навыков без прикрас."
    >
      <div className={styles.list}>
        {skillGroups.map((group, index) => (
          <Reveal delay={index * 45} key={group.id}>
            <article className={styles.row}>
              <span aria-hidden="true" className={styles.rowIndex}>
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className={styles.category}>
                <h3 className={styles.categoryTitle}>{group.title}</h3>
                <p className={styles.categoryText}>{group.description}</p>
              </div>

              <ul aria-label={`Инструменты: ${group.title}`} className={styles.chips}>
                {group.skills.map((skill) => (
                  <li className={styles.chip} key={skill.name}>
                    {skill.name}
                  </li>
                ))}
              </ul>

              <span className={`${styles.status} ${styles[group.status]}`}>
                <span aria-hidden="true" className={styles.statusDot} />
                {skillStatusLabels[group.status].label}
              </span>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className={styles.footer}>
          <div className={styles.focus}>
            <span className={styles.focusLabel}>
              <Icon name="terminal" size={15} />
              Сейчас в фокусе
            </span>
            <ul className={styles.focusList}>
              {currentFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className={styles.note}>
            <strong>Честно об уровне:</strong> перечисленные инструменты — учебная
            практика, а не заявка на профессиональный опыт. По мере роста
            портфолио статусы будут обновляться.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
