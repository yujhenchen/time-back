"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SearchIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const blockedUrlSchema = z.object({
  url: z
    .string()
    .min(3, "URL must be at least 3 characters.")
    .refine(
      (val) => {
        try {
          const normalized = val.startsWith("http") ? val : "https://" + val
          new URL(normalized)
          return true
        } catch {
          return false
        }
      },
      "Please enter a valid URL (e.g., example.com)",
    ),
})

function normalizeUrl(input: string): string {
  let url = input.trim().toLowerCase()
  url = url.replace(/^https?:\/\//, "")
  url = url.replace(/\/$/, "")
  return url
}

function extractDomain(input: string): string {
  const normalized = normalizeUrl(input)
  return normalized.split("/")[0]
}

function toDomain(phrase: string): string {
  const firstWord = phrase.trim().toLowerCase().split(" ")[0]
  if (firstWord.includes(".")) return firstWord
  return firstWord + ".com"
}

export function BlockedSites() {
  const [blockedUrls, setBlockedUrls] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
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
      url: "",
    },
  })

  const watchedUrl = form.watch("url")

  useEffect(() => {
    const loadBlockedUrls = async () => {
      try {
        const result = await chrome.storage.sync.get(["blockedUrls"])
        setBlockedUrls(result.blockedUrls || [])
      } catch (error) {
        console.error("Error loading blocked URLs:", error)
        toast.error("Failed to load blocked URLs")
      } finally {
        setIsLoading(false)
      }
    }
    loadBlockedUrls()
  }, [])

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
          `https://duckduckgo.com/ac/?q=${encodeURIComponent(trimmed)}&type=list`,
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

  function handleSuggestionSelect(domain: string) {
    form.setValue("url", domain, { shouldValidate: true })
    setShowSuggestions(false)
    setSuggestions([])
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0,
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1,
      )
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      handleSuggestionSelect(suggestions[selectedIndex])
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

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
    const newUrl = normalizeUrl(data.url)

    if (blockedUrls.includes(newUrl)) {
      toast.error("URL already exists", {
        description: `${newUrl} is already in your blocked list.`,
        position: "bottom-right",
      })
      return
    }

    try {
      const updatedUrls = [...blockedUrls, newUrl]
      await chrome.storage.sync.set({ blockedUrls: updatedUrls })
      setBlockedUrls(updatedUrls)
      form.reset()
      setSuggestions([])
      setShowSuggestions(false)
      toast.success("URL added", {
        description: `${newUrl} has been added to your blocked list.`,
        position: "bottom-right",
      })
    } catch (error) {
      console.error("Error saving URL:", error)
      toast.error("Failed to save URL", {
        description: "Please try again later.",
        position: "bottom-right",
      })
    }
  }

  async function handleRemoveUrl(urlToRemove: string) {
    try {
      const updatedUrls = blockedUrls.filter((u) => u !== urlToRemove)
      await chrome.storage.sync.set({ blockedUrls: updatedUrls })
      setBlockedUrls(updatedUrls)
      toast.success("URL removed", {
        description: `${urlToRemove} has been removed from your blocked list.`,
        position: "bottom-right",
      })
    } catch (error) {
      console.error("Error removing URL:", error)
      toast.error("Failed to remove URL")
    }
  }

  return (
    <Card className="w-full sm:max-w-2xl">
      <CardHeader>
        <CardTitle>Blocked Sites</CardTitle>
        <CardDescription>
          Add URLs you want to block or manage your blocked sites list.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="blocked-urls-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="url-input">
                    Add URL
                  </FieldLabel>
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
                          if (suggestions.length > 0)
                            setShowSuggestions(true)
                        }}
                      />
                      {isSearching && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                      )}
                    </div>
                    {showSuggestions && suggestions.length > 0 && (
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
                            onClick={() => handleSuggestionSelect(domain)}
                            onMouseEnter={() => setSelectedIndex(index)}
                          >
                            <img
                              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                              alt=""
                              className="h-4 w-4 shrink-0"
                              onError={(e) => {
                                ;(
                                  e.target as HTMLImageElement
                                ).style.display = "none"
                              }}
                            />
                            <span className="font-mono truncate">
                              {domain}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                    <FieldDescription>
                      Search for a site or type a URL directly.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        {blockedUrls.length > 0 && (
          <>
            <Separator className="my-6" />
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium leading-none mb-3">
                  Blocked URLs ({blockedUrls.length})
                </h3>
                <div className="space-y-2">
                  {blockedUrls.map((url) => (
                    <div
                      key={url}
                      className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${url.split("/")[0]}&sz=16`}
                          alt=""
                          className="h-4 w-4 shrink-0"
                          onError={(e) => {
                            ;(
                              e.target as HTMLImageElement
                            ).style.display = "none"
                          }}
                        />
                        <span className="font-mono truncate">{url}</span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveUrl(url)}
                        className="h-8 text-xs shrink-0 ml-2"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {!isLoading && blockedUrls.length === 0 && (
          <>
            <Separator className="my-6" />
            <div className="text-center py-6 text-sm text-muted-foreground">
              No blocked sites yet. Add your first URL above.
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="blocked-urls-form"
            disabled={isLoading}
          >
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
