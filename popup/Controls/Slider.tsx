import { useCallback, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { DEFAULT_VALUES, type TStyle } from "~helpers/constants"
import { updatePageCss } from "~helpers/updatePageCSS"

export const Slider = ({ styles, enabled, setStyles, setStorageStyles }) => {
  const handleCSSChange = async (key, value) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      await updatePageCss(
        styles,
        {
          ...styles,
          [key]: value
        },
        tabs[0].id,
        enabled
      )
    })
    setStyles({
      ...styles,
      [key]: value
    })
  }

  const changeHandler = (event) => {
    const key = (event.target as HTMLInputElement).id.split("input-")[1]
    const value = (event.target as HTMLInputElement).value
    setStorageStyles({
      ...styles,
      [key]: value
    })
  }

  // MAX_WRITE_OPERATIONS_PER_MINUTE quota is 2 calls per second
  const debounce = (callback, wait = 500) => {
    let timeoutId = null
    return (...args) => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args)
      }, wait)
    }
  }

  const debouncedChangeHandler = useCallback(debounce(changeHandler), [])

  return (
    <div className="controls-group">
      <div className="controls">
        <label htmlFor="input-line-height">Line height</label>
        <input
          type="range"
          min="0"
          max="4"
          step="0.1"
          className="slider"
          id="input-line-height"
          disabled={!enabled}
          value={styles["line-height"]}
          onChange={async (e) => {
            handleCSSChange("line-height", (e.target as HTMLInputElement).value)
          }}
          onChangeCapture={debouncedChangeHandler}
        />
        <span id="value-line-height">{styles["line-height"]}</span>
      </div>
      <div className="controls">
        <label htmlFor="input-letter-spacing">Letter spacing</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          className="slider"
          id="input-letter-spacing"
          disabled={!enabled}
          value={styles["letter-spacing"]}
          onChange={(e) => {
            handleCSSChange(
              "letter-spacing",
              (e.target as HTMLInputElement).value
            )
          }}
          onChangeCapture={debouncedChangeHandler}
        />
        <span id="value-letter-spacing">
          {styles["letter-spacing"]}
          {styles["letter-spacing"] !== "unset" && "em"}
        </span>
      </div>
      <div className="controls">
        <label htmlFor="input-word-spacing">Word spacing</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          className="slider"
          id="input-word-spacing"
          disabled={!enabled}
          value={styles["word-spacing"]}
          onChange={(e) => {
            handleCSSChange(
              "word-spacing",
              (e.target as HTMLInputElement).value
            )
          }}
          onChangeCapture={debouncedChangeHandler}
        />
        <span id="value-word-spacing">
          {styles["word-spacing"]}
          {styles["word-spacing"] !== "unset" && "em"}
        </span>
      </div>
      <div className="controls">
        <label htmlFor="input-paragraph-spacing">Paragraph spacing</label>
        <input
          type="range"
          min="0"
          max="4"
          step="0.1"
          className="slider"
          id="input-paragraph-spacing"
          disabled={!enabled}
          value={styles["paragraph-spacing"]}
          onChange={(e) => {
            handleCSSChange(
              "paragraph-spacing",
              (e.target as HTMLInputElement).value
            )
          }}
          onChangeCapture={debouncedChangeHandler}
        />
        <span id="value-paragraph-spacing">
          {styles["paragraph-spacing"]}
          {styles["paragraph-spacing"] !== "unset" && "em"}
        </span>
      </div>
    </div>
  )
}
