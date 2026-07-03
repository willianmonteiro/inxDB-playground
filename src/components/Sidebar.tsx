import { presets } from '../lib/presets';

interface SidebarProps {
  activePresetId: string | null;
  onSelect: (presetId: string) => void;
}

export default function Sidebar({ activePresetId, onSelect }: SidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-900/50">
      <div className="border-b border-zinc-800 px-4 py-4">
        <h1 className="text-sm font-semibold text-zinc-100">
          InxDB <span className="text-emerald-400">Playground</span>
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Run InxDB against a real IndexedDB in this browser tab.
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <p className="px-2 pb-2 pt-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Examples
        </p>
        <ul className="space-y-0.5">
          {presets.map((preset) => (
            <li key={preset.id}>
              <button
                onClick={() => onSelect(preset.id)}
                className={`w-full rounded-md px-2 py-1.5 text-left transition-colors ${
                  preset.id === activePresetId
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : 'text-zinc-300 hover:bg-zinc-800/70'
                }`}
              >
                <span className="block text-[13px] font-medium">{preset.title}</span>
                <span className="block text-[11px] text-zinc-500">{preset.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-zinc-800 px-4 py-3">
        <a
          href="https://github.com/willianmonteiro/inxDB"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
        >
          github.com/willianmonteiro/inxDB
        </a>
      </div>
    </aside>
  );
}
