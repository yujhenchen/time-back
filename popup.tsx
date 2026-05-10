import { Toaster } from "sonner"
import "styles/globals.css"
import { Settings } from "./settings"

function IndexPopup() {
  return (
    <div
      className='min-w-96 p-4'>
      <Settings />
      <Toaster />
    </div>
  )
}

export default IndexPopup
