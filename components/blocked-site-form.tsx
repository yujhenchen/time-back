"use client";

import { blockedUrlSchema } from "@/components/blocked-site-list";
import { SuggestionDropdown } from "@/components/suggestion-dropdown";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toDomain } from "@/lib/url-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type * as z from "zod";

export function BlockedSiteForm({
  onAdd,
}: {
  onAdd: (rawUrl: string) => Promise<boolean>;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof blockedUrlSchema>>({
    resolver: zodResolver(blockedUrlSchema),
    defaultValues: {
      url: "",
    },
  });

  const watchedUrl = form.watch("url");

  useEffect(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    const trimmed = watchedUrl.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://duckduckgo.com/ac/?q=${encodeURIComponent(trimmed)}&type=list`,
        );
        const data = await res.json();

        let phrases: string[] = [];
        if (Array.isArray(data) && data.length > 0 && data[0].phrase) {
          phrases = data.map((item: { phrase: string }) => item.phrase);
        } else if (Array.isArray(data) && Array.isArray(data[1])) {
          phrases = data[1] as string[];
        }

        const domains = [...new Set(phrases.map(toDomain).filter(Boolean))];
        setSuggestions(domains);
        setShowSuggestions(domains.length > 0);
        setSelectedIndex(-1);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, [watchedUrl]);

  const handleSuggestionSelect = useCallback(
    async (domain: string) => {
      const success = await onAdd(domain);
      if (success) {
        form.reset();
        setSuggestions([]);
        setShowSuggestions(false);
      }
    },
    [onAdd, form],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions || suggestions.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1,
        );
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        handleSuggestionSelect(suggestions[selectedIndex]);
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    },
    [showSuggestions, suggestions, selectedIndex, handleSuggestionSelect],
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function onSubmit(data: z.infer<typeof blockedUrlSchema>) {
    const success = await onAdd(data.url);
    if (success) {
      form.reset();
      setSuggestions([]);
      setShowSuggestions(false);
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
                <div className="w-full flex space-x-2">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      {...field}
                      id="url-input"
                      ref={(e) => {
                        field.ref(e);
                      }}
                      aria-invalid={fieldState.invalid}
                      placeholder="Search for a site or type a URL..."
                      autoComplete="off"
                      className="pl-9"
                      onKeyDown={handleKeyDown}
                      onFocus={() => {
                        if (suggestions.length > 0) setShowSuggestions(true);
                      }}
                    />
                    {isSearching ? (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                    ) : null}
                  </div>
                  <Button type="submit" form="blocked-urls-form">
                    Save
                  </Button>
                </div>

                {showSuggestions && suggestions.length > 0 ? (
                  <SuggestionDropdown
                    suggestions={suggestions}
                    selectedIndex={selectedIndex}
                    onSelect={handleSuggestionSelect}
                    onHover={setSelectedIndex}
                  />
                ) : null}
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </div>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
