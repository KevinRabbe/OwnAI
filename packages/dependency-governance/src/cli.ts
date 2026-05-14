import { createDependencyReport } from './dependencyReport.js';

const rootPath = process.argv[2] ?? process.cwd();

const report = createDependencyReport(rootPath, 0, []);

console.log('\n=== OwnAI Dependency Governance ===');
console.log(`Root: ${report.rootPath}`);
console.log(`Imports scanned: ${report.importsScanned}`);
console.log(`Violations: ${report.violations.length}`);
console.log(`Passed: ${report.passed}`);
