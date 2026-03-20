import { useState } from 'react'
import qrData from '../../data/qrData'
import styles from './QRPanel.module.css'
import Collapse from '../common/Collapse'
import { qrTagId } from '../../utils/searchUtils'

function CardGroup({ tag, cards }) {
    const [isOpen, setIsOpen] = useState(true)
    
    return (
        <div className={styles.group} id={qrTagId(tag)}>
            <button
                className={styles.groupHeader}
                onClick={() => setIsOpen(v => !v)}
                aria-expanded={isOpen}
            >
                <span className={styles.groupName}>{tag}</span>
                <span className={styles.groupCount}>({cards.length})</span>
                <span className={`${styles.groupChevron} ${isOpen ? styles.groupChevronOpen : ''}`}>
                    ›
                </span>
            </button>
        <Collapse isOpen={isOpen}>
            <div className={styles.grid}>
                {cards.map((card) => (
                    <div key={card.term} className={styles.card}>
                        <p className={styles.cardTag}>{card.tag}</p>
                        <h3 className={styles.cardTerm}>{card.term}</h3>
                        <p className={styles.cardDef}>{card.def}</p>
                        <ul className={styles.points}>
                            {card.points.map((point, i) => (
                                <li key={i} className={styles.point}>
                                    <span className={styles.bullet}>▸</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            </Collapse>
        </div>
    )
}

export default function QRPanel({ sidebarOpen }) {
    const tags = [...new Set(qrData.map(c => c.tag))]

    return (
        <div
            className={styles.panel} 
            style={{
                paddingTop: sidebarOpen ? '40px' : '70px',
                transition: 'padding-top 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
            <div className={styles.panelHeader}>
                <p className={styles.panelEyebrow}>Quick Reference · All term definitions</p>
                <h2 className={styles.panelTitle}>Quick<br />Reference</h2>
                <p className={styles.panelSub}>{qrData.length} terms · grouped by topic</p>
            </div>

            {tags.map(tag => (
                <CardGroup
                    key={tag}
                    tag={tag}
                    cards={qrData.filter(c => c.tag === tag)}
                />
            ))}
        </div>
    )
}