import Heading from '../ui/Heading.jsx'

export default function EngineCard({ engine }) {
  return (
    <div className="flex h-full min-w-0 flex-col gap-4 rounded-[10px] border border-line bg-surface p-7">
      <span className="font-mono text-xs font-medium tracking-[.1em] text-accent-ink uppercase">{engine.rev}</span>
      <Heading as="h3" className="text-2xl">
        {engine.title}
      </Heading>
      <ul className="flex flex-col gap-3">
        {engine.items.map((i) => (
          <li key={i.lead} className="border-t border-line pt-3 text-[15px] text-muted">
            <b className="text-ink">{i.lead}</b> {i.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
