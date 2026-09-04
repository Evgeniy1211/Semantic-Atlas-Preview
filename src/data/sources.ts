import { portfolio } from './portfolio'
import type { SemanticGraph } from '../types'

function historicalSnapshot(): SemanticGraph {
  const nodes: SemanticGraph['nodes'] = [{
    id: 'portfolio',
    kind: 'portfolio',
    title: 'Semantic Atlas',
    subtitle: 'Historical project landscape',
    source: { system: 'semantic', externalId: 'public-preview' },
  }]
  const edges: SemanticGraph['edges'] = []

  for (const project of portfolio) {
    const projectId = `project:${project.id}`
    nodes.push({
      id: projectId,
      kind: 'project',
      title: project.name,
      subtitle: project.role,
      accent: project.accent,
      status: project.status,
      source: { system: 'semantic', externalId: project.id },
    })
    edges.push({ id: `portfolio-${project.id}`, source: 'portfolio', target: projectId, relation: 'contains' })

    for (const capability of project.capabilities) {
      nodes.push({
        id: `${project.id}:${capability.id}`,
        kind: 'capability',
        title: capability.name,
        subtitle: capability.technology,
        rationale: capability.description,
        maturity: capability.maturity,
        accent: project.accent,
        source: { system: 'semantic', externalId: `${project.id}:${capability.id}` },
      })
      edges.push({
        id: `${project.id}-${capability.id}`,
        source: projectId,
        target: `${project.id}:${capability.id}`,
        relation: 'contains',
      })
    }
  }

  return {
    contractVersion: '1.0',
    graphId: 'semantic-public-preview-2025-12',
    title: 'Semantic Atlas',
    generatedAt: '2025-12-21T13:14:30Z',
    sourceMode: 'snapshot',
    nodes,
    edges,
  }
}

const snapshotSource = {
  descriptor: { id: 'snapshot', label: 'Public snapshot · Dec 2025', mode: 'snapshot', readOnly: true },
  load: async (_signal?: AbortSignal) => historicalSnapshot(),
}

export function selectedSource() {
  return snapshotSource
}
