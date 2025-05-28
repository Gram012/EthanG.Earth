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
    useState<keyof typeof fileSystem>("~");
  const scrollRef = useRef<HTMLDivElement>(null); //Ref for the scrollable container

  //Commands and File System
  const commands = ["ls", "cd", "clear", "theme", "xdg-open", "man", "ls -la"];
  const fileSystem: Record<
    string,
    { files: string[]; urls: Record<string, string> }
  > = {
    "~": {
      files: ["projects", "research", "hobbies", "Resume.pdf"],
      urls: {
        "Resume.pdf": "https://ethang.earth/files/Resume-Current_01_25.pdf",
      },
    },
    "~/projects": {
      files: ["MBPrez.pdf", "MossbauerTDR.pdf"],
      urls: {
        "MBPrez.pdf": "https://ethang.earth/files/MössbauerPresentation.pdf",
        "MossbauerTDR.pdf":
          "https://www.ethang.earth/files/M%C3%B6ssbauer_TDR.pdf",
      },
    },
    "~/research": {
      files: ["TwistronicsPaper.pdf"],
      urls: {
        "TwistronicsPaper.pdf": "https://arxiv.org/abs/2408.05708",
      },
    },
    "~/hobbies": {
      files: ["hevy.com", "hobby2", "hobby3"],
      urls: {
        "hevy.com": "https://hevy.com/profile",
      },
    },
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
    setHistoryIndex(null); //Reset the history index

    //Handle special commands
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
        commands.join("\n"),
      ]);
      return;
    }
    if (cmd === "ls") {
      const currentDir = fileSystem[currentDirectory];
      if (currentDir) {
        setOutput((prev) => [
          ...prev,
          currentDirectory + "$ ls",
          currentDir.files.join("  "),
        ]);
      } else {
        setOutput((prev) => [
          ...prev,
          currentDirectory + "$ ls",
          "Directory not found",
        ]);
      }
      return;
    }
    if (cmd === "ls -la") {
      const currentDir = fileSystem[currentDirectory];
      if (currentDir) {
        setOutput((prev) => [
          ...prev,
          currentDirectory + "$ ls -la",
          currentDir.files.join("  "),
        ]);
      } else {
        setOutput((prev) => [
          ...prev,
          currentDirectory + "$ ls -la",
          "Directory not found",
        ]);
      }
      return;
    }

    //Handle tree navigation
    if (cmd.startsWith("cd")) {
      const targetDir = cmd.slice(3).trim();
      if (cmd === "cd ~" || cmd === "cd" || cmd === "cd ..") {
        setCurrentDirectory("~");
        setOutput((prev) => [...prev, `${currentDirectory}$ ${cmd}`]);
      } else if (fileSystem[currentDirectory]?.files.includes(targetDir)) {
        const newDirectory =
          `${currentDirectory}/${targetDir}` as keyof typeof fileSystem;
        if (fileSystem[newDirectory]) {
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
        setOutput((prev) => [
          ...prev,
          `${currentDirectory}$ ${cmd}`,
          `Directory not found: ${targetDir}`,
        ]);
      }
      return;
    }

    //Handle xdg-open commands
    if (cmd.startsWith("xdg-open ")) {
      const fileName = cmd.slice(9).trim();
      const currentDir = fileSystem[currentDirectory];
      if (currentDir?.files.includes(fileName)) {
        const fileUrl = currentDir.urls[fileName];
        if (fileUrl) {
          window.open(fileUrl, "_blank");
          setOutput((prev) => [
            ...prev,
            `${currentDirectory}$ ${cmd}`,
            `Opening ${fileName}...`,
          ]);
        } else {
          setOutput((prev) => [
            ...prev,
            `${currentDirectory}$ ${cmd}`,
            `No URL associated with ${fileName}`,
          ]);
        }
      } else {
        setOutput((prev) => [
          ...prev,
          `${currentDirectory}$ ${cmd}`,
          `File not found: ${fileName}`,
        ]);
      }
      return;
    }

    //Handle jump
    if (cmd === "jump") {
      window.open("https://jump.ethang.earth");
      setOutput((prev) => [
        ...prev,
        `${currentDirectory}$ ${cmd}`,
        `Jumping...`,
      ]);
      return;
    }

    //Handle unknown commands
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

  const handleKeyEvent = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault(); //Prevent the default tab behavior

      const currentInput = input.trim();
      const suggestions: string[] = [];

      //Handle cd suggestions
      if (currentInput.startsWith("cd ")) {
        const dirInput = currentInput.slice(3); //Remove "cd " from the input
        const currentDirs = fileSystem[currentDirectory]?.files || [];
        suggestions.push(
          ...currentDirs.filter((dir) => dir.startsWith(dirInput))
        );
      } else if (currentInput.startsWith("xdg-open ")) {
        //Handle xdg-open suggestions
        const fileInput = currentInput.slice(9);
        const currentFiles = fileSystem[currentDirectory]?.files || [];
        suggestions.push(
          ...currentFiles.filter((file) => file.startsWith(fileInput))
        );
      } else {
        //Handle command suggestions
        suggestions.push(
          ...commands.filter((cmd) => cmd.startsWith(currentInput))
        );
      }

      if (suggestions.length === 1) {
        //Autocomplete if there's only one suggestion
        if (currentInput.startsWith("cd ")) {
          setInput(`cd ${suggestions[0]}`);
        } else if (currentInput.startsWith("xdg-open ")) {
          setInput(`xdg-open ${suggestions[0]}`);
        } else {
          setInput(suggestions[0]);
        }
      } else if (suggestions.length > 1) {
        //Display suggestions in the terminal output
        setOutput((prev) => [
          ...prev,
          `${currentDirectory}$ ${currentInput}`,
          ...suggestions,
        ]);
      }
    } else if (e.key === "ArrowUp") {
      //Navigate up in history
      if (history.length > 0) {
        setHistoryIndex((prev) => {
          const newIndex =
            prev === null ? history.length - 1 : Math.max(prev - 1, 0);
          setInput(history[newIndex]);
          return newIndex;
        });
      }
    } else if (e.key === "ArrowDown") {
      //Navigate down in history
      if (history.length > 0) {
        setHistoryIndex((prev) => {
          if (prev === null) return null; //Handle no history to navigate
          const newIndex = prev + 1;
          if (newIndex >= history.length) {
            setInput(""); //Clear input if at the end
            return null;
          }
          setInput(history[newIndex]); //Set input to the next command
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
          ref={scrollRef} //Attach the ref here
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
              onKeyDown={handleKeyEvent} //Attach the keydown handler
            />
            {!focused && currentDirectory === "~" && input === "" && (
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
