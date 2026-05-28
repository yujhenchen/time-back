import { normalizeUrl, toDomain } from "@/lib/url-utils"

describe("normalizeUrl", () => {
  it("trims whitespace and lowercases", () => {
    expect(normalizeUrl("  EXAMPLE.COM ")).toBe("example.com")
  })

  it("strips https:// prefix", () => {
    expect(normalizeUrl("https://example.com")).toBe("example.com")
  })

  it("strips http:// prefix", () => {
    expect(normalizeUrl("http://example.com")).toBe("example.com")
  })

  it("removes trailing slash", () => {
    expect(normalizeUrl("example.com/")).toBe("example.com")
  })

  it("handles complex URLs", () => {
    expect(normalizeUrl("  HTTPS://Sub.Example.COM/path/ ")).toBe(
      "sub.example.com/path",
    )
  })
})

describe("toDomain", () => {
  it("returns the first word with .com if no dot present", () => {
    expect(toDomain("example")).toBe("example.com")
  })

  it("returns the phrase as-is if it contains a dot", () => {
    expect(toDomain("example.org")).toBe("example.org")
  })

  it("ignores extra words after first", () => {
    expect(toDomain("my favorite site")).toBe("my.com")
  })

  it("trims and lowercases", () => {
    expect(toDomain("  EXAMPLE ")).toBe("example.com")
  })
})
