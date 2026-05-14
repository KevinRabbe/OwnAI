export type DependencyViolationType =
  | 'circular_dependency'
  | 'forbidden_internal_import'
  | 'missing_public_index'
  | 'ui_engine_coupling'
  | 'engine_to_engine_import'
  | 'external_dependency_unreviewed';

export interface ImportRecord {
  sourceFile: string;
  importPath: string;
  resolvedPackage?: string;
  isRelative: boolean;
}

export interface DependencyViolation {
  type: DependencyViolationType;
  severity: 'warning' | 'error';
  sourceFile: string;
  message: string;
  importPath?: string;
}

export interface DependencyReport {
  generatedAt: string;
  rootPath: string;
  importsScanned: number;
  violations: DependencyViolation[];
  passed: boolean;
}

export interface DependencyScanOptions {
  rootPath: string;
}
