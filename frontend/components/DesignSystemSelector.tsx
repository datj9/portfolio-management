"use client"

import { useDesignSystem } from "@/contexts/DesignSystemContext"

export function DesignSystemSelector() {
  const { designSystem, theme, setDesignSystem, setTheme } = useDesignSystem()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Design System Selector */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Design System
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setDesignSystem("material")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                designSystem === "material"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Material Design
            </button>
            <button
              onClick={() => setDesignSystem("human-interface")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                designSystem === "human-interface"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Human Interface
            </button>
            <button
              onClick={() => setDesignSystem("fluent")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                designSystem === "fluent"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Fluent Design
            </button>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Theme
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTheme("light")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                theme === "light"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              Dark
            </button>
            <button
              onClick={() => setTheme("auto")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                theme === "auto"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Auto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

