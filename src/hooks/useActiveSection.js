import { useState, useEffect } from 'react'

export default function useActiveSection(sectionIds, scrollRef, resetKey) {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveIndex(0);

        const container = scrollRef?.current;
        if (!container || sectionIds.length === 0) return;

        function findActive() {
            const containerTop = container.getBoundingClientRect().top;
            const TRIGGER_OFFSET = 280; // gap from container top; "reading line"
            
            let bestIndex = 0;
            let bestDistance = Infinity;
            
            sectionIds.forEach((id, i) => {
                const el = document.getElementById(id);
                if (!el) return;

                const distance = el.getBoundingClientRect().top - containerTop - TRIGGER_OFFSET;

                if (distance <= 0 && Math.abs(distance) < bestDistance) {
                    bestDistance = Math.abs(distance);
                    bestIndex = i;
                }
            })
        
            setActiveIndex(bestIndex);
        }
        
        const timer = setTimeout(findActive, 50);

        container.addEventListener('scroll', findActive, { passive: true });

        return () => {
            clearTimeout(timer);
            container.removeEventListener('scroll', findActive);
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetKey, scrollRef])

    return activeIndex;
}