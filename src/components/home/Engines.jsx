import { engines, enginesHead } from '../../data/engines.js'
import Section from '../layout/Section.jsx'
import SectionHead from '../layout/SectionHead.jsx'
import Stagger from '../ui/Stagger.jsx'
import StaggerItem from '../ui/StaggerItem.jsx'
import EngineCard from './EngineCard.jsx'

export default function Engines() {
  return (
    <Section>
      <SectionHead head={enginesHead} />
      <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
        {engines.map((e) => (
          <StaggerItem key={e.id} className="min-w-0">
            <EngineCard engine={e} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
