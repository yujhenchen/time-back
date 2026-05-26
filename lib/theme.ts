export function setThemeClass(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark")
}
