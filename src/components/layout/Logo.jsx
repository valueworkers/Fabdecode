export default function Logo() {
  return (
    <a href="#/" aria-label="fabDecode home" className="flex items-center gap-[9px] font-display text-[21px] font-bold no-underline">
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-[26px]">
        <rect x="2" y="2" width="28" height="28" rx="6" fill="var(--navy)" />
        <path d="M8 11h16M8 16h16M8 21h16M11 8v16M16 8v16M21 8v16" stroke="var(--accent)" strokeWidth="1.8" fill="none" />
      </svg>
      FabDecode
    </a>
  )
}
