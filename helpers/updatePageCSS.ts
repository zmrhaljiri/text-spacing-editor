import { buildCSSToInject } from "./buildCSSToInject"
import type { TStyle } from "./constants"

export async function updatePageCss(
  oldStyles: TStyle,
  styles: TStyle,
  tabId: number,
  stylesEnabled: boolean
) {
  // If we already injected any styles, remove them before new inject
  if (oldStyles) {
    const payload = buildCSSToInject(oldStyles, tabId)
    try {
      await chrome.scripting.removeCSS(payload)
    } catch (err) {
      console.error(`failed to remove CSS: ${err}`)
    }
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
