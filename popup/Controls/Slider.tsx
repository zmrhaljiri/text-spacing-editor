export const Slider = () => {
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
        />
        <span id="value-line-height"></span>
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
        />
        <span id="value-letter-spacing"></span>
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
        />
        <span id="value-word-spacing"></span>
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
        />
        <span id="value-paragraph-spacing"></span>
      </div>
    </div>
  )
}
