import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { DEFAULT_VALUES, type TStyle } from "~helpers/constants"
import { useCustomMessageWithTimeout } from "~helpers/useCustomMessageWithTimeout"

import { Button } from "./Button"
import { Slider } from "./Slider"

export const Controls = () => {
  // Set default storage values
  const [styles, setStyles, { setRenderValue }] = useStorage<TStyle>(
    "styles",
    (v) => (v === undefined || null ? DEFAULT_VALUES : v)
  )
  const [enabled, setEnabled] = useStorage<boolean>("enabled", (v) =>
    v === undefined || null ? true : v
  )
  const { message, setMessage } = useCustomMessageWithTimeout()

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

      <div
        style={{
          position: "relative",
          padding: "1rem 0",
          margin: "0 0 1rem 0"
        }}>
        <p role="alert" id="message">
          {message}
        </p>
      </div>

      <Slider
        styles={styles}
        enabled={enabled}
        setStyles={setStyles}
        setRenderValue={setRenderValue}
      />
    </>
  )
}
