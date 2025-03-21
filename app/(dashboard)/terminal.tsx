"use client";

import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

export function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);

  const commands: Record<string, string> = {
    help: "Available commands: \nhelp \ncat \nclear \nls \ntheme",
    "cat resume.txt": "[Your resume text here]",
  };

  const handleCommand = (cmd: string) => {
    //Command History
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null); //Reset the history index!!!!
    setOutput((prev) => [
      ...prev,
      `$ ${cmd}`,
      commands[cmd] || "Command not found",
    ]);

    // Handle special commands
    //if (cmd === "ls") {
    if (cmd === "clear") {
      setOutput([]);
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    //Arrow Key Functionality
    if (e.key === "ArrowUp") {
      // Navigate up in history
      if (history.length > 0) {
        setHistoryIndex((prev) => {
          const newIndex =
            prev === null ? history.length - 1 : Math.max(prev - 1, 0);
          setInput(history[newIndex]);
          return newIndex;
        });
      }
    } else if (e.key === "ArrowDown") {
      // Navigate down in history
      if (history.length > 0) {
        setHistoryIndex((prev) => {
          if (prev === null) return null; // Handle no history to navigate
          const newIndex = prev + 1;
          if (newIndex >= history.length) {
            setInput(""); // Clear input if at the end
            return null; // Reset history index
          }
          setInput(history[newIndex]); // Set input to the next command
          return newIndex;
        });
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg shadow-lg overflow-hidden bg-gray-50 text-neutral-950 dark:bg-gray-900 dark:text-white font-mono text-sm relative">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="h-64 overflow-y-auto p-2 bg-gray-50 text-neutral-950 dark:bg-gray-900 dark:text-white font-mono text-sm relative rounded-lg">
          {output.map((line, index) => (
            <pre
              key={index}
              className="opacity-100 transition-opacity duration-300"
            >
              {line}
            </pre>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center relative">
            <span className="text-green-400 mr-2">$</span>
            <input
              type="text"
              className="bg-transparent outline-none text-neutral-950 dark:text-white w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKeyDown} // Attach the keydown handler
              autoFocus
            />
            {!focused && input === "" && (
              <span className="absolute left-6 text-gray-500 pointer-events-none">
                type 'help' for a list of commands
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
