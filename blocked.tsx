"use client"

import { useEffect, useState } from "react"

import "styles/globals.css"

interface TriviaData {
  category: string
  question: string
  answer: string
}

type PageState =
  | { status: "loading" }
  | { status: "trivia"; data: TriviaData }
  | { status: "error" }

function decodeHtml(str: string): string {
  return new DOMParser().parseFromString(str, "text/html").body
    .textContent || ""
}

function BlockedPage() {
  const [state, setState] = useState<PageState>({ status: "loading" })
  const [showAnswer, setShowAnswer] = useState(false)

  const params = new URLSearchParams(window.location.search)
  const blockedUrl = params.get("url")

  useEffect(() => {
    document.title = "Site Blocked"

    fetch("https://opentdb.com/api.php?amount=1")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status)
        return res.json()
      })
      .then((data) => {
        if (
          !data ||
          data.response_code !== 0 ||
          !data.results ||
          data.results.length === 0
        ) {
          throw new Error("Invalid response")
        }
        const q = data.results[0]
        setState({
          status: "trivia",
          data: {
            category: decodeHtml(q.category),
            question: decodeHtml(q.question),
            answer: decodeHtml(q.correct_answer)
          }
        })
      })
      .catch(() => {
        setState({ status: "error" })
      })
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-[420px] p-6">
        <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
          🚫 Site Blocked
        </p>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          {state.status === "loading" && (
            <div className="py-8 text-center text-muted-foreground">
              Loading&hellip;
            </div>
          )}

          {state.status === "trivia" && (
            <>
              <span className="mb-4 inline-block rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                {state.data.category}
              </span>
              <p className="mb-5 text-lg leading-relaxed text-card-foreground">
                {state.data.question}
              </p>
              <div className="mb-4">
                <div
                  className={`mb-3 rounded-lg bg-secondary p-3 text-base leading-relaxed text-card-foreground ${
                    showAnswer ? "block" : "hidden"
                  }`}>
                  {state.data.answer}
                </div>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
              </div>
            </>
          )}

          {state.status === "error" && (
            <div className="py-8 text-center text-card-foreground">
              <h2 className="mb-2 text-xl font-semibold">
                This site is blocked.
              </h2>
              <p className="text-sm text-muted-foreground">
                time-guard has blocked this site.
              </p>
            </div>
          )}
        </div>

        {blockedUrl && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Blocked: <span className="font-mono">{blockedUrl}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default BlockedPage
