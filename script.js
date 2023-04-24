//
// Config
//

const config = [
  {
    property: "line-height",
    inputElement: document.getElementById('input-line-height'),
    textValue: document.getElementById("value-line-height"),
  },
  {
    property: "letter-spacing",
    inputElement: document.getElementById('input-letter-spacing'),
    textValue: document.getElementById("value-letter-spacing")
  },
  {
    property: "word-spacing",
    inputElement: document.getElementById('input-word-spacing'),
    textValue: document.getElementById("value-word-spacing")
  },
  {
    property: "paragraph-spacing",
    inputElement: document.getElementById('input-paragraph-spacing'),
    textValue: document.getElementById("value-paragraph-spacing")
  }
]

const buttons = {
  wcag: document.getElementById("wcag"),
  reset: document.getElementById("reset"),
  toggle: document.getElementById("toggle")
}

const messageElement = document.getElementById("message")

//
// Default state
//

let state = {
  "line-height": null,
  "letter-spacing": null,
  "word-spacing": null,
  "paragraph-spacing": null
}

let stylesEnabled = true

//
// Core
//

// On first load, set stylesEnabled from local storage
// Reflect saved user settings
chrome.storage.local.get(["stylesEnabled"]).then((result) => {
  if (result.stylesEnabled === false) {
    stylesEnabled = false
  }

  toggleControls(stylesEnabled)
});

// On first load, set state from local storage
// Reflect saved user settings
chrome.storage.local.get(["localState"]).then((result) => {
  if (Object.keys(result).length) state = result.localState

  checkStyles(state, stylesEnabled)
});

chrome.runtime.onMessage.addListener((message) => {
  if (message === "toggle") {
    handleToggle()
  }
});

// Add event listeners to inputs

config.map(({property, inputElement}) => {
  inputElement.addEventListener('change', () => {
    state[property] = `${inputElement.value}`
    handleStylesUpdate(state)
  })
})

buttons.wcag.addEventListener("click", () => {
  state["line-height"] = 1.5
  state["letter-spacing"] = 0.12
  state["word-spacing"] = 0.16
  state["paragraph-spacing"] = 2

  handleStylesUpdate(state)

  messageElement.textContent = "Text spacing properties were set to WCAG values."
})

buttons.reset.addEventListener("click", () => {
  state["line-height"] = null
  state["letter-spacing"] = null
  state["word-spacing"] = null
  state["paragraph-spacing"] = null

  handleStylesUpdate(state)

  messageElement.textContent = "Text spacing properties were reset."
})

buttons.toggle.addEventListener("click", handleToggle)

//
// Methods
//

// Handle toggle functionality
function handleToggle() {
  stylesEnabled = !stylesEnabled

  checkStyles(state, stylesEnabled)
  toggleControls(stylesEnabled)

  chrome.storage.local.set({ stylesEnabled });

  messageElement.textContent = `Text spacing properties were ${stylesEnabled ? 'enabled' : 'disabled'}.`
}

// Handle all style updates
function handleStylesUpdate(newState) {
  executeUpdatePageCss(newState)

  // Update input and text values
  config.map(({property, inputElement, textValue}) => {
    let text = newState[property]

    if (property !== "line-height" && text) {
      text += "em"
    }

    inputElement.value = newState[property]
    textValue.innerHTML = text || 'unset'
  })

  // Save state to local storage
  chrome.storage.local.set({ localState: newState });
}

// Enable or disable controls
function toggleControls(stylesEnabled) {
  buttons.wcag.disabled = !stylesEnabled
  buttons.reset.disabled = !stylesEnabled
  config.map(item => item.inputElement.disabled = !stylesEnabled)

  buttons.toggle.textContent = stylesEnabled ? "Disable styles" : "Enable styles"
}

// Add or remove custom styles
function checkStyles(state, stylesEnabled) {
  if (!stylesEnabled) {
    // Styles are disabled, remove custom styles
    executeUpdatePageCss({
      "line-height": null,
      "letter-spacing": null,
      "word-spacing": null,
      "paragraph-spacing": null
    })
  } else {
    // Styles are enabled, add custom styles
    handleStylesUpdate(state)
  }
}

// Forward updatePageCss with the updated state to the page
function executeUpdatePageCss(newState) {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.scripting.executeScript({target: {tabId: tabs[0].id}, func: updatePageCss, args: [newState]}, () => chrome.runtime.lastError)
  })
}

// Update CSS in the <style> tag
function updatePageCss(newState) {
  const appId = "text-spacing-editor"

  let styleEl = document.querySelector(`[data-extension-id='${appId}']`)

  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.dataset.extensionId = appId
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = `
    * {
      ${newState["line-height"] ? `line-height: ${newState["line-height"]} !important;` : ''}
      ${newState["letter-spacing"] ? `letter-spacing: ${newState["letter-spacing"]}em !important;` : ''}
      ${newState["word-spacing"] ? `word-spacing: ${newState["word-spacing"]}em !important;` : ''}
    }

    ${newState["paragraph-spacing"] ? `
      p {
        margin-bottom: ${newState["paragraph-spacing"]}em !important;
      }
    ` : ''}
  `

  updateIframeCss(document, styleEl.innerHTML)

  function updateIframeCss(doc, code) {
    let iframes = [...doc.querySelectorAll("iframe")]

    if (iframes.length) {
      iframes.map((iframe) => {
        if (iframe && iframe.contentDocument) {
          const nestedDoc = iframe.contentDocument;
          let iframeStyleEl = nestedDoc.querySelector(`[data-extension-id='${appId}']`)

          if (!iframeStyleEl) {
            iframeStyleEl = nestedDoc.createElement('style')
            iframeStyleEl.dataset.extensionId = appId
            nestedDoc.head.appendChild(iframeStyleEl);
          }

          iframeStyleEl.innerHTML = code

          updateIframeCss(nestedDoc, code)
        }
      })
    }

    return null
  }
}
