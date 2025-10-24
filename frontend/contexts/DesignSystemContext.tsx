"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type DesignSystem = "material" | "human-interface" | "fluent"
export type Theme = "light" | "dark" | "auto"

interface DesignSystemContextType {
  designSystem: DesignSystem
  theme: Theme
  actualTheme: "light" | "dark"
  setDesignSystem: (system: DesignSystem) => void
  setTheme: (theme: Theme) => void
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(
  undefined
)

export function DesignSystemProvider({ children }: { children: ReactNode }) {
  const [designSystem, setDesignSystemState] = useState<DesignSystem>("material")
  const [theme, setThemeState] = useState<Theme>("light")
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedDesignSystem = localStorage.getItem("designSystem") as DesignSystem
    const savedTheme = localStorage.getItem("theme") as Theme
    
    if (savedDesignSystem) {
      setDesignSystemState(savedDesignSystem)
    }
    if (savedTheme) {
      setThemeState(savedTheme)
    }
  }, [])

  // Handle auto theme detection
  useEffect(() => {
    if (!mounted) return

    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      setActualTheme(mediaQuery.matches ? "dark" : "light")

      const handler = (e: MediaQueryListEvent) => {
        setActualTheme(e.matches ? "dark" : "light")
      }

      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
    } else {
      setActualTheme(theme as "light" | "dark")
    }
  }, [theme, mounted])

  // Apply design system and theme to body
  useEffect(() => {
    if (!mounted) return

    document.body.className = `design-${designSystem} theme-${actualTheme}`
  }, [designSystem, actualTheme, mounted])

  const setDesignSystem = (system: DesignSystem) => {
    setDesignSystemState(system)
    localStorage.setItem("designSystem", system)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <DesignSystemContext.Provider
      value={{
        designSystem,
        theme,
        actualTheme,
        setDesignSystem,
        setTheme,
      }}
    >
      {children}
    </DesignSystemContext.Provider>
  )
}

export function useDesignSystem() {
  const context = useContext(DesignSystemContext)
  if (context === undefined) {
    throw new Error("useDesignSystem must be used within a DesignSystemProvider")
  }
  return context
}

