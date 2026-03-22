import { useState } from 'react'
import styles from './StudyPanel.module.css'
import Collapse from '../common/Collapse'
import { BodyParagraph } from '../common/BodyContent'
import { forkTricks, qaSections } from '../../data/studyData'
import ForkCarousel from './ForkCarousel'

function renderItem(item) {
  if (typeof item === 'string') return item
  return item.map((seg, i) =>
    seg.bold ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>
  )
}

function ForkTricksCard({ isOpen, onToggle }) {
  return (
    <div id="study-fork-tricks">
      <button className={styles.forkCardHeader} onClick={onToggle} aria-expanded={isOpen}>
        <div>
          <p className={styles.forkCardEyebrow}>Useful Tricks · Full Examples w/ detailed steps!</p>
          <h3 className={styles.forkCardTitle}>{forkTricks.title}</h3>
        </div>
        <span className={`${styles.forkCardChevron} ${isOpen ? styles.forkCardChevronOpen : ''}`}>›</span>
      </button>
      <Collapse isOpen={isOpen}>
        <div className={styles.forkCardBody}>
          {forkTricks.habits.map((habit, i) => (
            <div key={i} className={styles.habit}>
              <p className={styles.habitTitle}>{habit.title}</p>
              {habit.body.map((para, j) => <BodyParagraph key={j} paragraph={para} />)}
            </div>
          ))}
          {forkTricks.examples.map((example, i) => (
            <div key={example.id}>
              <BodyParagraph paragraph={forkTricks.interludes[i]} />
              <ForkCarousel example={example} />
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  )
}

function QuestionCard({ question }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.card}>
      <button className={styles.cardHeader} onClick={() => setIsOpen(v => !v)} aria-expanded={isOpen}>
        <span className={styles.cardQ}>{question.q}</span>
        <span className={`${styles.cardChevron} ${isOpen ? styles.cardChevronOpen : ''}`}>›</span>
      </button>
      <Collapse isOpen={isOpen}>
        <div className={styles.cardBody}>
          {question.a.length > 0 ? (
            <>
              <ul className={styles.answerList}>
                {question.a.map((item, i) => (
                  <li key={i} className={styles.answerItem}>
                    <span className={styles.answerBullet}>▸</span>
                    <span>{renderItem(item)}</span>
                  </li>
                ))}
              </ul>
              {question.e.length > 0 && (
                <ul className={styles.explanationList}>
                  {question.e.map((item, i) => (
                    <li key={i} className={styles.explanationItem}>
                      <span className={styles.explanationArrow}>➥</span>
                      <span>{renderItem(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className={styles.comingSoon}>Coming soon...</p>
          )}
        </div>
      </Collapse>
    </div>
  )
}

function QASection({ section, isOpen, onToggle }) {
  return (
    <div className={styles.section} id={`study-${section.id}`}>
      <button className={styles.sectionHeader} onClick={onToggle} aria-expanded={isOpen}>
        <span className={styles.sectionName}>{section.title}</span>
        <span className={styles.sectionCount}>({section.questions.length})</span>
        <span className={`${styles.sectionChevron} ${isOpen ? styles.sectionChevronOpen : ''}`}>›</span>
      </button>
      <Collapse isOpen={isOpen}>
        <div className={styles.cardList}>
          {section.questions.map((q, i) => (
            <QuestionCard key={i} question={q} />
          ))}
        </div>
      </Collapse>
    </div>
  )
}

export default function StudyPanel({ sidebarOpen, isMobile, openSections, onToggleSection }) {
  return (
    <div
      className={styles.panel}
      style={{
        paddingTop: isMobile ? '28px' : sidebarOpen ? '40px' : '70px',
        transition: 'padding-top 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className={styles.panelHeader}>
        <p className={styles.panelEyebrow}>Quiz yourself · Explanations</p>
        <h2 className={styles.panelTitle}>Study Guide</h2>
        <p className={styles.panelSub}>Attempt the questions first! · read explanations so you don't have to rely on memorization</p>
      </div>

      <ForkTricksCard
        isOpen={openSections.has('fork-tricks')}
        onToggle={() => onToggleSection('fork-tricks')}
      />

      {qaSections.map(section => (
        <QASection
          key={section.id}
          section={section}
          isOpen={openSections.has(section.id)}
          onToggle={() => onToggleSection(section.id)}
        />
      ))}
    </div>
  )
}