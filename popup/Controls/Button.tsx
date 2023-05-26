import { useStorage } from "@plasmohq/storage/hook"

import { DEFAULT_VALUES, type TStyle, WSAG_VALUES } from "~helpers/constants"
import { updatePageCss } from "~helpers/updatePageCSS"

export const Button = ({
  styles,
  enabled,
  setStyles,
  setEnabled,
  setMessage
}) => {
  const handleToggle = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      updatePageCss(styles, styles, tabs[0].id, !enabled)
    })
    setEnabled((prev: boolean) => !prev)
    setMessage(
      `Text spacing properties were ${!enabled ? "enabled" : "disabled"}.`
    )
  }
  const handleWCAG = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      updatePageCss(styles, WSAG_VALUES, tabs[0].id, enabled)
    })
    setStyles(WSAG_VALUES)
    setMessage("Text spacing properties were set to WCAG values.")
  }
  const handleReset = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      updatePageCss(styles, DEFAULT_VALUES, tabs[0].id, false)
    })
    setStyles(DEFAULT_VALUES)

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
