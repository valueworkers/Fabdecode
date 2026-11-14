import { useCallback, useEffect, useState } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme
  }, [theme])

  return useCallback(
    () =>
      setTheme((current) => {
        const dark = current ? current === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
        return dark ? 'light' : 'dark'
      }),
    [],
  )
}
