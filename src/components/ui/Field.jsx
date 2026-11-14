import { useId } from 'react'

const control =
  'min-h-11 min-w-0 rounded-md border border-line bg-surface px-3 font-body text-[15px] font-normal text-ink'

export default function Field({
  label,
  as: Control = 'input',
  error,
  hint,
  full = false,
  labelClassName = 'text-[13px] font-medium',
  className = '',
  children,
  ref,
  ...props
}) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
  const sizing = Control === 'textarea' ? 'min-h-[90px] py-2.5' : ''

  return (
    <div className={`flex flex-col gap-1.5 ${full ? 'col-span-full' : ''}`}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <Control
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${control} ${sizing} ${error ? 'border-err' : ''} ${className}`}
        {...props}
      >
        {children}
      </Control>
      {hint && (
        <p id={hintId} className="font-mono text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-[13px] font-medium text-err">
          {error}
        </p>
      )}
    </div>
  )
}
