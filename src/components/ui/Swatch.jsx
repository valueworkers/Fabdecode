const fabric = {
  backgroundColor: '#d9c9b0',
  backgroundImage:
    'repeating-linear-gradient(0deg,rgba(18,38,63,.55) 0 2px,transparent 2px 5px),repeating-linear-gradient(90deg,rgba(181,84,28,.7) 0 2px,transparent 2px 5px)',
}

export default function Swatch({ className = '', children }) {
  return (
    <div className={`rounded-md border border-line ${className}`} style={fabric} aria-hidden="true">
      {children}
    </div>
  )
}
