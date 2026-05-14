export type SymbolKind = 'class' | 'function' | 'method' | 'interface' | 'unknown';

export interface FocusRange {
  path: string;
  startLine: number;
  endLine: number;
  reason: string;
}

export interface CodeSymbol {
  name: string;
  kind: SymbolKind;
  path: string;
  lineStart: number;
  lineEnd: number;
  confidence: number;
}

export interface InspectedFile {
  path: string;
  language: string;
  contentPreview: string;
  totalLines: number;
  symbols: CodeSymbol[];
  focusRanges: FocusRange[];
}

export interface ContextPack {
  id: string;
  createdAt: string;
  task?: string;
  selectedFiles: string[];
  selectedSymbols: CodeSymbol[];
  focusRanges: FocusRange[];
  tokenEstimate: number;
  notes: string[];
}

export interface GenerateContextPackOptions {
  rootPath: string;
  task?: string;
  maxFiles?: number;
}
