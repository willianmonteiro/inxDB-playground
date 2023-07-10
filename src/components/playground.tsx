import CodeEditor from "./code-editor/code-editor";
import ConsoleOutput from "./console-output";
import DatabaseContent from "./indexeddb/database-content";

export default function Playground() {
  return (
    <div className="column md:flex">
      <div className="w-full md:w-2/4 md:pr-4 mb-4">
        <CodeEditor />
        <ConsoleOutput />
      </div>

      <div className="w-full md:w-2/4 md:pl-4 mb-4">
        <DatabaseContent />
      </div>
    </div>
  );
}