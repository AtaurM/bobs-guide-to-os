import { useState, useEffect } from 'react'
import deepDiveData from '../../data/deepDiveData'
import styles from './DeepPanel.module.css'
import Collapse from '../common/Collapse'
import Highlight from '../common/Highlight'
import { useSearch } from '../../context/SearchContext'
import { deepSectionId, deepMatchesQuery } from '../../utils/searchUtils'

// parse type of paragraph
function BodyParagraph({ paragraph }) {
    if (typeof paragraph === 'string') {
        return <p className={styles.bodyPara}><Highlight text={paragraph} /></p>
    }

    return (
        <p className={styles.bodyPara}>
            {paragraph.map((seg, i) =>
                seg.bold
                    ? <strong key={i}><Highlight text={seg.text} /></strong>
                    : <Highlight key={i} text={seg.text} />
            )}
        </p>
    )
}

function DeepSection({ section, forceOpen }) {
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (forceOpen) setIsOpen(true);
    }, [forceOpen])

    return (
        <div className={styles.section} id={deepSectionId(section.title)}>
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
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
                                    <li key={i} className={styles.examItem}><Highlight text={tip} /></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Collapse>
        </div>
    )
}

export default function DeepPanel() {
    const query = useSearch()
    const hasQuery = query.trim().length > 0;
    const [othersOpen, setOthersOpen] = useState(false)

    const matchingSections = deepDiveData.filter(s => deepMatchesQuery(s, query));
    const otherSections = deepDiveData.filter(s => !deepMatchesQuery(s, query));

    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <p className={styles.panelTop}>Deep Dive · Full Concept Explanations</p>
                <h2 className={styles.panelTitle}>In-Depth Explanations</h2>
                <p className={styles.panelSub}>Click any section to expand it.</p>
            </div>

            {matchingSections.map((section) => (
                <DeepSection key={section.title} section={section} forceOpen={hasQuery} />
            ))}

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
                                    <DeepSection section={section} forceOpen={false} />
                                </div>
                            ))}
                        </div>
                    </Collapse>
                </div>
            )}

        </div>
    )
}