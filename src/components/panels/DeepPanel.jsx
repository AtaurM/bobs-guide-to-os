import deepDiveData from '../../data/deepDiveData'
import styles from './DeepPanel.module.css'

export default function DeepPanel() {
    return (
        <div className={styles.panel}>
            <h2 className={styles.panelTitle}>In-Depth Explanations</h2>

            {deepDiveData.map((section) => (
                <div key={section.title} className={styles.section}>
                    <p className={styles.sectionSub}>{section.sub}</p>
                    <h3 className={styles.sectionTitle}>{section.title}</h3>
                </div>
            ))}
        </div>
    )
}