"use client"

import { Favicon } from "@/components/favicon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash } from "lucide-react"
import { memo } from "react"

interface BlockedSiteRowProps {
  url: string
  isEditing: boolean
  editValue: string
  onEditValueChange: (url: string, value: string) => void
  onEditStart: (url: string) => void
  onEditCancel: (url: string) => void
  onEditSave: (url: string) => void
  onRemove: (url: string) => void
}

export const BlockedSiteRow = memo(function BlockedSiteRow({
  url,
  isEditing,
  editValue,
  onEditValueChange,
  onEditStart,
  onEditCancel,
  onEditSave,
  onRemove
}: BlockedSiteRowProps) {
  const domain = url.split("/")[0]

  return (
    <div className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
      {isEditing ? (
        <>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Favicon domain={domain} />
            <Input
              value={editValue}
              onChange={(e) => onEditValueChange(url, e.target.value)}
              className="h-8 text-sm font-mono"
              autoComplete="off"
            />
          </div>
          <div className="flex space-x-2 shrink-0 ml-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              className="h-8 text-xs"
              onClick={() => onEditSave(url)}>
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => onEditCancel(url)}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 min-w-0">
            <Favicon domain={domain} />
            <span className="font-mono truncate">{url}</span>
          </div>
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onEditStart(url)}>
              <Pencil />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => onRemove(url)}>
              <Trash />
            </Button>
          </div>
        </>
      )}
    </div>
  )
})
