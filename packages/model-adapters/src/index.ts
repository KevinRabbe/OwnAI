export interface ModelAdapter {
  provider: string;
  model: string;
  supportsVision?: boolean;
  supportsTools?: boolean;
}
