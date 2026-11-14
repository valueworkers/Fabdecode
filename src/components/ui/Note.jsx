export default function Note({ className = '', ...props }) {
  return <span className={`font-mono text-xs text-muted ${className}`} {...props} />
}
