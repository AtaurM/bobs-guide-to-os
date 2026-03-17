import { useState, useEffect } from "react";

// return percentage of element scrolled
export default function useScrollProgress(ref) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
    
        function handleScroll() {
            const scrollable = el.scrollHeight - el.clientHeight;
            if (scrollable === 0) {
                setProgress(100);
                return;
            }
            const pct = (el.scrollTop / scrollable) * 100;
            setProgress(Math.min(100, Math.max(0, pct)));
        }

        el.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll()

        return () => el.removeEventListener('scroll', handleScroll)
    }, [ref])

    return progress
}