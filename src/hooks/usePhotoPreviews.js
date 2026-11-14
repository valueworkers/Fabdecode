import { useCallback, useEffect, useState } from 'react'

export default function usePhotoPreviews() {
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])

  useEffect(() => {
    const next = files.map((f) => ({
      id: `${f.name}-${f.size}-${f.lastModified}`,
      name: f.name,
      url: URL.createObjectURL(f),
    }))
    setPreviews(next)
    return () => next.forEach((p) => URL.revokeObjectURL(p.url))
  }, [files])

  const onChange = useCallback((e) => setFiles(Array.from(e.target.files ?? [])), [])
  const clear = useCallback(() => setFiles([]), [])

  return { previews, onChange, clear }
}
