import qrData from '../../data/qrData'
import styles from './QRPanel.module.css'

export default function QRPanel() {
    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <p className={styles.panelEyebrow}>Quick Reference · All definitions · Fast</p>
                <h2 className={styles.panelTitle}>Quick<br />Reference</h2>
                <p className={styles.panelSub}>{qrData.length} terms · grouped by topic</p>
            </div>
            <div className={styles.grid}>
                {qrData.map((card) => (
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
        </div>
    )
}