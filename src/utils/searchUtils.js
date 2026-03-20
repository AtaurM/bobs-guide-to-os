export function deepSectionId(title) {
    return `deep-${title.replace(/\s+/g, '-').toLowerCase()}`
}

export function qrTagId(tag) {
    return `qr-${tag.replace(/\s+/g, '-').toLowerCase()}`
}

export function deepMatchesQuery(section, query) {
    if (!query || !query.trim()) return true;

    const q = query.toLowerCase();

    if (section.title?.toLowerCase().includes(q)) return true;
    if (section.sub?.toLowerCase().includes(q)) return true;
    
    // body can be strings or arrays of { text, bold }
    if (section.body?.some(para => {
        if (typeof para === 'string') return para.toLowerCase().includes(q);
        if (Array.isArray(para)) return para.some(seg =>
            seg.text?.toLowerCase().includes(q))
                return false;
    })) return true;

    if (section.terms?.some(term =>
        term.t?.toLowerCase().includes(q) ||
        term.d?.toLowerCase().includes(q)
    )) return true;

    if (section.exam?.some(tip => tip.toLowerCase().includes(q))) return true;

    return false
    
}