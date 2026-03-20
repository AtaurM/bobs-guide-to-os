import { useState } from 'react'
import deepDiveData from '../../data/deepDiveData'
import styles from './DeepPanel.module.css'
import Collapse from '../common/Collapse'
import Highlight from '../common/Highlight'
import { useSearch } from '../../context/SearchContext'
import { deepSectionId, deepMatchesQuery } from '../../utils/searchUtils'

function InlineContent({ content }) {
  if (typeof content === 'string') return <Highlight text={content} />
  return content.map((seg, i) =>
    seg.bold
      ? <strong key={i} className={styles.bold}><Highlight text={seg.text} /></strong>
      : <Highlight key={i} text={seg.text} />
  )
}

// parse type of paragraph
function BodyParagraph({ paragraph }) {
  if (paragraph.list) {
    return (
      <ol className={styles.numberedList}>
        {paragraph.list.map((item, i) => (
          <li key={i} className={styles.listItem}>
            <span className={styles.listNum}>{i + 1})</span>
            <span className={styles.listText}><InlineContent content={item} /></span>
          </li>
        ))}
      </ol>
    )
  }

  if (typeof paragraph === 'string') {
    return <p className={styles.bodyPara}><Highlight text={paragraph} /></p>
  }

  return (
    <p className={styles.bodyPara}>
      <InlineContent content={paragraph} />
    </p>
  )
}

function DeepSection({ section, isOpen, onToggle }) {
    return (
        <div className={styles.section} id={deepSectionId(section.title)}>
            <button className={styles.header} onClick={onToggle}>
                <div className={styles.headerInner}>
                    <div>
                        <p className={styles.sectionSub}><Highlight text={section.sub} /></p>
                        <h3 className={styles.sectionTitle}><Highlight text={section.title} /></h3>
                    </div>
                    <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>›</span>
                </div>
            </button>

            <Collapse isOpen={isOpen}>
                <div className={styles.content}>
                    {section.body.map((para, i) => (
                        <BodyParagraph key={i} paragraph={para} />
                    ))}

                    {/* terms and tips are optional */}
                    {section.terms && (
                        <div className={styles.terms}>
                            <p className={styles.termsLabel}>Key Terms</p>
                            <div className={styles.termList}>
                                {section.terms.map((term, i) => (
                                    <div key={i} className={styles.term}>
                                        <strong className={styles.termName}><Highlight text={term.t} /></strong>
                                        <span className={styles.termDef}><Highlight text={term.d} /></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {section.exam && (
                        <div className={styles.exam}>
                            <p className={styles.examLabel}>⚡ Exam Tips</p>
                            <ul className={styles.examList}>
                                {section.exam.map((tip, i) => (
                                    <li key={i} className={styles.examItem}><Highlight text={`➥ ${tip}`} /></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Collapse>
        </div>
    )
}

export default function DeepPanel({ openSections, onToggleSection, sidebarOpen, isMobile }) {
    const query = useSearch()
    const hasQuery = query.trim().length > 0;
    const [othersOpen, setOthersOpen] = useState(false)

    const matchingSections = deepDiveData.filter(s => deepMatchesQuery(s, query));
    const otherSections = deepDiveData.filter(s => !deepMatchesQuery(s, query));

    return (
        <div
            className={styles.panel}
            style={{
                paddingTop: isMobile ? '28px' : sidebarOpen ? '40px' : '70px',
                transition: 'padding-top 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <div className={styles.panelHeader}>
                <p className={styles.panelTop}>Deep Dive · Concept Explanations</p>
                <h2 className={styles.panelTitle}>Bob's Guide to OS</h2>
                <p className={styles.panelSub2}>QUESTION EXPLANATIONS COMING OUT LATER TODAY!</p>
                <p className={styles.panelSub}>Click any section to expand it. This is JUST for understanding. Use terms tab for definitions.</p>
            </div>

            {matchingSections.map((section) => {
                const id = deepSectionId(section.title);
                return (
                    <DeepSection
                        key={section.title}
                        section={section}
                        isOpen={openSections.has(id) || hasQuery}
                        onToggle={() => onToggleSection(id)}
                    />
                )
            })}

            {hasQuery && otherSections.length > 0 && (
                <div className={styles.others}>
                    <button
                        className={styles.othersToggle}
                        onClick={() => setOthersOpen(v => !v)}
                    >
                        <span>{othersOpen ? '▾' : '▸'}</span>
                        <span>Other sections ({otherSections.length})</span>
                    </button>

                    <Collapse isOpen={othersOpen}>
                        <div>
                            {otherSections.map((section) => (
                                <div key={section.title} className={styles.othersItem}>
                                    <DeepSection section={section} />
                                </div>
                            ))}
                        </div>
                    </Collapse>
                </div>
            )}

        </div>
    )
}