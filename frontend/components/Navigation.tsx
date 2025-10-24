'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useDesignSystem } from '@/contexts/DesignSystemContext';

export function Navigation() {
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const { designSystem, theme, setDesignSystem, setTheme } = useDesignSystem();

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 hover:text-primary-600';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className="flex items-center text-xl font-bold text-primary-600"
            >
              Portfolio
            </Link>
            <div className="hidden sm:flex sm:space-x-8 sm:ml-10">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                href="/experience"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/experience')}`}
              >
                Experience
              </Link>
              <Link
                href="/blog"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/blog')}`}
              >
                Blog
              </Link>
              <Link
                href="/cv"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/cv')}`}
              >
                CV
              </Link>
            </div>
          </div>
          
          {/* Settings Button */}
          <div className="flex items-center relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-100 transition"
              aria-label="Settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            {/* Settings Dropdown */}
            {showSettings && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSettings(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Appearance Settings</h3>
                  
                  {/* Design System Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Design System
                    </label>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setDesignSystem("material")}
                        className={`px-4 py-2 rounded-lg font-medium transition text-left ${
                          designSystem === "material"
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Material Design
                      </button>
                      <button
                        onClick={() => setDesignSystem("human-interface")}
                        className={`px-4 py-2 rounded-lg font-medium transition text-left ${
                          designSystem === "human-interface"
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Human Interface
                      </button>
                      <button
                        onClick={() => setDesignSystem("fluent")}
                        className={`px-4 py-2 rounded-lg font-medium transition text-left ${
                          designSystem === "fluent"
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Fluent Design
                      </button>
                    </div>
                  </div>

                  {/* Theme Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Theme
                    </label>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setTheme("light")}
                        className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                          theme === "light"
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Light
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                          theme === "dark"
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        Dark
                      </button>
                      <button
                        onClick={() => setTheme("auto")}
                        className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                          theme === "auto"
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Auto
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

