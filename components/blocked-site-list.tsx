"use client"

import { BlockedSiteRow } from "@/components/blocked-site-row"
import { Separator } from "@/components/ui/separator"
import { normalizeUrl } from "@/lib/url-utils"
import { memo, useCallback, useState } from "react"
import { toast } from "sonner"
import * as z from "zod"

export const blockedUrlSchema = z.object({
  url: z
    .string()
    .min(3, "URL must be at least 3 characters.")
    .refine((val) => {
      try {
        const normalized = val.startsWith("http") ? val : "https://" + val
        new URL(normalized)
        return true
      } catch {
        return false
      }
    }, "Please enter a valid URL (e.g., example.com)")
})

export const listSeparator = <Separator className="my-6" />

interface BlockedSiteListProps {
  urls: string[]
  onRemove: (url: string) => void
  onUpdateUrl: (originalUrl: string, newUrl: string) => void
}

export const BlockedSiteList = memo(function BlockedSiteList({
  urls,
  onRemove,
  onUpdateUrl
}: BlockedSiteListProps) {
  const [editingUrls, setEditingUrls] = useState<Set<string>>(new Set())
  const [editValues, setEditValues] = useState<Record<string, string>>({})

  const handleEditStart = useCallback((url: string) => {
    setEditingUrls((prev) => new Set(prev).add(url))
    setEditValues((prev) => ({ ...prev, [url]: url }))
  }, [])

  const handleEditCancel = useCallback((url: string) => {
    setEditingUrls((prev) => {
      const next = new Set(prev)
      next.delete(url)
      return next
    })
    setEditValues((prev) => {
      const next = { ...prev }
      delete next[url]
      return next
    })
  }, [])

  const handleEditValueChange = useCallback((url: string, value: string) => {
    setEditValues((prev) => ({ ...prev, [url]: value }))
  }, [])

  const handleEditSave = useCallback(
    async (originalUrl: string) => {
      const rawValue = editValues[originalUrl]
      if (!rawValue) return

      const result = blockedUrlSchema.safeParse({ url: rawValue })
      if (!result.success) {
        const error = result.error.issues[0]?.message || "Invalid URL"
        toast.error(error)
        return
      }

      const newUrl = normalizeUrl(rawValue)

      if (newUrl === originalUrl) {
        handleEditCancel(originalUrl)
        return
      }

      if (urls.includes(newUrl)) {
        toast.error("URL already exists", {
          description: `${newUrl} is already in your blocked list.`,
          position: "bottom-right"
        })
        return
      }

      await onUpdateUrl(originalUrl, newUrl)
      handleEditCancel(originalUrl)
    },
    [editValues, urls, onUpdateUrl, handleEditCancel]
  )

  return (
    <>
      {listSeparator}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium leading-none mb-3">
            Blocked URLs ({urls.length})
          </h3>
          <div className="space-y-2">
            {urls.map((url) => {
              const isEditing = editingUrls.has(url)
              return (
                <BlockedSiteRow
                  key={url}
                  url={url}
                  isEditing={isEditing}
                  editValue={editValues[url] || ""}
                  onEditValueChange={handleEditValueChange}
                  onEditStart={handleEditStart}
                  onEditCancel={handleEditCancel}
                  onEditSave={handleEditSave}
                  onRemove={onRemove}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
})
