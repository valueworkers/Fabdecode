const base =
  'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border-[1.5px] px-5 font-body text-[15px] font-semibold no-underline hover:brightness-[1.06]'

const looks = {
  primary: 'border-accent bg-accent text-on-accent',
  secondary: 'border-btn-line bg-transparent text-ink',
}

export default function Button({ href, variant = 'secondary', className = '', type = 'button', ref, ...props }) {
  const classes = `${base} ${looks[variant]} ${className}`
  return href ? (
    <a ref={ref} href={href} className={classes} {...props} />
  ) : (
    <button ref={ref} type={type} className={classes} {...props} />
  )
}
