const store = new Map<string, unknown>()
const watchers = new Map<string, Set<(value: unknown) => void>>()

export class Storage {
  get = jest.fn(async <T = string>(key: string): Promise<T | undefined> => {
    return store.get(key) as T | undefined
  })

  set = jest.fn(async (key: string, value: unknown): Promise<null> => {
    store.set(key, value)
    const cbs = watchers.get(key)
    if (cbs) {
      for (const cb of cbs) cb(value)
    }
    return null
  })

  remove = jest.fn(async (key: string): Promise<void> => {
    store.delete(key)
  })

  getMany = jest.fn(async <T = any>(keys: string[]): Promise<Record<string, T | undefined>> => {
    const result: Record<string, T | undefined> = {}
    for (const k of keys) result[k] = store.get(k) as T | undefined
    return result
  })

  setMany = jest.fn(async (items: Record<string, unknown>): Promise<null> => {
    for (const [k, v] of Object.entries(items)) {
      store.set(k, v)
      const cbs = watchers.get(k)
      if (cbs) {
        for (const cb of cbs) cb(v)
      }
    }
    return null
  })

  watch = jest.fn((callbackMap: Record<string, (change: unknown) => void>): boolean => {
    for (const [key, cb] of Object.entries(callbackMap)) {
      if (!watchers.has(key)) watchers.set(key, new Set())
      watchers.get(key)!.add(cb)
    }
    return true
  })

  unwatch = jest.fn((callbackMap: Record<string, (change: unknown) => void>): boolean => {
    for (const [key, cb] of Object.entries(callbackMap)) {
      const cbs = watchers.get(key)
      if (cbs) cbs.delete(cb)
    }
    return true
  })

  unwatchAll = jest.fn(() => {
    watchers.clear()
  })

  clear = jest.fn(async () => {
    store.clear()
    watchers.clear()
  })

  getAll = jest.fn(async (): Promise<Record<string, string>> => {
    const result: Record<string, string> = {}
    for (const [k, v] of store.entries()) result[k] = String(v)
    return result
  })

  static clearStore() {
    store.clear()
    watchers.clear()
  }
}
