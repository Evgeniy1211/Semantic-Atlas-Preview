import { Handle, Position, type NodeProps } from '@xyflow/react'
import { motion } from 'motion/react'
import type { AtlasNodeData } from './types'

const statusLabel = {
  production: 'Production',
  prototype: 'Prototype',
  experimental: 'Experimental',
}

export function AtlasNode({ data, selected }: NodeProps) {
  const node = data as AtlasNodeData
  const isRoot = node.kind === 'portfolio'
  const isProject = node.kind === 'project'

  return (
    <motion.article
      className={`atlas-node atlas-node--${node.kind} ${selected ? 'is-selected' : ''}`}
      style={{ '--accent': node.accent ?? '#8b7cff' } as React.CSSProperties}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28 }}
    >
      {!isRoot && <Handle type="target" position={Position.Left} className="node-handle" />}
      <div className="node-glow" />
      <div className="node-topline">
        <span className="node-kind">{isRoot ? 'Portfolio system' : isProject ? 'Project' : 'Capability'}</span>
        {isProject && node.status && <span className={`status status--${node.status}`}>{statusLabel[node.status]}</span>}
        {node.maturity && <span className="maturity">{'●'.repeat(node.maturity)}<i>{'●'.repeat(3 - node.maturity)}</i></span>}
      </div>
      <h2>{node.title}</h2>
      {node.subtitle && <p>{node.subtitle}</p>}
      {node.rationale && <small>{node.rationale}</small>}
      {node.kind !== 'capability' && <Handle type="source" position={Position.Right} className="node-handle" />}
    </motion.article>
  )
}
