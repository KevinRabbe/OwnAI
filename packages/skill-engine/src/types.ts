export type SkillStatus =
  | 'idle'
  | 'running'
  | 'completed'
  | 'failed'
  | 'skipped';

export type SkillCategory =
  | 'analysis'
  | 'memory'
  | 'attention'
  | 'navigation'
  | 'inspection'
  | 'verification'
  | 'learning'
  | 'git'
  | 'coding';

export interface SkillInput {
  rootPath: string;
  task?: string;
  contextPackId?: string;
  metadata?: Record<string, unknown>;
}

export interface SkillResult {
  id: string;
  skillId: string;
  status: SkillStatus;
  startedAt: string;
  completedAt: string;
  summary: string;
  outputs: Record<string, unknown>;
  lessons: string[];
  error?: string;
}

export interface SkillDefinition {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  requiredSystems: string[];
  allowedTools: string[];
  run(input: SkillInput): Promise<SkillResult>;
}

export interface SkillRegistryEntry {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  requiredSystems: string[];
  allowedTools: string[];
}
