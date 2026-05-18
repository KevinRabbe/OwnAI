export interface EnvironmentState {
  cpuLoad?: number;
  ramUsage?: number;
  gpuUsage?: number;
  batteryMode?: boolean;
  cloudAvailable?: boolean;
}

export {
  probeOllamaEnvironment,
  type OllamaEnvironmentSnapshot
} from './ollamaEnvironment.js';
