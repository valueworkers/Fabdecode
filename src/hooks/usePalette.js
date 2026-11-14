import { useCallback, useEffect, useState } from 'react'
import { palettes } from '../data/site.js'

const KEY = 'fabDecode-palette'
const DEFAULT = palettes[0].id

function readSaved() {
  try {
    const saved = localStorage.getItem(KEY)
    return palettes.some((p) => p.id === saved) ? saved : DEFAULT
  } catch {
    return DEFAULT
  }
}

export default function usePalette() {
  const [palette, setPalette] = useState(readSaved)

  useEffect(() => {
    const root = document.documentElement
    if (palette === DEFAULT) root.removeAttribute('data-palette')
    else root.dataset.palette = palette
  }, [palette])

  const choose = useCallback((id) => {
    setPalette(id)
    try {
      localStorage.setItem(KEY, id)
    } catch {
      // Storage can be unavailable (private mode); the palette still applies for this visit.
    }
  }, [])

  return [palette, choose]
}
