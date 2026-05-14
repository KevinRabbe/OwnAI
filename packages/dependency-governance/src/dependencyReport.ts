import { DependencyReport, DependencyViolation } from './types.js';

export const createDependencyReport = (
  rootPath: string,
  importsScanned: number,
  violations: DependencyViolation[]
): DependencyReport => {
  return {
    generatedAt: new Date().toISOString(),
    rootPath,
    importsScanned,
    violations,
    passed: violations.filter(v => v.severity === 'error').length === 0
  };
};
