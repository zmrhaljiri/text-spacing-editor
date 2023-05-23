import { useStorage } from "@plasmohq/storage/hook"

import { buildCSSToInject } from "~helpers/buildCSSToInject"
import { type TStyle, WSAG_VALUES } from "~helpers/constants"

async function updatePageCss(
  styles: TStyle,
  tabId: number,
  stylesEnabled: boolean
) {
  //if we already injected any styles, remove them before new inject
  if (styles) {
    const payload = buildCSSToInject(styles, tabId)
    await chrome.scripting.removeCSS(payload)
  }

  if (stylesEnabled) {
    // Generate payload for new state
    const payload = buildCSSToInject(styles, tabId)

    try {
      await chrome.scripting.insertCSS(payload)
    } catch (err) {
      console.error(`failed to insert CSS: ${err}`)
    }
  }
}

export const Button = ({ setMessage }) => {
  const [styles, setStyles] = useStorage("styles")
  const [enabled, setEnabled] = useStorage("enabled", false)

  const handleToggle = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      updatePageCss(styles, tabs[0].id, !enabled)
    })
    setEnabled((prev) => !prev)
    setMessage(
      `Text spacing properties were ${!enabled ? "enabled" : "disabled"}.`
    )
  }
  const handleWCAG = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      updatePageCss(WSAG_VALUES, tabs[0].id, enabled)
    })
    setStyles(WSAG_VALUES)
    setMessage("Text spacing properties were set to WCAG values.")
  }
  const handleReset = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      updatePageCss(styles, tabs[0].id, false)
    })
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
