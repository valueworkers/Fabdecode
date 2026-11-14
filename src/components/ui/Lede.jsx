export default function Lede({ onBand = false, className = '', ...props }) {
  return <p className={`${onBand ? 'text-band-muted' : 'text-muted'} ${className}`} {...props} />
}
