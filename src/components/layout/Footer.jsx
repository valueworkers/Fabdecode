import { footer } from '../../data/site.js'

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-4 border-t border-line py-9 text-[13px] text-muted">
      <span>
        <b>{footer.name}</b>
        {footer.tagline}
      </span>
      <span>{footer.blurb}</span>
    </footer>
  )
}
