"use client"

import { Separator } from "@/components/ui/separator"
import { normalizeUrl } from "@/lib/url-utils"
import { useCallback } from "react"
import { toast } from "sonner"

import { BlockedSiteList } from "@/components/blocked-site-list"
import { BlockedSiteForm } from "@/components/blocked-site-form"
import { useStorage } from "@plasmohq/storage/hook"

const heading = (
  <div className="p-4">
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      Blocked Sites
    </h1>
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      Add URLs you want to block or manage your blocked sites list.
    </p>
  </div>
)

const emptyState = (
  <>
    <Separator className="my-6" />
    <div className="text-center py-6 text-sm text-muted-foreground">
      No blocked sites yet. Add your first URL above.
    </div>
  </>
)

export function BlockedSites() {
  const [blockedUrls, setBlockedUrls] = useStorage<string[]>("blockedUrls", [])

  const addUrl = useCallback(
    async (rawUrl: string) => {
      const newUrl = normalizeUrl(rawUrl)

      if (blockedUrls.includes(newUrl)) {
        toast.error("URL already exists", {
          description: `${newUrl} is already in your blocked list.`,
          position: "bottom-right"
        })
        return false
      }

      try {
        const updatedUrls = [...blockedUrls, newUrl]
        await setBlockedUrls(updatedUrls)
        toast.success("URL added", {
          description: `${newUrl} has been added to your blocked list.`,
          position: "bottom-right"
        })
        return true
      } catch (error) {
        console.error("Error saving URL:", error)
        toast.error("Failed to save URL", {
          description: "Please try again later.",
          position: "bottom-right"
        })
        return false
      }
    },
    [blockedUrls, setBlockedUrls]
  )

  const handleRemoveUrl = useCallback(
    async (urlToRemove: string) => {
      try {
        const updatedUrls = blockedUrls.filter((u) => u !== urlToRemove)
        await setBlockedUrls(updatedUrls)
        toast.success("URL removed", {
          description: `${urlToRemove} has been removed from your blocked list.`,
          position: "bottom-right"
        })
      } catch (error) {
        console.error("Error removing URL:", error)
        toast.error("Failed to remove URL")
      }
    },
    [blockedUrls, setBlockedUrls]
  )

  const handleUpdateUrl = useCallback(
    async (originalUrl: string, newUrl: string) => {
      try {
        const updatedUrls = blockedUrls.map((u) =>
          u === originalUrl ? newUrl : u
        )
        await setBlockedUrls(updatedUrls)
        toast.success("URL updated", {
          description: `${originalUrl} has been updated to ${newUrl}.`,
          position: "bottom-right"
        })
      } catch (error) {
        console.error("Error updating URL:", error)
        toast.error("Failed to update URL", {
          description: "Please try again later.",
          position: "bottom-right"
        })
      }
    },
    [blockedUrls, setBlockedUrls]
  )

  return (
    <div className="w-full sm:max-w-2xl">
      {heading}
      <div className="p-4">
        <BlockedSiteForm onAdd={addUrl} />

        {blockedUrls.length > 0 ? (
          <BlockedSiteList
            urls={blockedUrls}
            onRemove={handleRemoveUrl}
            onUpdateUrl={handleUpdateUrl}
          />
        ) : (
          emptyState
        )}
      </div>
    </div>
  )
}
