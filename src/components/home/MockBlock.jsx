import { motion } from 'framer-motion'
import Pill from '../ui/Pill.jsx'
import Tag from '../ui/Tag.jsx'
import Note from '../ui/Note.jsx'
import Swatch from '../ui/Swatch.jsx'
import Rise from '../ui/Rise.jsx'

const lotBase =
  'grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border bg-surface p-2.5 max-[820px]:grid-cols-[44px_minmax(0,1fr)]'

export default function MockBlock({ block }) {
  switch (block.type) {
    case 'pills':
      return (
        <div className="flex flex-wrap gap-2.5">
          {block.items.map((p) => (
            <Rise key={p.label} d={p.d}>
              <Pill highlight={block.hl}>{p.label}</Pill>
            </Rise>
          ))}
        </div>
      )
    case 'count':
      return (
        <Rise d={block.d}>
          <span className="font-display text-[30px] font-bold text-accent-ink">{block.label}</span> <Note>{block.note}</Note>
        </Rise>
      )
    case 'lot':
      return (
        <Rise
          d={block.d}
          className={`${lotBase} ${block.selected ? 'border-accent-ink shadow-[0_0_0_1px_var(--accent-text)]' : 'border-line'}`}
        >
          <Swatch className={`size-[54px] max-[820px]:size-11 ${block.tint ?? ''}`} />
          <div>
            <strong className="text-sm">{block.title}</strong>
            <small className="block font-mono text-xs text-muted">{block.sub}</small>
          </div>
          {block.action ? (
            <motion.span
              className="rounded-md border border-line px-3 py-2 text-[13px] font-semibold max-[820px]:col-span-full"
              initial={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
              animate={{ backgroundColor: 'var(--ok)', color: '#ffffff', borderColor: 'var(--ok)' }}
              transition={{ delay: 1.9, duration: 0.01 }}
            >
              {block.action}
            </motion.span>
          ) : (
            <Tag>{block.tag}</Tag>
          )}
        </Rise>
      )
    case 'kv':
      return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
          {block.items.map((i) => (
            <Rise key={i.k} d={i.d} className="rounded-md border border-line bg-surface p-2.5">
              <small className="block font-mono text-xs text-muted">{i.k}</small>
              <strong className="font-mono text-sm font-medium">{i.v}</strong>
            </Rise>
          ))}
        </div>
      )
    case 'stamp':
      return (
        <Rise
          d={block.d}
          className="self-start rounded-md border-2 border-ok px-3.5 py-1.5 font-display text-sm font-bold tracking-[.06em] text-ok uppercase"
        >
          {block.label}
        </Rise>
      )
    case 'steps':
      return (
        <div className="flex flex-wrap gap-2">
          {block.items.map((s) => (
            <motion.div
              key={s.n}
              className="relative flex-[1_1_130px] rounded-md border border-line bg-surface p-2.5 text-[13px]"
              initial={{ opacity: 0.55, borderColor: 'var(--line)', boxShadow: 'inset 0 3px 0 0 transparent' }}
              animate={{ opacity: 1, borderColor: 'var(--ok)', boxShadow: 'inset 0 3px 0 0 var(--ok)' }}
              transition={{ duration: 0.4, delay: s.d, ease: 'easeOut' }}
            >
              <i className="block font-mono text-[11px] text-muted not-italic">{s.n}</i>
              {s.label}
            </motion.div>
          ))}
        </div>
      )
    case 'drop':
      return (
        <Rise d={block.d} className="flex items-center gap-3.5 rounded-lg border-2 border-dashed border-line bg-surface p-3.5">
          <Swatch className="relative size-23 flex-none overflow-hidden">
            <motion.span
              className="absolute inset-x-0 top-0 h-[3px] bg-accent-ink"
              animate={{ y: [0, 89] }}
              transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            />
          </Swatch>
          <div>
            <strong>{block.file}</strong>
            <small className="block font-mono text-xs text-muted">{block.note}</small>
          </div>
        </Rise>
      )
    case 'parcel':
      return (
        <Rise d={block.d} className="flex flex-wrap items-center gap-2.5">
          <Pill>{block.from}</Pill>
          <span className="h-0.5 min-w-20 flex-[1_1_140px] bg-line" />
          <motion.span
            className="size-3.5 rounded-full bg-accent-ink"
            animate={{ x: Math.min(180, window.innerWidth * 0.3) }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          />
          <span className="h-0.5 min-w-20 flex-[1_1_140px] bg-line" />
          <Pill highlight>{block.to}</Pill>
        </Rise>
      )
    default:
      return null
  }
}
