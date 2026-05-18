import fs from 'node:fs/promises';
import path from 'node:path';

import { buildNavigationMap } from './navigation.js';

import type {
  GenerateNavigationMapOptions,
  NavigationMap
} from './types.js';
import type { HeatmapState } from './navigation.js';

export async function generateNavigationMap(
  options: GenerateNavigationMapOptions
): Promise<NavigationMap> {
  const heatmapPath = path.join(
    options.rootPath,
    '.ownai',
    'memory',
    'warm',
    'heatmap_state.json'
  );

  const navigationMapPath = path.join(
    options.rootPath,
    '.ownai',
    'memory',
    'warm',
    'navigation_map.json'
  );

  const heatmap = JSON.parse(
    await fs.readFile(heatmapPath, 'utf8')
  ) as HeatmapState;

  const map = buildNavigationMap({
    heatmap,
    task: options.task,
    maxTargets: options.maxTargets
  });

  await fs.writeFile(navigationMapPath, JSON.stringify(map, null, 2));

  return map;
}
