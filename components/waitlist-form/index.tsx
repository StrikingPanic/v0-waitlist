"use client"
import clsx from "clsx"
import type React from "react"

import { useRef, useState, useEffect } from "react"

type InputForm = {
  /** POSTs FormData with Accept: application/json (Formspree-compatible). Takes precedence over formAction. */
  formspreeEndpoint?: string
  formAction?: (data: FormData) => Promise<{ success: true } | { success: false; error: string }>
  buttonCopy: {
    success: string
    idle: string
    loading: string
  }
} & React.HTMLAttributes<HTMLInputElement>

type State = "idle" | "loading" | "success" | "error"

const STATES: Record<State, State> = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
}

export function InputForm({ formAction, formspreeEndpoint, buttonCopy, ...props }: InputForm) {
  const [state, setState] = useState<State>(STATES.idle)
  const [error, setError] = useState<string>()
  const [value, setValue] = useState("")
  const errorTimeout = useRef<NodeJS.Timeout | null>(null)

  // Auto-reset success state back to idle after 2 seconds
  useEffect(() => {
    if (state === STATES.success) {
      const resetTimeout = setTimeout(() => {
        setState(STATES.idle)
      }, 2000)

      return () => clearTimeout(resetTimeout)
    }
  }, [state])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    if (state === STATES.success || state === STATES.loading) return
    if (errorTimeout.current) {
      clearTimeout(errorTimeout.current)
      setError(undefined)
      setState(STATES.idle)
    }
    const scheduleErrorReset = () => {
      errorTimeout.current = setTimeout(() => {
        setError(undefined)
        setState(STATES.idle)
      }, 3000)
    }

    if (formspreeEndpoint) {
      try {
        setState(STATES.loading)
        const res = await fetch(formspreeEndpoint, {
          method: "POST",
          body: new FormData(formEl),
          headers: { Accept: "application/json" },
        })
        const payload = (await res.json().catch(() => ({}))) as {
          ok?: boolean
          error?: string
          errors?: Record<string, string>
        }
        if (res.ok && payload.ok) {
          setState(STATES.success)
          formEl.reset()
          setValue("")
        } else {
          setState(STATES.error)
          const msg =
            payload.error ||
            (payload.errors && Object.values(payload.errors)[0]) ||
            "There was an error while submitting the form"
          setError(msg)
          scheduleErrorReset()
        }
      } catch (error) {
        setState(STATES.error)
        setError("There was an error while submitting the form")
        console.error(error)
        scheduleErrorReset()
      }
      return
    }

    if (formAction && typeof formAction === "function") {
      try {
        setState(STATES.loading)
        const data = await formAction(new FormData(formEl))

        if (data.success) {
          setState(STATES.success)

          formEl.reset()
          setValue("")
        } else {
          setState(STATES.error)
          setError(data.error)
          scheduleErrorReset()
        }
      } catch (error) {
        setState(STATES.error)
        setError("There was an error while submitting the form")
        console.error(error)
        scheduleErrorReset()
      }
    }
  }
  const isSubmitted = state === "success"
  const inputDisabled = state === "loading"

  return (
    <form className="flex flex-col gap-2 w-full relative" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-3 relative">
        <input
          {...props}
          value={value}
          className={clsx(
            "flex-1 text-sm pl-4 pr-28 py-2 h-11 bg-slate-11/30 cursor-text rounded-full text-slate-1 placeholder:text-slate-9 border border-slate-10/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all",
          )}
          disabled={inputDisabled}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          data-1p-ignore
          data-lpignore
          autoFocus
        />
        <button
          type="submit"
          disabled={inputDisabled}
          className={clsx(
            "absolute h-8 px-3.5 bg-primary text-primary-foreground text-sm top-1/2 transform -translate-y-1/2 right-1.5 rounded-full font-medium flex gap-1 items-center transition-all",
            "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70",
            inputDisabled && "cursor-not-allowed",
          )}
        >
          {state === "loading" ? (
            <>
              {buttonCopy.loading}
              <Loading />
            </>
          ) : isSubmitted ? (
            buttonCopy.success
          ) : (
            buttonCopy.idle
          )}
        </button>
      </div>
      <div className="w-full h-2" />
      {error && <p className="absolute text-xs text-[#ff0000] top-full -translate-y-1/2 px-2">{error}</p>}
    </form>
  )
}

const Loading = () => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 !border-t-primary-foreground animate-spin" />
  </div>
)
