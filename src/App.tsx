import { useEffect, useMemo, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { AnimatePresence, motion } from 'motion/react'
import { AtlasNode } from './AtlasNode'
import { selectedSource } from './data/sources'
import { layoutGraph } from './layout'
import type { AtlasNodeData, SemanticGraph, SemanticGraphNode } from './types'

const nodeTypes = { atlas: AtlasNode }

function descendants(graph: SemanticGraph, root: string) {
  const visible = new Set([root])
  let changed = true
  while (changed) {
    changed = false
    for (const edge of graph.edges) {
      if (visible.has(edge.source) && !visible.has(edge.target)) {
        visible.add(edge.target)
        changed = true
      }
    }
  }
  return visible
}

function accentFor(node: SemanticGraphNode, lookup: Map<string, SemanticGraphNode>, graph: SemanticGraph) {
  if (node.accent) return node.accent
  const parent = graph.edges.find((edge) => edge.target === node.id)
  return parent ? lookup.get(parent.source)?.accent : undefined
}

function buildGraph(graph: SemanticGraph, focus: string) {
  const root = graph.nodes.find((node) => node.kind === 'portfolio')?.id ?? graph.nodes[0]?.id
  const visibleIds = focus === 'all' ? new Set(graph.nodes.map((node) => node.id)) : descendants(graph, focus)
  if (root) visibleIds.add(root)
  const lookup = new Map(graph.nodes.map((node) => [node.id, node]))

  const nodes: Node<AtlasNodeData>[] = graph.nodes
    .filter((node) => visibleIds.has(node.id))
    .map((node) => ({
      id: node.id,
      type: 'atlas',
      position: { x: 0, y: 0 },
      data: {
        kind: node.kind === 'portfolio' ? 'portfolio' : node.kind === 'project' || node.kind === 'initiative' ? 'project' : 'capability',
        title: node.title,
        subtitle: node.kind === 'portfolio'
          ? `${graph.nodes.filter((item) => item.kind === 'project').length} проектов · ${graph.nodes.length - 1} узлов`
          : node.subtitle,
        accent: accentFor(node, lookup, graph),
        maturity: node.maturity,
        status: node.status,
        rationale: node.rationale,
        projectId: node.source?.externalId,
      },
    }))

  const edges: Edge[] = graph.edges
    .filter((edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target))
    .map((edge) => {
      const target = lookup.get(edge.target)
      const accent = target ? accentFor(target, lookup, graph) : '#8b7cff'
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        label: edge.label,
        animated: edge.relation === 'blocks',
        style: { stroke: `${accent ?? '#8b7cff'}99` },
      }
    })

  return { nodes, edges }
}

function Atlas() {
  const [focus, setFocus] = useState('all')
  const [query, setQuery] = useState('')
  const [source] = useState(() => selectedSource())
  const [semanticGraph, setSemanticGraph] = useState<SemanticGraph | null>(null)
  const [sourceError, setSourceError] = useState<string | null>(null)
  const [nodes, setNodes] = useState<Node<AtlasNodeData>[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [selected, setSelected] = useState<AtlasNodeData | null>(null)

  const projects = useMemo(
    () => semanticGraph?.nodes.filter((node) => node.kind === 'project') ?? [],
    [semanticGraph],
  )
  const filteredProjects = useMemo(
    () => projects.filter((project) => project.title.toLowerCase().includes(query.toLowerCase())),
    [projects, query],
  )
  const graph = useMemo(() => semanticGraph ? buildGraph(semanticGraph, focus) : null, [semanticGraph, focus])

  useEffect(() => {
    const controller = new AbortController()
    source.load(controller.signal).then(setSemanticGraph).catch((error: Error) => setSourceError(error.message))
    return () => controller.abort()
  }, [source])

  useEffect(() => {
    let active = true
    if (!graph) return
    layoutGraph(graph.nodes, graph.edges).then((nextNodes) => {
      if (!active) return
      setNodes(nextNodes)
      setEdges(graph.edges)
    })
    return () => { active = false }
  }, [graph])

  const capabilityCount = (projectId: string) => semanticGraph?.edges.filter((edge) => edge.source === projectId).length ?? 0

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark"><i /><i /><i /></span>
          <div><strong>Semantic Atlas</strong><small>Public read-only preview</small></div>
        </div>
        <nav className="view-tabs" aria-label="Режим визуализации">
          <button className="is-active">Architecture</button>
          <button disabled>Evolution</button>
          <button disabled>Dependencies</button>
        </nav>
        <div className="sync-state"><span />{source.descriptor.label}</div>
      </header>

      <aside className="sidebar">
        <div className="sidebar-heading"><span>Projects</span><b>{projects.length}</b></div>
        <label className="project-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти проект" /></label>
        <button className={`project-filter ${focus === 'all' ? 'is-active' : ''}`} onClick={() => { setFocus('all'); setSelected(null) }}>
          <span className="filter-icon filter-icon--all">∞</span><span><strong>All systems</strong><small>Portfolio overview</small></span>
        </button>
        {filteredProjects.map((project) => (
          <button key={project.id} className={`project-filter ${focus === project.id ? 'is-active' : ''}`} onClick={() => { setFocus(project.id); setSelected(null) }}>
            <span className="filter-icon" style={{ background: project.accent }}>{project.title.slice(0, 1)}</span>
            <span><strong>{project.title}</strong><small>{capabilityCount(project.id)} direct nodes</small></span>
          </button>
        ))}
        <div className="sidebar-legend">
          <span>MATURITY</span>
          <div><i className="legend-dot legend-dot--high" /> Production ready</div>
          <div><i className="legend-dot legend-dot--mid" /> Working prototype</div>
          <div><i className="legend-dot legend-dot--low" /> Foundation</div>
        </div>
      </aside>

      <section className="canvas" aria-label="Интерактивный граф проектов">
        {!semanticGraph && !sourceError && <div className="source-state">Собираю публичный семантический граф…</div>}
        {sourceError && <div className="source-state source-state--error">{sourceError}</div>}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.18, duration: 650 }}
          minZoom={0.2}
          maxZoom={1.65}
          onNodeClick={(_, node) => setSelected(node.data as AtlasNodeData)}
          onPaneClick={() => setSelected(null)}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} color="#26304b" gap={28} size={1.25} />
          <Controls position="bottom-right" showInteractive={false} />
          <MiniMap position="bottom-left" pannable zoomable nodeColor={(node) => (node.data as AtlasNodeData).accent ?? '#8b7cff'} maskColor="rgba(5, 8, 16, .78)" />
        </ReactFlow>
        <div className="canvas-title">
          <span>ARCHITECTURE MAP</span>
          <strong>{focus === 'all' ? 'Unified project landscape' : projects.find((item) => item.id === focus)?.title}</strong>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.aside className="inspector" initial={{ x: 420, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 420, opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 260 }}>
            <button className="inspector-close" onClick={() => setSelected(null)} aria-label="Закрыть">×</button>
            <span className="inspector-kicker">{selected.kind}</span>
            <h2>{selected.title}</h2>
            <p>{selected.subtitle}</p>
            {selected.rationale && <div className="inspector-card"><span>ROLE IN SYSTEM</span>{selected.rationale}</div>}
            <div className="inspector-card"><span>SEMANTIC SOURCE</span>Public historical snapshot · December 2025</div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  )
}

export default function App() {
  return <ReactFlowProvider><Atlas /></ReactFlowProvider>
}
