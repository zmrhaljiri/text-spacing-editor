import { useEffect, useState } from "react"

import type { Storage } from "@plasmohq/storage"

import type { TStyle } from "~helpers/constants"

export const useStorage = (storage: Storage) => {
  const [styles, setStyles] = useState<TStyle>()
  const [enabled, setEnabled] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const { styles } = await storage.get<{ styles: TStyle }>("styles")

      if (styles) {
        setStyles(styles)
        setEnabled(true)
      }
    })()
  }, [])

  return { styles, enabled, setStyles, setEnabled }
}
