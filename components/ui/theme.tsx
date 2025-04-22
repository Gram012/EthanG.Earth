"use client";

import { useEffect, useState } from "react";

export default function siteTheme() {
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

  return { isDark, toggleTheme };
}
