"use client"

import { memo } from "react"

interface FaviconProps {
  domain: string
}

export const Favicon = memo(function Favicon({ domain }: FaviconProps) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
      alt=""
      className="h-4 w-4 shrink-0"
      onError={(e) => {
        ;(e.target as HTMLImageElement).style.display = "none"
      }}
    />
  )
})
