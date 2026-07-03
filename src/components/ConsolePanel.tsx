import { useEffect, useRef } from 'react';
import { ConsoleEntry, LogLevel } from '../lib/run-code';

const levelStyles: Record<LogLevel, { row: string; badge: string; label: string }> = {
  log: { row: 'text-zinc-300', badge: 'text-zinc-600', label: 'log' },
  info: { row: 'text-sky-300', badge: 'text-sky-700', label: 'info' },
  warn: { row: 'text-amber-300', badge: 'text-amber-700', label: 'warn' },
  error: { row: 'text-red-400', badge: 'text-red-700', label: 'error' },
  result: { row: 'text-emerald-300', badge: 'text-emerald-700', label: '←' },
};

interface ConsolePanelProps {
  entries: ConsoleEntry[];
  onClear: () => void;
}

export default function ConsolePanel({ entries, onClear }: ConsolePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [entries]);

  return (
    <section className="flex h-64 shrink-0 flex-col border-t border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Console
        </span>
        <button
          onClick={onClear}
          className="rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          Clear
        </button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed">
        {entries.length === 0 ? (
          <p className="text-zinc-600">
            Run some code — returned values and console output appear here.
          </p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex gap-2 border-b border-zinc-900 py-1 ${levelStyles[entry.level].row}`}
            >
              <span className={`w-10 shrink-0 select-none text-right ${levelStyles[entry.level].badge}`}>
                {levelStyles[entry.level].label}
              </span>
              <pre className="whitespace-pre-wrap break-all">{entry.text}</pre>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
