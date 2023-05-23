import { useEffect, useState } from "react"

export const useCustomMessageWithTimeout = () => {
  const [message, setMessage] = useState("")

  useEffect(() => {
    ;(async () => {
      await new Promise((resolve) =>
        setTimeout(() => resolve(setMessage("")), 3000)
      )
    })()
  }, [message])

  return { message, setMessage }
}
