export default function Heading({ as: Tag = 'h2', className = '', ...props }) {
  return <Tag className={`font-display tracking-[-.01em] text-balance ${className}`} {...props} />
}
