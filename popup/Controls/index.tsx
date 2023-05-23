import { useState } from "react"

import { Button } from "./Button"
import { Slider } from "./Slider"

export const Controls = () => {
  const [message, setMessage] = useState("")
  return (
    <>
      <Button setMessage={setMessage} />

      <p role="alert" id="message">
        {message}
      </p>

      <Slider />
    </>
  )
}
