"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { normalizeUrl, toDomain } from "@/lib/url-utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, SearchIcon, Trash } from "lucide-react"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { useStorage } from "@plasmohq/storage/hook"

const blockedUrlSchema = z.object({
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

const listSeparator = <Separator className="my-6" />

const emptyState = (
  <>
    {listSeparator}
    <div className="text-center py-6 text-sm text-muted-foreground">
      No blocked sites yet. Add your first URL above.
    </div>
  </>
)

const Favicon = memo(function Favicon({ domain }: { domain: string }) {
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

interface SuggestionDropdownProps {
  suggestions: string[]
  selectedIndex: number
  onSelect: (domain: string) => void
  onHover: (index: number) => void
}

const SuggestionDropdown = memo(function SuggestionDropdown({
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

const BlockedSiteRow = memo(function BlockedSiteRow({
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

interface BlockedSiteListProps {
  urls: string[]
  onRemove: (url: string) => void
  onUpdateUrl: (originalUrl: string, newUrl: string) => void
}

const BlockedSiteList = memo(function BlockedSiteList({
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

function BlockedSiteForm({
  onAdd
}: {
  onAdd: (rawUrl: string) => Promise<boolean>
}) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isSearching, setIsSearching] = useState(false)
  const searchTimer = useRef<ReturnType<typeof setTimeout>>()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<z.infer<typeof blockedUrlSchema>>({
    resolver: zodResolver(blockedUrlSchema),
    defaultValues: {
      url: ""
    }
  })

  const watchedUrl = form.watch("url")

  useEffect(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    const trimmed = watchedUrl.trim()
    if (trimmed.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setIsSearching(true)
    searchTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://duckduckgo.com/ac/?q=${encodeURIComponent(trimmed)}&type=list`
        )
        const data = await res.json()

        let phrases: string[] = []
        if (Array.isArray(data) && data.length > 0 && data[0].phrase) {
          phrases = data.map((item: { phrase: string }) => item.phrase)
        } else if (Array.isArray(data) && Array.isArray(data[1])) {
          phrases = data[1] as string[]
        }

        const domains = [...new Set(phrases.map(toDomain).filter(Boolean))]
        setSuggestions(domains)
        setShowSuggestions(domains.length > 0)
        setSelectedIndex(-1)
      } catch {
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current)
      }
    }
  }, [watchedUrl])

  const handleSuggestionSelect = useCallback(
    async (domain: string) => {
      const success = await onAdd(domain)
      if (success) {
        form.reset()
        setSuggestions([])
        setShowSuggestions(false)
      }
    },
    [onAdd, form]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions || suggestions.length === 0) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault()
        handleSuggestionSelect(suggestions[selectedIndex])
      } else if (e.key === "Escape") {
        setShowSuggestions(false)
      }
    },
    [showSuggestions, suggestions, selectedIndex, handleSuggestionSelect]
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function onSubmit(data: z.infer<typeof blockedUrlSchema>) {
    const success = await onAdd(data.url)
    if (success) {
      form.reset()
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  return (
    <form id="blocked-urls-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="url-input">Add URL</FieldLabel>
              <div className="relative" ref={dropdownRef}>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  <Input
                    {...field}
                    id="url-input"
                    ref={(e) => {
                      field.ref(e)
                      inputRef.current = e
                    }}
                    aria-invalid={fieldState.invalid}
                    placeholder="Search or type a URL..."
                    autoComplete="off"
                    className="pl-9"
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                      if (suggestions.length > 0) setShowSuggestions(true)
                    }}
                  />
                  {isSearching ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                  ) : null}
                </div>
                <Button type="submit" form="blocked-urls-form">
                  Save
                </Button>

                {showSuggestions && suggestions.length > 0 ? (
                  <SuggestionDropdown
                    suggestions={suggestions}
                    selectedIndex={selectedIndex}
                    onSelect={handleSuggestionSelect}
                    onHover={setSelectedIndex}
                  />
                ) : null}
                <FieldDescription>
                  Search for a site or type a URL directly.
                </FieldDescription>
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </div>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}

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
