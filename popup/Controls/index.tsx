import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { DEFAULT_VALUES, type TStyle } from "~helpers/constants"

import { Button } from "./Button"
import { Slider } from "./Slider"

export const Controls = () => {
  const [message, setMessage] = useState("")
  // Set default storage values
  const [styles, setStyles, { setRenderValue }] = useStorage<TStyle>(
    "styles",
    (v) => (v === undefined || null ? DEFAULT_VALUES : v)
  )
  const [enabled, setEnabled] = useStorage<boolean>("enabled", (v) =>
    v === undefined || null ? false : v
  )
  return (
    <>
      <Button
        styles={styles}
        enabled={enabled}
        setStyles={setStyles}
        setEnabled={setEnabled}
        setRenderValue={setRenderValue}
        setMessage={setMessage}
      />

      <p role="alert" id="message">
        {message}
      </p>

      <Slider
        styles={styles}
        enabled={enabled}
        setStyles={setStyles}
        setRenderValue={setRenderValue}
      />
    </>
  )
}
