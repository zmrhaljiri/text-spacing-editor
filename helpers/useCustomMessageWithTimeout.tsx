import { useEffect, useState } from "react"

export const useCustomMessageWithTimeout = () => {
  const [message, setMessage] = useState("")

  useEffect(() => {
    setTimeout(() => setMessage(""), 3000)
  }, [message])

  return { message, setMessage }
}
