"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";

export function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);
  const [currentDirectory, setCurrentDirectory] =
    useState<keyof typeof directories>("~");
  const scrollRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container
  const commands: Record<string, string> = {};

  //Commands and Directories
  const commandsList = ["help", "ls", "cd", "clear", "theme", "xdg-open"];
  const directories = {
    "~": ["projects", "research", "hobbies"],
    "~/projects": ["MBPrez.pdf", "MossbauerTDR.pdf"],
    "~/research": ["TwistronicsPaper.pdf", "Turbotelescope.net"],
    "~/hobbies": ["hobby1", "hobby2", "hobby3"],
  };

  //Handle proper windowing
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (cmd: string) => {
    if (cmd === "") {
      setOutput((prev) => [...prev, currentDirectory + "$"]);
      return;
    }
    //Command History
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null); //Reset the history index!!!!

    // Handle special commands
    if (cmd === "clear") {
      setOutput([]);
      return;
    }
    if (cmd === "theme") {
      document.documentElement.classList.toggle("dark");
      setOutput((prev) => [...prev, currentDirectory + "$ theme"]);
      return;
    }
    if (cmd === "help") {
      setOutput((prev) => [
        ...prev,
        currentDirectory + "$ help",
        commandsList.join("  "),
      ]);
      return;
    }
    if (cmd === "ls") {
      setOutput((prev) => [
        ...prev,
        currentDirectory + "$ ls",
        directories[currentDirectory].join("  "),
      ]);
      return;
    }

    // Handle tree navigation
    if (cmd.startsWith("cd")) {
      const targetDir = cmd.slice(3).trim();
      // Navigate to the root directory
      if (cmd === "cd ~" || cmd === "cd" || cmd === "cd ..") {
        setCurrentDirectory("~");
        setOutput((prev) => [...prev, `${currentDirectory}$ ${cmd}`]);
      }

      // Navigate to a subdirectory
      else if (directories[currentDirectory]?.includes(targetDir)) {
        const newDirectory =
          `${currentDirectory}/${targetDir}` as keyof typeof directories;
        if (directories[newDirectory]) {
          setCurrentDirectory(newDirectory);
          setOutput((prev) => [...prev, `${currentDirectory}$ ${cmd}`]);
        } else {
          setOutput((prev) => [
            ...prev,
            `${currentDirectory}$ ${cmd}`,
            `Directory not found: ${targetDir}`,
          ]);
        }
      } else {
        // Handle directory not found
        setOutput((prev) => [
          ...prev,
          `${currentDirectory}$ ${cmd}`,
          `Directory not found: ${targetDir}`,
        ]);
      }
      return;
    }

    // Handle `xdg-open` commands
    if (cmd.startsWith("xdg-open ")) {
      const fileName = cmd.slice(9).trim();
      if (
        directories[currentDirectory]?.includes(fileName) &&
        currentDirectory === "~/research" &&
        fileName === "TwistronicsPaper.pdf"
      ) {
        window.open("https://arxiv.org/abs/2408.05708", "_blank");
        setOutput((prev) => [
          ...prev,
          `${currentDirectory}$ ${cmd}`,
          `Opening ${fileName}...`,
        ]);
      } else if (
        directories[currentDirectory]?.includes(fileName) &&
        currentDirectory === "~/projects" &&
        fileName === "MBPrez.pdf"
      ) {
        window.open(
          "https://ethang.earth/files/Mössbauer Presentation ETHAN GRAMOWSKI.pdf",
          "_blank"
        );
        setOutput((prev) => [
          ...prev,
          `${currentDirectory}$ ${cmd}`,
          `Opening ${fileName}...`,
        ]);
      } else if (
        directories[currentDirectory]?.includes(fileName) &&
        currentDirectory === "~/projects" &&
        fileName === "MossbauerTDR.pdf"
      ) {
        window.open(
          "https://ethang.earth/files/Mössbauer_TDR_FINAL.pdf",
          "_blank"
        );
        setOutput((prev) => [
          ...prev,
          `${currentDirectory}$ ${cmd}`,
          `Opening ${fileName}...`,
        ]);
      } else {
        setOutput((prev) => [
          ...prev,
          `${currentDirectory}$ ${cmd}`,
          `File not found: ${fileName}`,
        ]);
      }
      return;
    }

    // Handle unknown commands
    setOutput((prev) => [
      ...prev,
      `${currentDirectory}$ ${cmd}`,
      `Command not found: ${cmd}`,
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim(); //Essential for command handling
    handleCommand(trimmedInput);
    setInput("");
  };

  //Arrow Key  and Tab Functionality
  const handleKeyEvent = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Prevent the default tab behavior

      const currentInput = input.trim();
      const suggestions: string[] = [];

      // Handle `cd` suggestions
      if (currentInput.startsWith("cd ")) {
        const dirInput = currentInput.slice(3); // Remove inital  command from the input
        const currentDirs = directories[currentDirectory] || [];
        suggestions.push(
          ...currentDirs.filter((dir) => dir.startsWith(dirInput))
        );
      } else if (currentInput.startsWith("xdg-open ")) {
        // Handle `xdg-open` file suggestions
        const fileInput = currentInput.slice(9);
        const currentFiles = directories[currentDirectory] || [];
        suggestions.push(
          ...currentFiles.filter((file) => file.startsWith(fileInput))
        );
      } else {
        // Handle command suggestions
        suggestions.push(
          ...commandsList.filter((cmd) => cmd.startsWith(currentInput))
        );
      }

      if (suggestions.length === 1) {
        // Autocomplete if there's only one suggestion
        if (currentInput.startsWith("cd ")) {
          setInput(`cd ${suggestions[0]}`);
        } else if (currentInput.startsWith("xdg-open ")) {
          setInput(`xdg-open ${suggestions[0]}`);
        } else {
          setInput(suggestions[0]);
        }
      } else if (suggestions.length > 1) {
        // Display suggestions in the terminal output
        setOutput((prev) => [
          ...prev,
          `${currentDirectory}$ ${currentInput}`,
          ...suggestions,
        ]);
      }
    } else if (e.key === "ArrowUp") {
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
        <div
          ref={scrollRef} // Attach the ref here
          className="h-64 overflow-y-auto p-2 bg-gray-50 text-neutral-950 dark:bg-gray-900 dark:text-white font-mono text-sm relative rounded-lg"
        >
          {output.map((line, index) => (
            <pre
              key={index}
              className="opacity-100 transition-opacity duration-300"
            >
              {line}
            </pre>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center relative">
            <span className="text-green-400 mr-2" style={{ whiteSpace: "pre" }}>
              {currentDirectory === "~" ? "~$" : currentDirectory + "$"}
            </span>
            <input
              type="text"
              className="bg-transparent outline-none text-neutral-950 dark:text-white w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKeyEvent} // Attach the keydown handler
            />
            {!focused && currentDirectory === "~" && (
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
