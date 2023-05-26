import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { DEFAULT_VALUES, type TStyle } from "~helpers/constants"
import { useCustomMessageWithTimeout } from "~helpers/useCustomMessageWithTimeout"
import { useCustomStorage } from "~helpers/useCustomStorage"

import { Button } from "./Button"
import { Slider } from "./Slider"

export const Controls = () => {
  const {
    styles,
    enabled,
    setStyles,
    setEnabled,
    setStorageStyles,
    setStorageEnabled
  } = useCustomStorage()

  const { message, setMessage } = useCustomMessageWithTimeout()

  return (
    <>
      <Button
        styles={styles}
        enabled={enabled}
        setStyles={setStyles}
        setEnabled={setStorageEnabled}
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
        setStorageStyles={setStorageStyles}
      />
    </>
  )
}
