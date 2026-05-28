import "@testing-library/jest-dom"

jest.mock("@plasmohq/storage")
jest.mock("@plasmohq/storage/hook")

const mockStorage = new Map<string, string>()

const mockChromeStorage = {
  sync: {
    get: jest.fn(
      (keys: string | string[] | Record<string, unknown> | null): Promise<Record<string, unknown>> => {
        if (keys === null) {
          return Promise.resolve(Object.fromEntries(mockStorage))
        }
        if (typeof keys === "string") {
          return Promise.resolve({ [keys]: mockStorage.get(keys) ?? null })
        }
        if (Array.isArray(keys)) {
          const result: Record<string, unknown> = {}
          for (const k of keys) result[k] = mockStorage.get(k) ?? null
          return Promise.resolve(result)
        }
        const result: Record<string, unknown> = {}
        for (const [k, v] of Object.entries(keys)) {
          result[k] = mockStorage.get(k) ?? v
        }
        return Promise.resolve(result)
      },
    ),
    set: jest.fn((items: Record<string, unknown>): Promise<void> => {
      for (const [k, v] of Object.entries(items)) {
        mockStorage.set(k, String(v))
      }
      return Promise.resolve()
    }),
    remove: jest.fn((keys: string | string[]): Promise<void> => {
      const ks = Array.isArray(keys) ? keys : [keys]
      for (const k of ks) mockStorage.delete(k)
      return Promise.resolve()
    }),
    clear: jest.fn((): Promise<void> => {
      mockStorage.clear()
      return Promise.resolve()
    }),
  },
}

Object.defineProperty(globalThis, "chrome", {
  value: {
    storage: mockChromeStorage,
    runtime: {
      getURL: jest.fn((path: string) => `chrome-extension://mock/${path}`),
      onInstalled: { addListener: jest.fn() },
      onStartup: { addListener: jest.fn() },
    },
    declarativeNetRequest: {
      getDynamicRules: jest.fn().mockResolvedValue([]),
      updateDynamicRules: jest.fn().mockResolvedValue(undefined),
      RuleActionType: { REDIRECT: "redirect" },
      ResourceType: { MAIN_FRAME: "main_frame", SUB_FRAME: "sub_frame" },
    },
    webRequest: {
      onBeforeRequest: { addListener: jest.fn() },
      BlockingResponse: {},
    },
  },
  writable: true,
  configurable: true,
})
