import type { TStyle } from "./constants"

export const buildCSSToInject = (state: TStyle, tabId: number) => {
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
