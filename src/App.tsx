import { useCallback, useEffect, useRef, useState } from 'react';
import ConsolePanel from './components/ConsolePanel';
import DatabasePanel from './components/DatabasePanel';
import EditorPanel from './components/EditorPanel';
import Sidebar from './components/Sidebar';
import { snapshotDatabase, StoreSnapshot } from './lib/inspect-db';
import { presets } from './lib/presets';
import { ConsoleEntry, DB_NAME, LogLevel, runCode } from './lib/run-code';

export default function App() {
  const [code, setCode] = useState(presets[0].code);
  const [activePresetId, setActivePresetId] = useState<string | null>(presets[0].id);
  const [entries, setEntries] = useState<ConsoleEntry[]>([]);
  const [snapshot, setSnapshot] = useState<StoreSnapshot[]>([]);
  const [running, setRunning] = useState(false);
  const nextEntryId = useRef(0);

  const appendEntry = useCallback((level: LogLevel, text: string) => {
    setEntries((previous) => [...previous, { id: nextEntryId.current++, level, text }]);
  }, []);

  const refreshSnapshot = useCallback(async () => {
    setSnapshot(await snapshotDatabase(DB_NAME));
  }, []);

  useEffect(() => {
    void refreshSnapshot();
  }, [refreshSnapshot]);

  const run = useCallback(async () => {
    setRunning(true);
    await runCode(code, appendEntry);
    await refreshSnapshot();
    setRunning(false);
  }, [code, appendEntry, refreshSnapshot]);

  const selectPreset = useCallback((presetId: string) => {
    const preset = presets.find(({ id }) => id === presetId);
    if (!preset) return;
    setActivePresetId(preset.id);
    setCode(preset.code);
  }, []);

  const editCode = useCallback((value: string) => {
    setCode(value);
    setActivePresetId(null);
  }, []);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 antialiased">
      <Sidebar activePresetId={activePresetId} onSelect={selectPreset} />
      <main className="flex min-w-0 flex-1 flex-col">
        <EditorPanel code={code} running={running} onChange={editCode} onRun={run} />
        <ConsolePanel entries={entries} onClear={() => setEntries([])} />
      </main>
      <DatabasePanel snapshot={snapshot} onRefresh={refreshSnapshot} />
    </div>
  );
}
