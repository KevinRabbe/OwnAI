export type OwnAIEvent = {
  id: string;
  type: string;
  timestamp: string;
  source: string;
  metadata?: Record<string, unknown>;
};
