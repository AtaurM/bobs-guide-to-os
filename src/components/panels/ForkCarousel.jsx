import { useState } from 'react'
import styles from './ForkCarousel.module.css'

const NODE_R = 22
const V_GAP = 72
const LEAF_WIDTH = 90

function buildChildren(nodes, edges) {
  const children = {}
  nodes.forEach(n => { children[n.id] = [] })
  edges.forEach(e => { if (children[e.from] !== undefined) children[e.from].push(e.to) })
  return children
}

function countLeaves(id, children) {
  const kids = children[id] || []
  if (kids.length === 0) return 1
  return kids.reduce((sum, child) => sum + countLeaves(child, children), 0)
}

function assignPositions(id, left, right, depth, children, positions) {
  const kids = children[id] || []
  const x = (left + right) / 2

  positions[id] = {
    x,
    y: depth * (NODE_R * 2 + V_GAP) + NODE_R + 16,
  }

  if (!kids.length) return

  if (kids.length === 1) {
    const mid = (left + right) / 2
    assignPositions(kids[0], left, mid, depth + 1, children, positions)
    return
  }

  const totalLeaves = kids.reduce((sum, child) => sum + countLeaves(child, children), 0)
  let cur = left
  for (const child of kids) {
    const leaves = countLeaves(child, children)
    const childRight = cur + (right - left) * (leaves / totalLeaves)
    assignPositions(child, cur, childRight, depth + 1, children, positions)
    cur = childRight
  }
}

function buildLayout(nodes, edges) {
  if (!nodes || !nodes.length) return { positions: {}, width: 200, height: 80 }

  const children = buildChildren(nodes, edges)
  const hasParent = new Set(edges.map(e => e.to))
  const root = nodes.find(n => !hasParent.has(n.id))?.id || nodes[0].id

  const totalLeaves = countLeaves(root, children)
  const width = Math.max(160, totalLeaves * LEAF_WIDTH)

  function maxDepth(id) {
    const kids = children[id] || []
    if (!kids.length) return 0
    return 1 + Math.max(...kids.map(c => maxDepth(c)))
  }
  const depth = maxDepth(root)
  const height = (depth + 1) * (NODE_R * 2 + V_GAP) + 30

  const positions = {}
  assignPositions(root, 0, width, 0, children, positions)

  return { positions, width, height }
}

function TreeRenderer({ tree, finalTree, prevTree }) {
  const { positions, width, height } = buildLayout(finalTree.nodes, finalTree.edges)

  const currentNodeIds = new Set(tree.nodes.map(n => n.id))
  const currentEdgeKeys = new Set(tree.edges.map(e => `${e.from}-${e.to}`))
  const prevNodeIds = new Set(prevTree ? prevTree.nodes.map(n => n.id) : [])
  const prevEdgeKeys = new Set(prevTree ? prevTree.edges.map(e => `${e.from}-${e.to}`) : [])

  const currentOutputMap = {}
  tree.nodes.forEach(n => { currentOutputMap[n.id] = n.outputs || [] })
  const prevOutputMap = {}
  if (prevTree) prevTree.nodes.forEach(n => { prevOutputMap[n.id] = n.outputs || [] })

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ height, display: 'block' }}>
      {finalTree.edges.map((e, i) => {
        const from = positions[e.from]
        const to = positions[e.to]
        if (!from || !to) return null
        const key = `${e.from}-${e.to}`
        const isPresent = currentEdgeKeys.has(key)
        const isNew = isPresent && !prevEdgeKeys.has(key)
        const stroke = isNew
          ? 'rgba(255,255,255,0.9)'
          : isPresent
          ? 'rgba(255,255,255,0.2)'
          : 'rgba(255,255,255,0.05)'
        return (
          <line
            key={i}
            x1={from.x} y1={from.y + NODE_R}
            x2={to.x} y2={to.y - NODE_R}
            stroke={stroke}
            strokeWidth={isNew ? 2 : 1.5}
          />
        )
      })}

      {finalTree.nodes.map(node => {
        const pos = positions[node.id]
        if (!pos) return null
        const isPresent = currentNodeIds.has(node.id)
        const isNew = isPresent && !prevNodeIds.has(node.id)
        const outputs = currentOutputMap[node.id] || []
        const prevOuts = prevOutputMap[node.id] || []

        return (
          <g key={node.id} opacity={isPresent ? 1 : 0.1}>
            <circle
              cx={pos.x} cy={pos.y} r={NODE_R}
              fill="var(--surface)"
              stroke={isNew ? 'rgba(255,255,255,0.9)' : isPresent ? 'rgba(255,61,154,0.5)' : 'rgba(255,255,255,0.15)'}
              strokeWidth={isNew ? 2 : 1.5}
            />
            <text
              x={pos.x} y={pos.y + 5}
              textAnchor="middle"
              fill={isNew ? 'rgba(255,255,255,0.95)' : 'var(--text)'}
              fontSize="13"
              fontFamily="var(--font-display)"
              letterSpacing="0.05em"
            >
              {node.label}
            </text>
            {outputs.map((out, oi) => {
              const isNewOut = !prevOuts.includes(out) && isPresent
              return (
                <text
                  key={oi}
                  x={pos.x + NODE_R + 6 + oi * 14}
                  y={pos.y + 5}
                  textAnchor="start"
                  fill={isNewOut ? 'var(--accent)' : 'var(--accent2)'}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fontWeight={isNewOut ? 'bold' : 'normal'}
                >
                  {out}
                </text>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

function CodeBlock({ lines }) {
  return (
    <div className={styles.codeBlock}>
      {lines.map((line, i) => (
        <div
          key={i}
          className={[
            styles.codeLine,
            line.current ? styles.codeLineCurrent : '',
            line.muted   ? styles.codeLineMuted   : '',
          ].filter(Boolean).join(' ')}
        >
          <span className={styles.lineNum}>{i + 1}</span>
          <span className={styles.lineText}>{line.line}</span>
        </div>
      ))}
    </div>
  )
}

export default function ForkCarousel({ example }) {
  const [stepIndex, setStepIndex] = useState(0)
  const steps = example.steps
  if (!steps || !steps.length) return null

  const step = steps[stepIndex]
  const prevStep = stepIndex > 0 ? steps[stepIndex - 1] : null
  const finalStep = steps[steps.length - 1]

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselHeader}>
        <span className={styles.processLabel}>
          {step.process ? `Process ${step.process}` : 'Setup'}
        </span>
        <span className={styles.stepCounter}>{stepIndex + 1} / {steps.length}</span>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className={styles.nav}>
        <button
          className={styles.navBtn}
          onClick={() => setStepIndex(i => i - 1)}
          disabled={stepIndex === 0}
        >
          ‹ Prev
        </button>
        <button
          className={styles.navBtn}
          onClick={() => setStepIndex(i => i + 1)}
          disabled={stepIndex === steps.length - 1}
        >
          Next ›
        </button>
      </div>

      <div className={styles.contentRow}>
        <div className={styles.codeCol}>
          <p className={styles.colLabel}>Code</p>
          <CodeBlock lines={step.code} />
        </div>
        <div className={styles.treeCol}>
          <p className={styles.colLabel}>Process Tree</p>
          {stepIndex > 0 ? (
            <div className={styles.treeWrap}>
              <TreeRenderer
                tree={step.tree}
                finalTree={finalStep.tree}
                prevTree={prevStep?.tree || null}
              />
            </div>
          ) : (
            <div className={styles.treeWrapEmpty}>
              <span className={styles.treeEmptyLabel}>Try it first!</span>
            </div>
          )}
        </div>
      </div>

      <p className={styles.action}>{step.action}</p>

      {step.finalOutput && (
        <div className={styles.finalOutput}>
          <span className={styles.finalLabel}>Final output:</span>
          <code className={styles.finalCode}>{step.finalOutput}</code>
        </div>
      )}
    </div>
  )
}