import type { Storage } from "@plasmohq/storage"

import { type TStyle, WSAG_VALUES } from "~helpers/constants"
import { useStorage } from "~hooks/useStorage"

const buildCSSToInject = (state: TStyle, tabId: number) => {
  let globalStyles = ""
  let paragraphStyles = ""

  Object.keys(state).forEach((key) => {
    if (key === "paragraph-spacing") {
      paragraphStyles += `margin-bottom: ${state[key]}em !important;`
    } else if (key !== "line-height") {
      globalStyles += `${key}: ${state[key]}em !important;`
    } else {
      globalStyles += `${key}: ${state[key]} !important;`
    }
  })

  const payload = {
    target: {
      tabId: tabId,
      allFrames: true
    },
    css: `* { ${globalStyles} } p { ${paragraphStyles} }`
  }

  return payload
}

async function updatePageCss(
  styles: TStyle,
  tabId: number,
  stylesEnabled: boolean,
  storage: Storage
) {
  const oldStyle = await storage.get<{ styles: TStyle }>("styles")
  // if we already injected any styles, remove them before new inject
  if (oldStyle) {
    const payload = buildCSSToInject(oldStyle.styles, tabId)
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

    storage.set("styles", { styles })
  }
}

export const Button = ({ storage, setMessage }) => {
  const { styles, enabled, setStyles, setEnabled } = useStorage(storage)

  const handleToggle = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      updatePageCss(styles, tabs[0].id, !enabled, storage)
    })
    setEnabled((prev) => !prev)
    setMessage(
      `Text spacing properties were ${!enabled ? "enabled" : "disabled"}.`
    )
  }
  const handleWCAG = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      updatePageCss(WSAG_VALUES, tabs[0].id, enabled, storage)
    })
    setStyles(WSAG_VALUES)
    setMessage("Text spacing properties were set to WCAG values.")
  }
  const handleReset = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      updatePageCss(styles, tabs[0].id, enabled, storage)
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
