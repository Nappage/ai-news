'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  systemTheme: 'light' | 'dark'
  resolvedTheme: 'light' | 'dark'
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  systemTheme: 'light',
  resolvedTheme: 'light',
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem('theme') as Theme
    if (storedTheme) {
      setTheme(storedTheme)
    }

    // システムテーマの初期値を設定
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    // システムテーマの変更を監視
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system' && enableSystem) {
      const currentSystemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(currentSystemTheme)
      setSystemTheme(currentSystemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, enableSystem, mounted])

  const resolvedTheme = theme === 'system' ? systemTheme : theme

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem('theme', theme)
      setTheme(theme)
    },
    systemTheme,
    resolvedTheme,
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}