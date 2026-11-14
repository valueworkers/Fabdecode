export default function Pill({ highlight = false, children }) {
  const look = highlight ? 'border-accent-ink bg-accent-soft text-ink' : 'border-line bg-surface'
  return (
    <span className={`inline-flex min-h-[30px] items-center rounded-full border px-3 text-[13px] font-medium ${look}`}>
      {children}
    </span>
  )
}
