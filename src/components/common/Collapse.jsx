// smoothly animates height from 0 to natural height w/ grid-template-rows

import styles from './Collapse.module.css'

export default function Collapse({ isOpen, children }) {
    return (
        <div
            className={`${styles.outer} ${isOpen ? styles.open : ''}`}
            aria-hidden={!isOpen}
        >
            <div className={styles.inner}>
                {children}
            </div>
        </div>
    )
}
