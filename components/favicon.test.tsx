import { render } from "@testing-library/react"
import { Favicon } from "@/components/favicon"

describe("Favicon", () => {
  it("renders an image with the correct favicon URL", () => {
    const { container } = render(<Favicon domain="example.com" />)
    const img = container.querySelector("img")
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      "src",
      "https://www.google.com/s2/favicons?domain=example.com&sz=16",
    )
  })

  it("hides image on error", () => {
    const { container } = render(<Favicon domain="example.com" />)
    const img = container.querySelector("img")!
    img.dispatchEvent(new Event("error"))
    expect(img).toHaveStyle("display: none")
  })
})
