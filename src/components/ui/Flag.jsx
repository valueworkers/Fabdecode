export default function Flag({ onBand = false, className = '', ...props }) {
  const color = onBand ? 'text-band-accent' : 'text-accent-ink'
  return <span className={`font-mono text-xs font-medium tracking-[.12em] uppercase ${color} ${className}`} {...props} />
}
