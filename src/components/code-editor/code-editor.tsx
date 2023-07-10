import { useEffect, useRef, useState, KeyboardEvent, UIEvent } from "react";
import Prism from 'prismjs';
import { Textarea } from "../ui/textarea";
import 'prismjs/themes/prism.css';
import './styles.css'
import { Button } from "../ui/button";
import { db } from "@/lib/database";

export default function CodeEditor() {
  const [code, setCode] = useState<string>('');
  const preRef = useRef<HTMLPreElement>(null);
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (preRef.current) {
      Prism.highlightAllUnder(preRef.current);
    }
  }, [code]);

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
    if (codeRef.current) {
      let text = event.target.value;
      if(text[text.length-1] == "\n") { // If the last character is a newline character
        text += " "; // Add a placeholder space character to the final line 
      }
      codeRef.current.innerText = event.target.value;
    }
  };

  function handleTab(event: KeyboardEvent<HTMLTextAreaElement>): void {
    let element = event.currentTarget;
    if(event.key == "Tab") {
      /* Tab key pressed */
      event.preventDefault(); // stop normal
      let before_tab = code.slice(0, element.selectionStart); // text before tab
      let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
      let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
      element.value = before_tab + "\t" + after_tab; // add tab char
      // move cursor
      element.selectionStart = cursor_pos;
      element.selectionEnd = cursor_pos;
      setCode(element.value); // Update text to include indent
    }
  }
  
  function syncScroll(event: UIEvent<HTMLTextAreaElement>) {
    const element = event.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = element.scrollTop;
      preRef.current.scrollLeft = element.scrollLeft;
    }   
  }
  async function handleCodeExecution() {
    try {
      if (db) {
        const executeCode = new Function('db', `
          return (async function() {
            ${code}
          })(db);
        `);
        await executeCode(db);
      } else {
        console.log('DB not initialized');
      }
    } catch (error) {
      console.log('Error running code:', error);
    }
  }

  return (
    <div className="bg-gray-800 rounded-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-purple-800 px-4 py-2 flex justify-between">
        <h2 className="text-lg font-bold text-white">Code Editor</h2>
        <Button onClick={handleCodeExecution}>Run Code</Button>
      </div>
      <div className="px-4 py-6 relative">
        <div className="code-editor-container">
          <pre 
            id="highlighting"
            ref={preRef} 
            className="language-javascript"
          >
            <code ref={codeRef}>{code}</code>
          </pre>
          <Textarea 
            id="editing"
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleTab}
            onScroll={syncScroll}
            spellCheck='false'
          />
        </div>
      </div>
    </div>
  )
}