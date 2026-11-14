import useTheme from '../../hooks/useTheme.js'

export default function ThemeToggle() {
  const toggle = useTheme()
  return (
    <button
      type="button"
      aria-label="Toggle light and dark theme"
      onClick={toggle}
      className="min-h-11 min-w-11 cursor-pointer rounded-md border border-line bg-surface font-body text-[13px] font-medium text-ink"
    >
      Light / dark
    </button>
  )
}
