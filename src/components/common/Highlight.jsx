import { useSearch } from "../../context/SearchContext";
import styles from './Highlight.module.css'

export default function Highlight({ text }) {
    const query = useSearch();

    if (!query || !query.trim() || !text) {
        return <>{text}</>;
    }

    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const parts = text.split(new RegExp(`(${escaped})`, 'i'));

    return (
        <>
            {parts.map((part, i) => 
                part.toLowerCase() === query.toLowerCase()
                    ? <mark key={i} className={styles.mark}>{part}</mark>
                    : <span key={i}>{part}</span>
            )}
        </>
    )
}