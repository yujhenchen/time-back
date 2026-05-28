/**
 * @jest-environment jsdom
 */

import { setThemeClass } from "@/lib/theme"

beforeEach(() => {
  document.documentElement.classList.remove("dark")
})

describe("setThemeClass", () => {
  it("adds dark class when theme is dark", () => {
    setThemeClass("dark")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })

  it("removes dark class when theme is light", () => {
    document.documentElement.classList.add("dark")
    setThemeClass("light")
    expect(document.documentElement.classList.contains("dark")).toBe(false)
  })
})
