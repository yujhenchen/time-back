"use client"

import { Favicon } from "@/components/favicon"
import { memo } from "react"

interface SuggestionDropdownProps {
  suggestions: string[]
  selectedIndex: number
  onSelect: (domain: string) => void
  onHover: (index: number) => void
}

export const SuggestionDropdown = memo(function SuggestionDropdown({
  suggestions,
  selectedIndex,
  onSelect,
  onHover
}: SuggestionDropdownProps) {
  return (
    <div className="absolute z-20 mt-1 w-full rounded-md border border-input bg-popover text-popover-foreground shadow-md max-h-60 overflow-y-auto">
      {suggestions.map((domain, index) => (
        <button
          key={domain}
          type="button"
          className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-left ${
            index === selectedIndex
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
          onClick={() => onSelect(domain)}
          onMouseEnter={() => onHover(index)}>
          <Favicon domain={domain} />
          <span className="font-mono truncate">{domain}</span>
        </button>
      ))}
    </div>
  )
})
