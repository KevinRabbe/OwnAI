export interface TrainingSession {
  skillId: string;
  mode: 'idle' | 'benchmark' | 'replay';
  startedAt: string;
}
