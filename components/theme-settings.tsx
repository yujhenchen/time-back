"use client"

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Moon, Sun } from "lucide-react"

import { useStorage } from "@plasmohq/storage/hook"

export function ThemeSettings() {
  const [theme, setTheme] = useStorage<"light" | "dark">("theme", "light")

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement
    if (newTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }

  const handleThemeChange = async (newTheme: "light" | "dark") => {
    applyTheme(newTheme)
    await setTheme(newTheme)
  }

  return (
    <div className="space-y-6">
      <Field>
        <div className="flex gap-2 mt-3 justify-center">
          <Button
            type="button"
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => handleThemeChange("light")}
            className="flex-1">
            <Sun className="h-4 w-4 mr-2" />
            Light
          </Button>
          <Button
            type="button"
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => handleThemeChange("dark")}
            className="flex-1">
            <Moon className="h-4 w-4 mr-2" />
            Dark
          </Button>
        </div>
      </Field>
    </div>
  )
}
