import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import type { TStyle } from "~helpers/constants"

export const Slider = () => {
  const [styles, setStyles, { setRenderValue }] = useStorage<TStyle>("styles")

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
          value={styles ? styles["line-height"] : ""}
          onChange={(e) =>
            setRenderValue({ ...styles, "line-height": e.target.value })
          }
        />
        <span id="value-line-height">
          {styles ? styles["line-height"] : ""}
        </span>
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
          value={styles ? styles["letter-spacing"] : ""}
          onChange={(e) =>
            setRenderValue({ ...styles, "letter-spacing": e.target.value })
          }
        />
        <span id="value-letter-spacing">
          {" "}
          {styles ? styles["letter-spacing"] : ""}
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
          value={styles ? styles["word-spacing"] : ""}
          onChange={(e) =>
            setRenderValue({ ...styles, "word-spacing": e.target.value })
          }
        />
        <span id="value-word-spacing">
          {" "}
          {styles ? styles["word-spacing"] : ""}
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
          value={styles ? styles["paragraph-spacing"] : ""}
          onChange={(e) =>
            setRenderValue({ ...styles, "paragraph-spacing": e.target.value })
          }
        />
        <span id="value-paragraph-spacing">
          {" "}
          {styles ? styles["paragraph-spacing"] : ""}
        </span>
      </div>
    </div>
  )
}
