import { InMemoryEventBus } from '../../core-events/src/eventBus.js';
import { OWN_AI_EVENTS } from '../../core-events/src/types.js';

import { scanRepository } from '../../repo-scanner/src/scanner.js';
import { initializeMemory } from '../../memory-system/src/memory.js';
import { generateHeatmap } from '../../heatmap-engine/src/heatmap.js';
import { generateNavigationMap } from '../../telescope-engine/src/telescope.js';
import { generateContextPack } from '../../microscope-engine/src/microscope.js';
import { runVerification } from '../../verifier/src/verifier.js';
import { generateReplayReport } from '../../context-replay-engine/src/replay.js';

export async function runOwnAIPipeline(params: {
  rootPath: string;
  task?: string;
}): Promise<void> {
  const eventBus = new InMemoryEventBus();

  registerDefaultLogging(eventBus);

  try {
    const repoScan = await scanRepository(params.rootPath);

    await eventBus.emit(
      eventBus.createEvent({
        type: OWN_AI_EVENTS.REPO_SCANNED,
        source: 'repo-scanner',
        taskId: params.task,
        payload: repoScan.summary
      })
    );

    const memory = await initializeMemory({
      rootPath: params.rootPath
    });

    await eventBus.emit(
      eventBus.createEvent({
        type: OWN_AI_EVENTS.MEMORY_INITIALIZED,
        source: 'memory-system',
        taskId: params.task,
        payload: memory.repo
      })
    );

    const heatmap = await generateHeatmap({
      rootPath: params.rootPath,
      task: params.task
    });

    await eventBus.emit(
      eventBus.createEvent({
        type: OWN_AI_EVENTS.HEATMAP_GENERATED,
        source: 'heatmap-engine',
        taskId: params.task,
        payload: {
          totalTargets: heatmap.totalTargets,
          highAttentionTargets: heatmap.highAttentionTargets
        }
      })
    );

    const navigation = await generateNavigationMap({
      rootPath: params.rootPath,
      task: params.task,
      maxTargets: 25
    });

    await eventBus.emit(
      eventBus.createEvent({
        type: OWN_AI_EVENTS.NAVIGATION_MAP_GENERATED,
        source: 'telescope-engine',
        taskId: params.task,
        payload: {
          zones: navigation.zones.length,
          targets: navigation.targets.length
        }
      })
    );

    const contextPack = await generateContextPack({
      rootPath: params.rootPath,
      task: params.task,
      maxFiles: 5
    });

    await eventBus.emit(
      eventBus.createEvent({
        type: OWN_AI_EVENTS.CONTEXT_PACK_GENERATED,
        source: 'microscope-engine',
        taskId: params.task,
        payload: {
          files: contextPack.selectedFiles.length,
          symbols: contextPack.selectedSymbols.length,
          tokenEstimate: contextPack.tokenEstimate
        }
      })
    );

    const verification = await runVerification({
      rootPath: params.rootPath,
      task: params.task
    });

    await eventBus.emit(
      eventBus.createEvent({
        type: OWN_AI_EVENTS.VERIFICATION_COMPLETED,
        source: 'verifier',
        taskId: params.task,
        payload: verification
      })
    );

    const replay = await generateReplayReport({
      rootPath: params.rootPath,
      task: params.task
    });

    await eventBus.emit(
      eventBus.createEvent({
        type: OWN_AI_EVENTS.REPLAY_REPORT_GENERATED,
        source: 'context-replay-engine',
        taskId: params.task,
        payload: replay.estimatedWaste
      })
    );

    await eventBus.emit(
      eventBus.createEvent({
        type: OWN_AI_EVENTS.PIPELINE_COMPLETED,
        source: 'agent-core',
        taskId: params.task,
        payload: {
          success: true
        }
      })
    );
  } catch (error) {
    await eventBus.emit(
      eventBus.createEvent({
        type: OWN_AI_EVENTS.PIPELINE_FAILED,
        source: 'agent-core',
        taskId: params.task,
        payload: {
          error: error instanceof Error ? error.message : 'unknown_error'
        }
      })
    );

    throw error;
  }
}

function registerDefaultLogging(eventBus: InMemoryEventBus): void {
  Object.values(OWN_AI_EVENTS).forEach(eventType => {
    eventBus.subscribe(eventType, event => {
      console.log(
        `[OwnAI Event] ${event.type} | source=${event.source}`
      );
    });
  });
}
