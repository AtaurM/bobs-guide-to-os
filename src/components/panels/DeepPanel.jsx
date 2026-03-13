import { useState } from 'react'
import deepDiveData from '../../data/deepDiveData'
import styles from './DeepPanel.module.css'

// parse type of paragraph
function BodyParagraph({ paragraph }) {
    if (typeof paragraph === 'string') {
        return <p className={styles.bodyPara}>{paragraph}</p>
    }

    return (
        <p className={styles.bodyPara}>
            {paragraph.map((seg, i) =>
                seg.bold
                    ? <strong key={i}>{seg.text}</strong>
                    : <span key={i}>{seg.text}</span>
            )}
        </p>
    )
}

function DeepSection({ section }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.section}>
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.headerInner}>
                    <div>
                        <p className={styles.sectionSub}>{section.sub}</p>
                        <h3 className={styles.sectionTitle}>{section.title}</h3>
                    </div>
                    <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>›</span>
                </div>
            </button>

            {isOpen && (
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
                                        <strong className={styles.termName}>{term.t}</strong>
                                        <span className={styles.termDef}>{term.d}</span>
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
                                    <li key={i} className={styles.examItem}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default function DeepPanel() {
    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <p className={styles.panelTop}>Deep Dive · Full Concept Explanations</p>
                <h2 className={styles.panelTitle}>In-Depth Explanations</h2>
                <p className={styles.panelSub}>Click any section to expand it.</p>
            </div>

            {deepDiveData.map((section) => (
                <DeepSection key={section.title} section={section} />
            ))}
        </div>
    )
}