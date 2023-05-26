import { DEFAULT_VALUES, WSAG_VALUES } from "~helpers/constants"
import { updatePageCSS } from "~helpers/updatePageCSS"

export const Button = ({
  enabled,
  callStorageAPI,
  insertedCSSRef,
  storageStyles,
  setStyles,
  setEnabled,
  setMessage
}) => {
  const handleToggle = () => {
    const payload = enabled ? null : storageStyles
    updatePageCSS(insertedCSSRef, payload)
    setEnabled((prev: boolean) => !prev)
    setMessage(
      `Text spacing properties were ${!enabled ? "enabled" : "disabled"}.`
    )
  }
  const handleWCAG = () => {
    updatePageCSS(insertedCSSRef, WSAG_VALUES)
    setStyles(WSAG_VALUES)
    callStorageAPI(WSAG_VALUES)
    setMessage("Text spacing properties were set to WCAG values.")
  }
  const handleReset = () => {
    updatePageCSS(insertedCSSRef, null)
    setStyles(DEFAULT_VALUES)
    callStorageAPI(DEFAULT_VALUES)
    setMessage("Text spacing properties were reset.")
  }

  return (
    <>
      <button id="toggle" onClick={handleToggle}>
        {enabled ? "Disable" : "Enable"} styles
      </button>
      <button id="wcag" onClick={handleWCAG} disabled={!enabled}>
        Set WCAG values
      </button>
      <button id="reset" onClick={handleReset} disabled={!enabled}>
        Reset values
      </button>
    </>
  )
}
