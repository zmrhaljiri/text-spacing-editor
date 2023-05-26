import { useCustomMessageWithTimeout } from "~helpers/useCustomMessageWithTimeout"
import { useCustomStorage } from "~helpers/useCustomStorage"

import { Button } from "./Button"
import { Slider } from "./Slider"

export const Controls = () => {
  const {
    styles,
    enabled,
    storageStyles,
    insertedCSSRef,
    setStyles,
    setEnabled,
    callStorageAPI
  } = useCustomStorage()

  const { message, setMessage } = useCustomMessageWithTimeout()

  return (
    <>
      <Button
        storageStyles={storageStyles}
        enabled={enabled}
        setStyles={setStyles}
        setEnabled={setEnabled}
        setMessage={setMessage}
        callStorageAPI={callStorageAPI}
        insertedCSSRef={insertedCSSRef}
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
        callStorageAPI={callStorageAPI}
        insertedCSSRef={insertedCSSRef}
      />
    </>
  )
}
