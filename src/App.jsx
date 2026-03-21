import { useRef, useState, useEffect } from 'react'
import { SearchContext } from './context/SearchContext'
import styles from './App.module.css'
import DeepPanel from './components/panels/DeepPanel'
import QRPanel from './components/panels/QRPanel'
import StudyPanel from './components/panels/StudyPanel'
import ProgressBar from './components/layout/ProgressBar'
import Sidebar from './components/layout/Sidebar'
import ModeBar from './components/layout/ModeBar'
import SearchBar from './components/common/SearchBar'
import useScrollProgress from './hooks/useScrollProgress'
import useActiveSection from './hooks/useActiveSection'
import useIsMobile from './hooks/useIsMobile'
import deepDiveData from './data/deepDiveData'
import qrData from './data/qrData'
import { qaSections } from './data/studyData'
import { deepSectionId } from './utils/searchUtils'
import { qrTagId } from './utils/searchUtils'

const SIDEBAR_WIDTH = 230
const MODE_ORDER = ['guide', 'deep', 'qr', 'study']

const QR_TAGS = [...new Set(qrData.map(c => c.tag))]
const QR_SECTION_IDS = QR_TAGS.map(tag => qrTagId(tag))
const QR_NAV_ITEMS = QR_TAGS.map(tag => ({
  id: qrTagId(tag),
  label: tag,
}))

const DEEP_NAV_ITEMS = deepDiveData.map(s => ({
  id: deepSectionId(s.title),
  label: s.title,
}))
const DEEP_SECTION_IDS = DEEP_NAV_ITEMS.map(s => s.id)

const STUDY_NAV_ITEMS = [
  { id: 'study-fork-tricks', label: 'Forking Tricks' },
  ...qaSections.map(s => ({ id: `study-${s.id}`, label: s.title })),
]
const STUDY_SECTION_IDS = STUDY_NAV_ITEMS.map(s => s.id)

export default function App() {
  const mainRef = useRef(null)
  const isMobile = useIsMobile(900)
  const progress = useScrollProgress(mainRef)
  const [searchQuery, setSearchQuery] = useState('')

  const [openSections, setOpenSections] = useState(new Set())
  const [deepAllOpen, setDeepAllOpen] = useState(false)

  const [openGroups, setOpenGroups] = useState(() => new Set(QR_TAGS))
  const [qrAllOpen, setQrAllOpen] = useState(true)

  const [openStudySections, setOpenStudySections] = useState(new Set())
  const [studyAllOpen, setStudyAllOpen] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [transitioning, setTransitioning] = useState('idle')
  const [vpWidth, setVpWidth] = useState(() => window.innerWidth)
  const [mode, setMode] = useState('deep')

  const sidebarItems = mode === 'deep' ? DEEP_NAV_ITEMS
    : mode === 'qr' ? QR_NAV_ITEMS
    : mode === 'study' ? STUDY_NAV_ITEMS
    : []

  const currentSectionIds = mode === 'deep' ? DEEP_SECTION_IDS
    : mode === 'qr' ? QR_SECTION_IDS
    : mode === 'study' ? STUDY_SECTION_IDS
    : []

  const activeIndex = useActiveSection(currentSectionIds, mainRef, mode)

  const allOpen = mode === 'deep' ? deepAllOpen
    : mode === 'qr' ? qrAllOpen
    : mode === 'study' ? studyAllOpen
    : false

  useEffect(() => {
    function onResize() { setVpWidth(window.innerWidth) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleModeChange(newMode) {
    if (newMode === mode) return
    const oldIndex = MODE_ORDER.indexOf(mode)
    const newIndex = MODE_ORDER.indexOf(newMode)
    const goingRight = newIndex > oldIndex
    setTransitioning(goingRight ? 'out-left' : 'out-right')
    setTimeout(() => {
      setMode(newMode)
      setSearchQuery('')
      if (mainRef.current) mainRef.current.scrollTop = 0
      setTransitioning(goingRight ? 'in-right' : 'in-left')
      setTimeout(() => setTransitioning('idle'), 200)
    }, 150)
  }

  function toggleSection(id) {
    setOpenSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleGroup(tag) {
    setOpenGroups(prev => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })
  }

  function toggleStudySection(id) {
    setOpenStudySections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleDeepToggleAll() {
    const allIds = DEEP_NAV_ITEMS.map(s => s.id)
    if (deepAllOpen) {
      setOpenSections(new Set())
      setDeepAllOpen(false)
    } else {
      setOpenSections(new Set(allIds))
      setDeepAllOpen(true)
    }
  }

  function handleQrToggleAll() {
    if (qrAllOpen) {
      setOpenGroups(new Set())
      setQrAllOpen(false)
    } else {
      setOpenGroups(new Set(QR_TAGS))
      setQrAllOpen(true)
    }
  }

  function handleStudyToggleAll() {
    const allIds = qaSections.map(s => s.id)
    if (studyAllOpen) {
      setOpenStudySections(new Set())
      setStudyAllOpen(false)
    } else {
      setOpenStudySections(new Set(allIds))
      setStudyAllOpen(true)
    }
  }

  function scrollToId(index, id) {
    const el = document.getElementById(id)
    const container = mainRef.current
    const elTop = el?.getBoundingClientRect().top
    const containerTop = container?.getBoundingClientRect().top
    const distance = elTop - containerTop - 70

    if (mode === 'deep') {
      const isCurrentlyOpen = openSections.has(id)
      if (!isCurrentlyOpen || Math.abs(distance) < 5) toggleSection(id)
    } else if (mode === 'qr') {
      const tag = QR_TAGS.find(t => qrTagId(t) === id)
      if (tag) {
        const isCurrentlyOpen = openGroups.has(tag)
        if (!isCurrentlyOpen || Math.abs(distance) < 5) toggleGroup(tag)
      }
    } else if (mode === 'study') {
      const isCurrentlyOpen = openStudySections.has(id)
      if (!isCurrentlyOpen || Math.abs(distance) < 5) toggleStudySection(id)
    }

    if (!el || !container) return
    const target = container.scrollTop + distance
    container.scrollTo({ top: target, behavior: 'smooth' })
  }

  const sidebarWidth = sidebarOpen ? SIDEBAR_WIDTH : 0
  const TRANSITION = '0.28s cubic-bezier(0.4, 0, 0.2, 1)'
  const TAB_WIDTH = 36
  const MOBILE_MARGIN = 16
  const PANEL_MAX_WIDTH = 800

  const openLeft = 16
  const openWidth = SIDEBAR_WIDTH - 28

  const closedLeft = isMobile
    ? MOBILE_MARGIN + TAB_WIDTH + 8
    : Math.max(16, vpWidth / 2 - PANEL_MAX_WIDTH / 2)
  const closedWidth = isMobile
    ? vpWidth - MOBILE_MARGIN - TAB_WIDTH - 8 - MOBILE_MARGIN
    : Math.min(PANEL_MAX_WIDTH, vpWidth - 32)
  const closedTop = isMobile ? 20 : 40

  const searchStyle = sidebarOpen
    ? {
        top: 20,
        left: openLeft,
        width: openWidth,
        transition: `top ${TRANSITION}, left ${TRANSITION}, width ${TRANSITION}`,
      }
    : {
        top: closedTop,
        left: closedLeft,
        width: closedWidth,
        transition: `top ${TRANSITION}, left ${TRANSITION}, width ${TRANSITION}`,
      }

  const mainClass = [
    transitioning === 'out-left'  ? styles.slideOutLeft  : '',
    transitioning === 'out-right' ? styles.slideOutRight : '',
    transitioning === 'in-left'   ? styles.slideInLeft   : '',
    transitioning === 'in-right'  ? styles.slideInRight  : '',
  ].filter(Boolean).join(' ') || undefined

  const toggleAllFn = mode === 'deep' ? handleDeepToggleAll
    : mode === 'qr' ? handleQrToggleAll
    : mode === 'study' ? handleStudyToggleAll
    : null

  return (
    <SearchContext.Provider value={searchQuery}>
      <div className={styles.root}>
        <ProgressBar progress={progress} />

        {isMobile && sidebarOpen && (
          <div
            className={styles.backdrop}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          sections={sidebarItems}
          activeIndex={activeIndex}
          onSectionClick={scrollToId}
          allOpen={allOpen}
          onToggleAll={toggleAllFn}
          isOpen={sidebarOpen}
        />

        <button
          className={`${styles.sidebarTab} ${isMobile ? styles.sidebarTabMobile : ''} ${isMobile && !sidebarOpen ? styles.sidebarTabMobileClosed : ''}`}
          onClick={() => setSidebarOpen(v => !v)}
          style={{
            left: sidebarOpen ? SIDEBAR_WIDTH : (isMobile ? 16 : 0),
            transition: `left ${TRANSITION}`,
          }}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? '‹' : '›'}
        </button>

        {!sidebarOpen && (
          <div
            className={styles.searchBlur}
            style={{ left: 0, transition: `left ${TRANSITION}` }}
          />
        )}

        <div className={styles.searchArea} style={searchStyle}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            centered={!sidebarOpen || isMobile}
            highlighted={!sidebarOpen || isMobile}
          />
        </div>

        <main
          ref={mainRef}
          className={styles.main}
          style={{
            marginLeft: isMobile ? 0 : sidebarWidth,
            paddingTop: 54,
            paddingBottom: isMobile ? 80 : 0,
            paddingLeft: isMobile ? 16 : 0,
            paddingRight: isMobile ? 16 : 0,
            transition: `margin-left ${TRANSITION}`,
          }}
        >
          <div className={mainClass} style={{ minHeight: '100%' }}>
            {mode === 'guide' && (
              <div className={styles.comingSoon}>Coming later</div>
            )}
            {mode === 'deep' && (
              <DeepPanel
                openSections={openSections}
                onToggleSection={toggleSection}
                sidebarOpen={sidebarOpen && !isMobile}
                isMobile={isMobile}
              />
            )}
            {mode === 'qr' && (
              <QRPanel
                sidebarOpen={sidebarOpen && !isMobile}
                openGroups={openGroups}
                onToggleGroup={toggleGroup}
                isMobile={isMobile}
              />
            )}
            {mode === 'study' && (
              <StudyPanel
                sidebarOpen={sidebarOpen && !isMobile}
                isMobile={isMobile}
                openSections={openStudySections}
                onToggleSection={toggleStudySection}
              />
            )}
          </div>
        </main>

        {!isMobile && (
          <div className={styles.topRight}>
            <ModeBar mode={mode} onModeChange={handleModeChange} isMobile={false} />
          </div>
        )}

        {isMobile && (
          <ModeBar mode={mode} onModeChange={handleModeChange} isMobile={true} />
        )}

      </div>
    </SearchContext.Provider>
  )
}