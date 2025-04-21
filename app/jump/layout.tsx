"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { CircleIcon, MoonIcon, SunIcon } from "lucide-react";

function Header({
  toggleTheme,
  isDark,
}: {
  toggleTheme: () => void;
  isDark: boolean;
}) {
  //Display Current Time
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString()
  );

  const [currentDate, setCurrentDate] = useState(() =>
    new Date().toLocaleDateString()
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white dark:bg-neutral-800 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="favicon.ico" alt="Gmail" className="h-8 w-8" />
          <span className="ml-2 text-xl font-semibold">{currentDate}</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<div className="h-9" />}>
            <p>{currentTime}</p>
          </Suspense>
          <Button
            onClick={toggleTheme}
            className="bg-neutral dark:bg-neutral-800 p-2 rounded-full"
          >
            {isDark ? (
              <SunIcon className="h-5 w-5 text-orange-500 hover:animate-pulse" />
            ) : (
              <MoonIcon className="h-5 w-5 text-orange-500 hover:animate-pulse" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    // Check system preference for dark mode
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true; // Default to dark mode if no system preference is available
  });

  // Toggle the theme
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Apply the theme class to the <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <html lang="en">
      <head>
        <title>EthanNet</title>
      </head>
      <body className="flex flex-col min-h-screen">
        <Header toggleTheme={toggleTheme} isDark={isDark} />
        {children}
      </body>
    </html>
  );
}
