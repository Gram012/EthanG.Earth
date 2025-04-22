import Link from "next/link";
import siteTheme from "./theme";

export default function NotFound() {
  const { isDark, toggleTheme } = siteTheme();
  return (
    <div className="flex items-center justify-center min-h-[100dvh]  bg-natrual-100 dark:bg-neutral-800">
      isDark={isDark}
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <img src="Images/favicon.ico" alt="favicon" className="h-20 w-20" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-base text-gray-500">
          Looks like you might have gotten a little lost (or the admin{" "}
          <code className=" text-red-500 px-1 rounded">rm -rf</code> 'd the
          wrong directory).
        </p>
        <Link
          href="/"
          className="max-w-48 mx-auto flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
