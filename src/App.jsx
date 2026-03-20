import { useRef, useState } from 'react'
import { SearchContext } from './context/SearchContext'
import styles from './App.module.css'
import DeepPanel from './components/panels/DeepPanel'
import QRPanel from './components/panels/QRPanel'
import ProgressBar from './components/layout/ProgressBar'
import Sidebar from './components/layout/Sidebar'
import ModeBar from './components/layout/ModeBar'
import SearchBar from './components/common/SearchBar'
import useScrollProgress from './hooks/useScrollProgress'
import useActiveSection from './hooks/useActiveSection'
import deepDiveData from './data/deepDiveData'
import qrData from './data/qrData'
import { deepSectionId } from './utils/searchUtils'
import { qrTagId } from './utils/searchUtils'

const SIDEBAR_WIDTH = 230

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

export default function App() {
  const mainRef = useRef(null)
  const progress = useScrollProgress(mainRef)
  const [searchQuery, setSearchQuery] = useState('')
  const [openSections, setOpenSections] = useState(new Set())
  const [allOpen, setAllOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  const [mode, setMode] = useState('deep')
  const sidebarItems = mode === 'deep' ? DEEP_NAV_ITEMS : QR_NAV_ITEMS
  const currentSectionIds = mode === 'deep' ? DEEP_SECTION_IDS : QR_SECTION_IDS

  const activeIndex = useActiveSection(currentSectionIds, mainRef, mode)
  
  function handleModeChange(newMode) {
    setMode(newMode)
    setSearchQuery('')
    if (mainRef.current) mainRef.current.scrollTop = 0
  }


  function toggleSection(id) {
    setOpenSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleToggleAll() {
    const allIds = DEEP_NAV_ITEMS.map(s => s.id)
    if (allOpen) {
      setOpenSections(new Set())
      setAllOpen(false)
    } else {
      setOpenSections(new Set(allIds))
      setAllOpen(true)
    }
  }

  function scrollToId(index, id) {
    const el = document.getElementById(id)
    const container = mainRef.current

    const elTop = el?.getBoundingClientRect().top
    const containerTop = container?.getBoundingClientRect().top
    const distance = elTop - containerTop - 70

    const isCurrentlyOpen = openSections.has(id)
    if (!isCurrentlyOpen || Math.abs(distance) < 5) {
      toggleSection(id)
    }

    if (!el || !container) return
    const target = container.scrollTop + distance
    container.scrollTo({ top: target, behavior: 'smooth' })
  }

  const TRANSITION = '0.28s cubic-bezier(0.4, 0, 0.2, 1)'

  const searchStyle = sidebarOpen
    ? {
        left: 16,
        width: SIDEBAR_WIDTH - 28,
        transition: `top ${TRANSITION}, left ${TRANSITION}, width ${TRANSITION}`,
      }
    : {
        top: 40,
        left: 'max(16px, calc(50vw - 400px))',
        width: 'min(800px, calc(100vw - 32px))',
        transition: `top ${TRANSITION}, left ${TRANSITION}, width ${TRANSITION}`,
      }

  return (
    <SearchContext.Provider value={searchQuery}>
      <div className={styles.root}>
        <ProgressBar progress={progress} />

        <Sidebar
          sections={sidebarItems}
          activeIndex={activeIndex}
          onSectionClick={scrollToId}
          allOpen={allOpen}
          onToggleAll={handleToggleAll}
          isOpen={sidebarOpen}
        />

        <button
          className={styles.sidebarTab}
          onClick={() => setSidebarOpen(v => !v)}
          style={{
            left: sidebarOpen ? SIDEBAR_WIDTH : 0,
            transition: `left ${TRANSITION}`,
          }}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? '‹' : '›'}
        </button>

        { !sidebarOpen && <div
          className={styles.searchBlur}
          style={{
            left: sidebarOpen ? SIDEBAR_WIDTH : 0,
            transition: `left ${TRANSITION}`,
          }}
        /> }

        <div className={styles.searchArea} style={searchStyle}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            centered={!sidebarOpen}
            highlighted={!sidebarOpen}
          />
        </div>

        <main
          ref={mainRef}
          className={styles.main}
          style={{
            marginLeft: sidebarOpen ? SIDEBAR_WIDTH : 0,
            paddingTop: 54,
          }}
        >

          {mode === 'guide' && (
            <div class={styles.comingSoon}>
              Coming later
            </div>
          )}

          {mode === 'deep' &&
            <DeepPanel
              openSections={openSections}
              onToggleSection={toggleSection}
              sidebarOpen={sidebarOpen}
            /> }
          
          {mode === 'qr' && <QRPanel sidebarOpen={sidebarOpen} /> }

          {mode === 'study' && (
            <div class={styles.comingSoon}>
              Coming soon by tonight!
            </div>
          )}
          
        </main>

        <div className={styles.topRight}>
          <ModeBar mode={mode} onModeChange={handleModeChange} />
        </div>

      </div>
    </SearchContext.Provider>
  )
}