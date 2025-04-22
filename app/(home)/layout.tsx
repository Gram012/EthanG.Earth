"use client";

import Link from "next/link";
import Head from "next/head"; // Import next/head
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { CircleIcon, MoonIcon, SunIcon } from "lucide-react";
import siteTheme from "@/components/ui/theme";

function HeaderContent({
  toggleTheme,
  isDark,
}: {
  toggleTheme: () => void;
  isDark: boolean;
}) {
  return (
    <header className="border-b border-gray-200 bg-white dark:bg-neutral-800 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/Images/favicon.ico" alt="Gmail" className="h-8 w-8" />
          <span className="ml-2 text-xl font-semibold">Ethan Gramowski</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<div className="h-9" />}>
            <p>Ethan@ethang.earth</p>
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

export default function Header({ children }: { children: React.ReactNode }) {
  const { isDark, toggleTheme } = siteTheme();
  return (
    <html lang="en">
      <head>
        <title>Ethan Gramowski</title>
        <link rel="icon" href="/Images/favicon.ico" type="image/x-icon" />
      </head>
      <body className="flex flex-col min-h-screen">
        <HeaderContent toggleTheme={toggleTheme} isDark={isDark} />
        {children}
      </body>
    </html>
  );
}
