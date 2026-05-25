export function normalizeUrl(input: string): string {
  let url = input.trim().toLowerCase()
  url = url.replace(/^https?:\/\//, "")
  url = url.replace(/\/$/, "")
  return url
}

export function toDomain(phrase: string): string {
  const firstWord = phrase.trim().toLowerCase().split(" ")[0]
  if (firstWord.includes(".")) return firstWord
  return firstWord + ".com"
}
