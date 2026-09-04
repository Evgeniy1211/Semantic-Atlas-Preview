export type Maturity = 1 | 2 | 3

export type Capability = {
  id: string
  name: string
  technology: string
  description: string
  rationale: string
  maturity: Maturity
}

export type PortfolioProject = {
  id: string
  name: string
  role: string
  accent: string
  status: 'production' | 'prototype' | 'experimental'
  capabilities: Capability[]
}

export type AtlasNodeData = {
  kind: 'portfolio' | 'project' | 'capability'
  title: string
  subtitle?: string
  accent?: string
  maturity?: Maturity
  status?: PortfolioProject['status']
  rationale?: string
  projectId?: string
}

export type SemanticNodeKind = 'portfolio' | 'initiative' | 'project' | 'milestone' | 'capability' | 'evidence'
export type SemanticRelation = 'contains' | 'parent' | 'depends_on' | 'blocks' | 'continues' | 'derived_from' | 'evidenced_by'

export type SemanticGraphNode = {
  id: string
  kind: SemanticNodeKind
  title: string
  subtitle?: string
  status?: PortfolioProject['status']
  maturity?: Maturity
  accent?: string
  rationale?: string
  source?: { system: 'semantic' | 'linear' | 'notion' | 'github'; externalId?: string; url?: string }
  attributes?: Record<string, string | number | boolean | null>
}

export type SemanticGraphEdge = {
  id: string
  source: string
  target: string
  relation: SemanticRelation
  label?: string
}

export type SemanticGraph = {
  contractVersion: '1.0'
  graphId: string
  title: string
  generatedAt: string
  sourceMode: 'snapshot' | 'live'
  nodes: SemanticGraphNode[]
  edges: SemanticGraphEdge[]
}
