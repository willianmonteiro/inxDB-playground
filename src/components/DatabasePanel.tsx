import { useState } from 'react';
import { StoreSnapshot } from '../lib/inspect-db';
import { formatValue } from '../lib/run-code';

interface DatabasePanelProps {
  snapshot: StoreSnapshot[];
  onRefresh: () => void;
}

export default function DatabasePanel({ snapshot, onRefresh }: DatabasePanelProps) {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const activeStore =
    snapshot.find((store) => store.name === selectedStore) ?? snapshot[0] ?? null;

  return (
    <aside className="flex w-96 shrink-0 flex-col border-l border-zinc-800 bg-zinc-900/50">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Database state
        </span>
        <button
          onClick={onRefresh}
          className="rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          Refresh
        </button>
      </div>

      {snapshot.length === 0 ? (
        <p className="p-4 text-xs text-zinc-600">
          No collections yet. Run an example to create one.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-1 border-b border-zinc-800 p-2">
            {snapshot.map((store) => (
              <button
                key={store.name}
                onClick={() => setSelectedStore(store.name)}
                className={`rounded-md px-2 py-1 font-mono text-xs transition-colors ${
                  store.name === activeStore?.name
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : 'text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {store.name}
                <span className="ml-1.5 text-[10px] text-zinc-500">{store.records.length}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {activeStore?.records.length === 0 ? (
              <p className="text-xs text-zinc-600">Collection is empty.</p>
            ) : (
              activeStore?.records.map((record, index) => (
                <pre
                  key={index}
                  className="overflow-x-auto rounded-md border border-zinc-800 bg-zinc-950 p-2 font-mono text-[11px] leading-relaxed text-zinc-300"
                >
                  {formatValue(record)}
                </pre>
              ))
            )}
          </div>
        </>
      )}
    </aside>
  );
}
