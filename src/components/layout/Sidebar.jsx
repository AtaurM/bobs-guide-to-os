import styles from './Sidebar.module.css'

export default function Sidebar({ sections, activeIndex, onSectionClick }) {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                {sections.map((section, i) => (
                    <button
                        key={section.id}
                        className={`${styles.navItem} ${i === activeIndex ? styles.navItemActive : ''}`}
                        onClick={() => onSectionClick(i, section.id)}
                        aria-label={`Go to ${section.label}`}
                    >
                        <span className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`} />
                        <span className={`${styles.label} ${i === activeIndex ? styles.labelActive : ''}`}>
                            {section.label}
                        </span>
                    </button>
                ))}
            </nav>
        </aside>
    )
}