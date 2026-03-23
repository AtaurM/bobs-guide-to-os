function slugId(prefix, str) {
    return `${prefix}-${str.replace(/\s+/g, '-').toLowerCase()}`
}

export function deepSectionId(title) { return slugId('deep', title) }

function extractText(item) {
    if (typeof item === 'string') return item.toLowerCase()
    if (Array.isArray(item)) return item.map(seg => seg.text || '').join('').toLowerCase()
    return ''
}

export function deepMatchesQuery(section, query) {
    if (!query || !query.trim()) return true;

    const q = query.toLowerCase();

    if (section.title?.toLowerCase().includes(q)) return true;
    if (section.sub?.toLowerCase().includes(q)) return true;
    if (section.body?.some(para => extractText(para).includes(q))) return true;

    if (section.terms?.some(term =>
        term.t?.toLowerCase().includes(q) ||
        term.d?.toLowerCase().includes(q)
    )) return true;

    if (section.exam?.some(tip => tip.toLowerCase().includes(q))) return true;

    return false
}

export function studyMatchesQuery(question, query) {
    if (!query || !query.trim()) return true
    const q = query.toLowerCase()
    if (question.q?.toLowerCase().includes(q)) return true
    if (question.a?.some(item => extractText(item).includes(q))) return true
    if (question.e?.some(item => extractText(item).includes(q))) return true
    return false
}

export function qrTagId(tag) { return slugId('qr', tag) }

export function qrMatchesQuery(card, query) {
    if (!query || !query.trim()) return true

    const q = query.toLowerCase();
    return (
        card.tag?.toLowerCase().includes(q) ||
        card.term?.toLowerCase().includes(q) ||
        card.def?.toLowerCase().includes(q) ||
        card.points?.some(p => p.toLowerCase().includes(q))
    )
}
