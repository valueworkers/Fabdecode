import Logo from './Logo.jsx'
import PaletteSwitcher from './PaletteSwitcher.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { navLinks } from '../../data/site.js'

export default function Nav({ route }) {
  return (
    <nav className="sticky top-[env(safe-area-inset-top,0px)] z-20 -mx-(--gutter-l) border-b border-line bg-paper px-(--gutter-l)">
      <div className="mx-auto flex min-h-[60px] max-w-[1180px] flex-wrap items-center gap-5 py-1.5">
        <Logo />
        <div className="ml-auto flex flex-wrap gap-x-[18px] gap-y-1 text-sm font-medium max-[820px]:ml-0 max-[820px]:w-full">
          {navLinks.map((l) => (
            <a
              key={l.route}
              href={l.href}
              aria-current={route === l.route ? 'page' : undefined}
              className="px-0.5 py-2.5 text-muted no-underline hover:text-ink aria-[current=page]:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
        <PaletteSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  )
}
