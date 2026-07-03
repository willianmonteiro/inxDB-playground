import InxDB from 'inxdb';

export const DB_NAME = 'inxdb-playground';

export const db = new InxDB(DB_NAME);

export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'result';

export interface ConsoleEntry {
  id: number;
  level: LogLevel;
  text: string;
}

export type EmitLog = (level: LogLevel, text: string) => void;

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (
  ...args: string[]
) => (...values: unknown[]) => Promise<unknown>;

/**
 * Runs user code with `db`, `InxDB`, and a capturing `console` in scope.
 * A returned value is emitted as a `result` entry.
 */
export async function runCode(code: string, emit: EmitLog): Promise<void> {
  const capture =
    (level: LogLevel) =>
    (...args: unknown[]) =>
      emit(level, args.map(formatValue).join(' '));

  const sandboxConsole = {
    log: capture('log'),
    info: capture('info'),
    warn: capture('warn'),
    error: capture('error'),
  };

  try {
    const execute = new AsyncFunction('db', 'InxDB', 'console', code);
    const result = await execute(db, InxDB, sandboxConsole);
    if (result !== undefined) {
      emit('result', formatValue(result));
    }
  } catch (error) {
    emit('error', error instanceof Error ? `${error.name}: ${error.message}` : formatValue(error));
  }
}

export function formatValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === undefined) return 'undefined';
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return String(value);
  }
}
