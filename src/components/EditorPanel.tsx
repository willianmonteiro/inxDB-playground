import { javascript } from '@codemirror/lang-javascript';
import { Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import { useMemo, useRef } from 'react';

interface EditorPanelProps {
  code: string;
  running: boolean;
  onChange: (code: string) => void;
  onRun: () => void;
}

export default function EditorPanel({ code, running, onChange, onRun }: EditorPanelProps) {
  const onRunRef = useRef(onRun);
  onRunRef.current = onRun;

  const extensions = useMemo(
    () => [
      javascript(),
      Prec.highest(
        keymap.of([
          {
            key: 'Mod-Enter',
            run: () => {
              onRunRef.current();
              return true;
            },
          },
        ]),
      ),
    ],
    [],
  );

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Editor
        </span>
        <button
          onClick={onRun}
          disabled={running}
          className="flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {running ? 'Running…' : 'Run'}
          <kbd className="rounded bg-emerald-700/60 px-1.5 py-0.5 font-sans text-[10px] font-normal text-emerald-100">
            ⌘⏎
          </kbd>
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <CodeMirror
          value={code}
          onChange={onChange}
          extensions={extensions}
          theme={oneDark}
          height="100%"
          style={{ height: '100%' }}
          basicSetup={{ tabSize: 2 }}
        />
      </div>
    </section>
  );
}
