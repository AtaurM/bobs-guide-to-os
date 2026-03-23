import styles from './Sidebar.module.css'

export default function Sidebar({ sections, activeIndex, onSectionClick, allOpen, onToggleAll, isOpen }) {
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <nav className={styles.nav}>
                {sections.map((section, i) => {
                    const isActive = i === activeIndex
                    return (
                        <button
                            key={section.id}
                            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                            onClick={() => onSectionClick(i, section.id)}
                            aria-label={`Go to ${section.label}`}
                        >
                            <span className={`${styles.dot} ${isActive ? styles.dotActive : ''}`} />
                            <span className={`${styles.label} ${isActive ? styles.labelActive : ''}`}>
                                {section.label}
                            </span>
                        </button>
                    )
                })}
            </nav>

            <button className={styles.toggleAll} onClick={onToggleAll}>
                {allOpen ? 'Close all' : 'Open all'}
            </button>
        </aside>
    )
}