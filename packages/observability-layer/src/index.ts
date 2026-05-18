export { FileTimelineWriter } from './timelineWriter.js';

export interface TimelineEvent {
  id: string;
  source: string;
  type: string;
  timestamp: string;
  summary: string;
}
