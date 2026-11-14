import { statusLabels, tnaSteps } from '../../data/tna.js'
import Stagger from '../ui/Stagger.jsx'
import StaggerItem from '../ui/StaggerItem.jsx'

const marker = {
  done: 'border-ok bg-ok text-white',
  now: 'border-accent bg-accent text-on-accent',
  pending: 'border-line',
}

export default function TnaChecklist() {
  return (
    <Stagger
      role="list"
      aria-label="Sample TNA dashboard"
      className="flex flex-col overflow-hidden rounded-[10px] border border-line bg-surface"
    >
      {tnaSteps.map((s) => (
        <StaggerItem
          key={s.n}
          role="listitem"
          className="grid grid-cols-[34px_1fr_auto] items-center gap-3 border-b border-line px-4 py-[13px] text-sm last:border-b-0"
        >
          <b className={`grid size-[26px] place-items-center rounded-full border font-mono text-xs font-medium ${marker[s.status]}`}>{s.n}</b>
          <span>{s.label}</span>
          <span className="font-mono text-xs font-medium text-muted">{statusLabels[s.status]}</span>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
