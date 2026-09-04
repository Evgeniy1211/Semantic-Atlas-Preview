import ELK from 'elkjs/lib/elk.bundled.js'
import type { Edge, Node } from '@xyflow/react'
import type { AtlasNodeData } from './types'

const elk = new ELK()

const dimensions = (kind: AtlasNodeData['kind']) => {
  if (kind === 'portfolio') return { width: 300, height: 116 }
  if (kind === 'project') return { width: 270, height: 134 }
  return { width: 245, height: 126 }
}

export async function layoutGraph(nodes: Node<AtlasNodeData>[], edges: Edge[]) {
  const graph = await elk.layout({
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'RIGHT',
      'elk.spacing.nodeNode': '36',
      'elk.layered.spacing.nodeNodeBetweenLayers': '94',
      'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
      'elk.edgeRouting': 'SPLINES',
    },
    children: nodes.map((node) => ({ id: node.id, ...dimensions(node.data.kind) })),
    edges: edges.map((edge) => ({ id: edge.id, sources: [edge.source], targets: [edge.target] })),
  })

  const positions = new Map(graph.children?.map((node) => [node.id, node]) ?? [])
  return nodes.map((node) => {
    const position = positions.get(node.id)
    return { ...node, position: { x: position?.x ?? 0, y: position?.y ?? 0 } }
  })
}
