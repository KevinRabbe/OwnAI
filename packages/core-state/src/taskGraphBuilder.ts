import crypto from 'node:crypto';

import type {
  TaskGraph,
  TaskGraphSummary,
  TaskNode
} from './taskGraph.js';

export function createPipelineTaskGraph(task?: string): TaskGraph {
  const nodes: TaskNode[] = [
    createNode({
      id: 'scan',
      type: 'scan',
      label: 'Repository Scan',
      assignedSystem: 'repo-scanner'
    }),

    createNode({
      id: 'memory',
      type: 'memory_update',
      label: 'Memory Initialization',
      assignedSystem: 'memory-system',
      dependencies: ['scan']
    }),

    createNode({
      id: 'heatmap',
      type: 'heatmap',
      label: 'Attention Heatmap',
      assignedSystem: 'heatmap-engine',
      dependencies: ['memory']
    }),

    createNode({
      id: 'navigation',
      type: 'navigation',
      label: 'Telescope Navigation',
      assignedSystem: 'telescope-engine',
      dependencies: ['heatmap']
    }),

    createNode({
      id: 'inspection',
      type: 'inspection',
      label: 'Microscope Inspection',
      assignedSystem: 'microscope-engine',
      dependencies: ['navigation']
    }),

    createNode({
      id: 'verification',
      type: 'verification',
      label: 'Verification Layer',
      assignedSystem: 'verifier',
      dependencies: ['inspection']
    }),

    createNode({
      id: 'replay',
      type: 'replay',
      label: 'Replay Optimization',
      assignedSystem: 'context-replay-engine',
      dependencies: ['verification']
    })
  ];

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    task,
    status: 'pending',
    nodes
  };
}

export function summarizeTaskGraph(
  graph: TaskGraph
): TaskGraphSummary {
  return {
    totalNodes: graph.nodes.length,
    pendingNodes: graph.nodes.filter(node => node.status === 'pending').length,
    runningNodes: graph.nodes.filter(node => node.status === 'running').length,
    completedNodes: graph.nodes.filter(
      node => node.status === 'completed'
    ).length,
    failedNodes: graph.nodes.filter(node => node.status === 'failed').length,
    skippedNodes: graph.nodes.filter(node => node.status === 'skipped').length
  };
}

function createNode(params: {
  id: string;
  type: TaskNode['type'];
  label: string;
  assignedSystem: string;
  dependencies?: string[];
}): TaskNode {
  return {
    id: params.id,
    type: params.type,
    label: params.label,
    status: 'pending',
    dependencies: params.dependencies ?? [],
    assignedSystem: params.assignedSystem
  };
}
