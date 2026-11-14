import { Fragment } from 'react'
import { specSheet } from '../../data/spec.js'

const cell = 'border-b border-line px-[18px] py-[11px]'

export default function SpecSheet() {
  return (
    <div role="group" aria-label={specSheet.label} className="overflow-hidden rounded-[10px] border border-line bg-surface">
      <header className="flex flex-wrap justify-between gap-2.5 bg-band px-[18px] py-3.5 font-mono text-[13px] font-medium text-on-band">
        <span>{specSheet.title}</span>
        <span>{specSheet.badge}</span>
      </header>
      <dl className="m-0 grid grid-cols-[minmax(120px,.8fr)_1.2fr]">
        {specSheet.rows.map((r) => (
          <Fragment key={r.term}>
            <dt className={`${cell} text-sm text-muted`}>{r.term}</dt>
            <dd className={`${cell} m-0 font-mono text-sm font-medium`}>{r.detail}</dd>
          </Fragment>
        ))}
      </dl>
      <div className="px-[18px] py-3 font-mono text-xs text-muted">{specSheet.foot}</div>
    </div>
  )
}
