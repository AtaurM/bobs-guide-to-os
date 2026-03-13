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
                </div>
            )}
        </div>
    )
}

export default function DeepPanel() {
    return (
        <div className={styles.panel}>
            <h2 className={styles.panelTitle}>In-Depth Explanations</h2>

            {deepDiveData.map((section) => (
                <DeepSection key={section.title} section={section} />
            ))}
        </div>
    )
}