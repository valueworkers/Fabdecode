import usePalette from '../../hooks/usePalette.js'
import { palettes } from '../../data/site.js'

export default function PaletteSwitcher() {
  const [current, choose] = usePalette()

  return (
    <div role="group" aria-label="Colour palette" className="flex items-center gap-1">
      {palettes.map((p) => (
        <button
          key={p.id}
          type="button"
          aria-pressed={current === p.id}
          aria-label={p.label}
          title={p.title}
          onClick={() => choose(p.id)}
          className="grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-md border border-line bg-surface p-0 aria-pressed:border-ink aria-pressed:shadow-[0_0_0_2px_var(--text)]"
        >
          <i className="flex h-4 w-[26px] overflow-hidden rounded-[3px] border border-black/20">
            {p.swatches.map((c) => (
              <span key={c} className="flex-1" style={{ background: c }} />
            ))}
          </i>
        </button>
      ))}
    </div>
  )
}
