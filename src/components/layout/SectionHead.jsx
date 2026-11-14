import Flag from '../ui/Flag.jsx'
import Heading from '../ui/Heading.jsx'
import Lede from '../ui/Lede.jsx'

export default function SectionHead({ head, onBand = false }) {
  return (
    <div className="mb-[34px] flex max-w-[760px] flex-col gap-3">
      <Flag onBand={onBand}>{head.flag}</Flag>
      <Heading className="text-[clamp(28px,4vw,44px)] leading-[1.1]">{head.title}</Heading>
      <Lede onBand={onBand} className="text-lg">
        {head.lede}
      </Lede>
    </div>
  )
}
