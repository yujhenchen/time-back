import { useState, useCallback } from "react"

const store = new Map<string, unknown>()

export function useStorage<T = string>(
  key: string,
  defaultValue?: T,
): [T | undefined, (value: T) => void] {
  const [value, setValue] = useState<T | undefined>(
    () => (store.has(key) ? (store.get(key) as T) : defaultValue),
  )

  const set = useCallback(
    (newValue: T) => {
      store.set(key, newValue)
      setValue(newValue)
    },
    [key],
  )

  return [value, set]
}

export function __clearStorageForTests() {
  store.clear()
}
