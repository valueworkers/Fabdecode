import { formatRupees } from '../../lib/format.js'
import Flag from '../ui/Flag.jsx'
import Lede from '../ui/Lede.jsx'

export default function PlanCard({ plan }) {
  return (
    <div
      className={`flex h-full min-w-0 flex-col gap-3.5 rounded-[10px] bg-surface p-[26px] ${
        plan.featured ? 'border-2 border-accent-ink' : 'border border-line'
      }`}
    >
      <Flag>{plan.tier}</Flag>
      <div className="font-display text-[40px] font-bold">
        {formatRupees(plan.price)} <small className="font-body text-[15px] font-normal text-muted">/ month</small>
      </div>
      <Lede className="max-w-[60ch] text-sm">{plan.blurb}</Lede>
      <ul className="flex flex-col">
        {plan.features.map((f) => (
          <li key={f.k} className="flex flex-col gap-0.5 border-t border-line py-2.5 text-sm">
            <span className="font-mono text-[11px] font-medium tracking-[.08em] text-muted uppercase">{f.k}</span>
            {f.v}
          </li>
        ))}
      </ul>
    </div>
  )
}
