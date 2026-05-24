"use client"

import "styles/globals.css"

import { useEffect, useState } from "react"

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="tabular-nums">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  )
}

function NewTabPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <h1 className="scroll-m-20 text-8xl font-extrabold tracking-tight">
        <Clock />
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">time-guard</p>
    </div>
  )
}

export default NewTabPage
