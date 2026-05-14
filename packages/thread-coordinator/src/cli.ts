import { createThreadPlan } from './planner.js';

async function main(): Promise<void> {
  console.log('\n[OwnAI] Generating adaptive thread plan');

  const plan = createThreadPlan({
    task: 'example-task',
    estimatedFiles: 120,
    estimatedZones: 18,
    highAttentionTargets: 24,
    averageConfidence: 0.52,
    hardware: {
      availableRamGb: 32,
      availableVramGb: 16,
      cpuThreads: 20,
      maxModelThreads: 2,
      maxToolThreads: 6,
      lowResourceMode: false
    }
  });

  console.log(`Execution mode: ${plan.executionMode}`);

  console.log('\nPhases:\n');

  plan.phases.forEach((phase, index) => {
    console.log(`${index + 1}. ${phase.label}`);

    phase.threads.forEach(thread => {
      console.log(
        `   - ${thread.label} | model=${thread.requiresModel} | worktree=${thread.requiresWorktree}`
      );
    });
  });
}

main().catch(error => {
  console.error('\n[OwnAI] Thread planning failed');
  console.error(error);
  process.exit(1);
});
