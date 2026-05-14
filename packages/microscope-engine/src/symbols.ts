import type { CodeSymbol, FocusRange, SymbolKind } from './types.js';

export function extractSymbols(params: {
  path: string;
  content: string;
}): CodeSymbol[] {
  const lines = params.content.split('\n');

  const symbols: CodeSymbol[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    const functionMatch = trimmed.match(
      /(function\s+([A-Za-z0-9_]+))|(([A-Za-z0-9_]+)\s*\()/
    );

    const classMatch = trimmed.match(/class\s+([A-Za-z0-9_]+)/);

    const interfaceMatch = trimmed.match(/interface\s+([A-Za-z0-9_]+)/);

    if (classMatch?.[1]) {
      symbols.push(createSymbol({
        path: params.path,
        name: classMatch[1],
        kind: 'class',
        line: index + 1,
        confidence: 0.95
      }));

      return;
    }

    if (interfaceMatch?.[1]) {
      symbols.push(createSymbol({
        path: params.path,
        name: interfaceMatch[1],
        kind: 'interface',
        line: index + 1,
        confidence: 0.9
      }));

      return;
    }

    if (functionMatch) {
      const name = functionMatch[2] || functionMatch[4];

      if (!name) {
        return;
      }

      symbols.push(createSymbol({
        path: params.path,
        name,
        kind: 'function',
        line: index + 1,
        confidence: 0.75
      }));
    }
  });

  return symbols;
}

export function generateFocusRanges(params: {
  path: string;
  symbols: CodeSymbol[];
}): FocusRange[] {
  return params.symbols.slice(0, 5).map(symbol => ({
    path: params.path,
    startLine: Math.max(1, symbol.lineStart - 5),
    endLine: symbol.lineEnd + 15,
    reason: `symbol_focus:${symbol.name}`
  }));
}

function createSymbol(params: {
  path: string;
  name: string;
  kind: SymbolKind;
  line: number;
  confidence: number;
}): CodeSymbol {
  return {
    name: params.name,
    kind: params.kind,
    path: params.path,
    lineStart: params.line,
    lineEnd: params.line + 20,
    confidence: params.confidence
  };
}
