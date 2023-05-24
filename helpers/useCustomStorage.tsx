import { useEffect, useMemo, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { DEFAULT_VALUES, type TStyle } from "./constants"

export const useCustomStorage = () => {
  // Call Storage API and reset state values based on it.
  const [storageStyles, setStorageStyles] = useStorage<TStyle>("styles", (v) =>
    v === undefined || null ? DEFAULT_VALUES : v
  )
  const [storageEnabled, setStorageEnabled] = useStorage<boolean>(
    "enabled",
    (v) => (v === undefined || null ? true : v)
  )

  const [styles, setStyles] = useState<TStyle>(storageStyles)
  const [enabled, setEnabled] = useState<boolean>(storageEnabled)

  useEffect(() => {
    setEnabled(storageEnabled)
  }, [storageEnabled])

  useEffect(() => {
    setStyles(storageStyles)
  }, [storageStyles])

  return {
    styles,
    storageStyles,
    enabled,
    setStyles,
    setEnabled,
    setStorageStyles,
    setStorageEnabled
  }
}
