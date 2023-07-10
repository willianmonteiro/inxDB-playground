import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function ConsoleOutput() {
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    // Override the console.log function to capture the output
    console.log = (...args: any[]) => {
      originalConsoleLog(...args); // Call the original console.log function
      setOutput(prevOutput => [...prevOutput, stringifyArgs(args)]);
    };

    console.error = (...args: any[]) => {
      originalConsoleError(...args); // Call the original console.error function
      setOutput(prevOutput => [...prevOutput, stringifyArgs(args)]);
    };

    return () => {
      // Restore the original console.log and console.error functions when the component unmounts
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
    };
  }, []);

  // Helper function to stringify arguments
  const stringifyArgs = (args: any[]): string => {
    return args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg, (_, value) => {
          if (typeof value === 'function') {
            return value.toString();
          }
          return value;
        }, 2);
      }
      return arg?.toString();
    }).join(' ');
  };

  return (
    <div className="bg-gray-800 rounded-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-800 px-4 py-2 flex justify-between">
        <h2 className="text-lg font-bold text-white">
          Console output
        </h2>
        <Button onClick={() => setOutput([])}>Clear console</Button>
      </div>
      <div className="px-4 py-6">
        {output.map((message, index) => (
          <pre key={index}>{`> ${message}`}</pre>
        ))}
      </div>
    </div>
  );
}
