"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

import { useStorage } from "@plasmohq/storage/hook"

export function ThemeToggle() {
  const [theme, setTheme] = useStorage<"light" | "dark">("theme", "light")

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement
    if (newTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light"
    applyTheme(newTheme)
    await setTheme(newTheme)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
