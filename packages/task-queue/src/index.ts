export interface QueueTask {
  id: string;
  title: string;
  status:
    | 'queued'
    | 'running'
    | 'completed'
    | 'failed'
    | 'blocked';
}

export const createQueue = () => {
  return {
    tasks: [] as QueueTask[]
  };
};
