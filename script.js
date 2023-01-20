//
// Config
//

const config = [
  {
    property: "line-height",
    input: document.getElementById('input-line-height'),
    textValue: document.getElementById("value-line-height"),
  },
  {
    property: "letter-spacing",
    input: document.getElementById('input-letter-spacing'),
    textValue: document.getElementById("value-letter-spacing")
  },
  {
    property: "word-spacing",
    input: document.getElementById('input-word-spacing'),
    textValue: document.getElementById("value-word-spacing")
  },
  {
    property: "paragraph-spacing",
    input: document.getElementById('input-paragraph-spacing'),
    textValue: document.getElementById("value-paragraph-spacing")
  }]

let state = {
  "line-height": null,
  "letter-spacing": null,
  "word-spacing": null,
  "paragraph-spacing": null
}

//
// Core
//

// On first load, set state from local storage
chrome.storage.local.get(["localState"]).then((result) => {
  if (Object.keys(result).length) state = result.localState

  saveValues(state)
});

// Add event listeners to inputs

config.map(({property, input}) => {
  input.addEventListener('change', () => {
    state[property] = `${input.value}`
    saveValues(state)
  })
})

// Add event listener to buttons

document.getElementById("wcag").addEventListener("click", () => {
  state["line-height"] = 1.5
  state["letter-spacing"] = 0.12
  state["word-spacing"] = 0.16
  state["paragraph-spacing"] = 2

  saveValues(state)
})

document.getElementById("reset").addEventListener("click", () => {
  state["line-height"] = null
  state["letter-spacing"] = null
  state["word-spacing"] = null
  state["paragraph-spacing"] = null

  saveValues(state)
})

//
// Methods
//

function saveValues(state) {
  // Run applyStyles(state)
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.scripting.executeScript({target: {tabId: tabs[0].id}, func: applyStyles, args: [state]})
  })

  // Update input and text values
  config.map(({property, input, textValue}) => {
    input.value = state[property]
    textValue.innerHTML = state[property] || 'unset'
  })

  // Save state to local storage
  chrome.storage.local.set({ localState: state });
}

// Update CSS in the <style> tag
function applyStyles(state) {
  const appId = "text-spacing-editor"

  let styleEl = document.querySelector(`[data-extension-id='${appId}']`)

  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.dataset.extensionId = appId
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = `
    * {
      ${state["line-height"] ? `line-height: ${state["line-height"]} !important;` : ''}
      ${state["letter-spacing"] ? `letter-spacing: ${state["letter-spacing"]}em !important;` : ''}
      ${state["word-spacing"] ? `word-spacing: ${state["word-spacing"]}em !important;` : ''}
    }

    ${state["paragraph-spacing"] ? `
      p {
        margin-bottom: ${state["paragraph-spacing"]}em !important;
      }
    ` : ''}
  `

  processIframes(document, styleEl.innerHTML)

  function processIframes(doc, code) {
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

          processIframes(nestedDoc, code)
        }
      })
    }

    return null
  }
}
