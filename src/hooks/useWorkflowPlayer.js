import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotionValue } from 'framer-motion'

const STEP_MS = 4600

export default function useWorkflowPlayer(workflows) {
  const [trackId, setTrackId] = useState(workflows[0].id)
  const [index, setIndex] = useState(0)
  const [epoch, setEpoch] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const progress = useMotionValue(0)
  const total = useMotionValue(0)
  const elapsed = useRef(0)

  const track = workflows.find((w) => w.id === trackId)
  const count = track.scenes.length

  const goTo = useCallback(
    (i) => {
      elapsed.current = 0
      setIndex(((i % count) + count) % count)
      setEpoch((e) => e + 1)
    },
    [count],
  )

  const selectTrack = useCallback((id) => {
    elapsed.current = 0
    setTrackId(id)
    setIndex(0)
    setEpoch((e) => e + 1)
  }, [])

  useEffect(() => {
    progress.set(0)
    total.set(index / count)
  }, [epoch, index, count, progress, total])

  useEffect(() => {
    if (!playing) return undefined
    const t0 = performance.now() - elapsed.current
    let raf
    const tick = (now) => {
      const acc = Math.max(0, now - t0)
      elapsed.current = acc
      const p = Math.min(acc / STEP_MS, 1)
      progress.set(p)
      total.set((index + p) / count)
      if (acc >= STEP_MS) {
        goTo(index + 1)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, index, count, epoch, goTo, progress, total])

  return {
    track,
    index,
    count,
    playing,
    progress,
    total,
    sceneKey: `${trackId}:${index}:${epoch}`,
    selectTrack,
    goTo,
    next: () => goTo(index + 1),
    prev: () => goTo(index - 1),
    toggle: () => setPlaying((p) => !p),
  }
}
