const btn =
  'grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-md border border-line bg-surface text-ink'

const icons = {
  prev: 'M13 4v12L6 10zM4 4h2v12H4z',
  next: 'M7 4v12l7-6zM14 4h2v12h-2z',
  pause: 'M5 4h4v12H5zM11 4h4v12h-4z',
  play: 'M6 4l10 6-10 6z',
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-[18px]">
      <path d={icons[name]} />
    </svg>
  )
}

export default function PlayerControls({ index, count, playing, onPrev, onToggle, onNext }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs font-medium text-muted">
      <span aria-live="off">
        {index + 1} / {count}
      </span>
      <button type="button" className={btn} aria-label="Previous step" onClick={onPrev}>
        <Icon name="prev" />
      </button>
      <button type="button" className={btn} aria-label={playing ? 'Pause workflow' : 'Play workflow'} onClick={onToggle}>
        <Icon name={playing ? 'pause' : 'play'} />
      </button>
      <button type="button" className={btn} aria-label="Next step" onClick={onNext}>
        <Icon name="next" />
      </button>
    </div>
  )
}
