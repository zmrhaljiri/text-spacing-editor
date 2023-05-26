import { useEffect, useRef, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { buildCSSToInject } from "./buildCSSToInject"
import { DEFAULT_VALUES, type TStyle } from "./constants"
import { debounce } from "./debounce"

export const useCustomStorage = () => {
  // Call Storage API and reset state values based on it.
  const [storageStyles, setStorageStyles] = useStorage<TStyle>("styles", (v) =>
    v === undefined || null ? DEFAULT_VALUES : v
  )
  const [enabled, setEnabled] = useStorage<boolean>("enabled", (v) =>
    v === undefined || null ? true : v
  )

  const [styles, setStyles] = useState<TStyle>(storageStyles)

  // useEffect(() => {
  //   setEnabled(storageEnabled)
  // }, [storageEnabled])

  // useEffect(() => {
  //   setStyles(storageStyles)
  // }, [storageStyles])

  const payload = buildCSSToInject(storageStyles, 0)

  const timeoutRef = useRef(null)
  const insertedCSSRef = useRef(payload.css)
  const debouncedAPICall = useRef(
    debounce((newStyles) => {
      // Make API call here with the debounced value
      setStorageStyles(newStyles)
    }, 500)
  ).current

  const callStorageAPI = (newStyles) => {
    // Clear the previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a new timeout for the debounced API call
    timeoutRef.current = setTimeout(() => {
      debouncedAPICall(newStyles)
    }, 500)
  }

  return {
    styles,
    enabled,
    storageStyles,
    insertedCSSRef,
    setStyles,
    setEnabled,
    callStorageAPI
  }
}
