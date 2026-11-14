import { motion, useTransform } from 'framer-motion'

export default function StepRail({ label, scenes, index, progress, onSelect }) {
  const barWidth = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div role="group" aria-label={label} className="flex flex-row gap-1 overflow-x-auto border-b border-line bg-surface-2 p-2">
      {scenes.map((s, i) => {
        const active = i === index
        return (
          <button
            key={s.rail}
            type="button"
            aria-current={active}
            onClick={() => onSelect(i)}
            className={`relative grid min-h-11 min-w-[150px] flex-none cursor-pointer grid-cols-[26px_1fr] items-start gap-2 overflow-hidden rounded-md p-2.5 text-left text-[13px]/[1.3] font-medium ${
              active ? 'bg-surface text-ink shadow-[0_0_0_1px_var(--line)]' : 'bg-transparent text-muted'
            }`}
          >
            <b
              className={`grid size-6 place-items-center rounded-full border font-mono text-xs font-medium ${
                active ? 'border-accent bg-accent text-on-accent' : 'border-line text-muted'
              }`}
            >
              {i + 1}
            </b>
            {s.rail}
            <motion.span className="absolute bottom-0 left-0 h-[3px] bg-accent-ink" style={{ width: active ? barWidth : '0%' }} />
          </button>
        )
      })}
    </div>
  )
}
