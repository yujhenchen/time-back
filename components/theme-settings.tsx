"use client"

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { setThemeClass } from "@/lib/theme"
import { Moon, Sun } from "lucide-react"
import { useCallback, useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

export function ThemeSettings() {
  const [theme, setTheme] = useStorage<"light" | "dark">("theme", "light")

  const handleLight = useCallback(async () => {
    setThemeClass("light")
    await setTheme("light")
  }, [setTheme])

  const handleDark = useCallback(async () => {
    setThemeClass("dark")
    await setTheme("dark")
  }, [setTheme])

  useEffect(() => {
    setThemeClass(theme)
  }, [theme])

  return (
    <div className="space-y-6">
      <Field>
        <div className="flex gap-2 mt-3 justify-center">
          <Button
            type="button"
            variant={theme === "light" ? "default" : "outline"}
            onClick={handleLight}
            className="flex-1">
            <Sun className="h-4 w-4 mr-2" />
            Light
          </Button>
          <Button
            type="button"
            variant={theme === "dark" ? "default" : "outline"}
            onClick={handleDark}
            className="flex-1">
            <Moon className="h-4 w-4 mr-2" />
            Dark
          </Button>
        </div>
      </Field>
    </div>
  )
}
