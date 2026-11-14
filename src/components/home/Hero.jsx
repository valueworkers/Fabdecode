import { hero } from '../../data/site.js'
import Button from '../ui/Button.jsx'
import Flag from '../ui/Flag.jsx'
import Heading from '../ui/Heading.jsx'
import Lede from '../ui/Lede.jsx'
import WorkflowPlayer from './WorkflowPlayer.jsx'

export default function Hero() {
  return (
    <header
      id="top"
      className="mx-auto grid max-w-[1180px] grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-start gap-10 pt-12 pb-10 max-[1000px]:grid-cols-[minmax(0,1fr)]"
    >
      <div className="flex max-w-[880px] flex-col gap-5">
        <Flag>{hero.flag}</Flag>
        <Heading as="h1" className="text-[clamp(34px,4.6vw,60px)] leading-[1.04] font-bold">
          {hero.headline} <em className="text-accent-ink not-italic">{hero.accent}</em>
        </Heading>
        <Lede className="max-w-[720px] text-[clamp(17px,2vw,21px)]">{hero.sub}</Lede>
        <div className="mt-1 flex flex-wrap gap-3">
          <Button variant="primary" href={hero.primary.href}>
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href}>{hero.secondary.label}</Button>
        </div>
      </div>
      <WorkflowPlayer />
    </header>
  )
}
