import { pageTitles } from '../data/site.js'
import { millCards, millCta, millsHead } from '../data/mills.js'
import Band from '../components/layout/Band.jsx'
import Section from '../components/layout/Section.jsx'
import SectionHead from '../components/layout/SectionHead.jsx'
import MillCard from '../components/mills/MillCard.jsx'
import Button from '../components/ui/Button.jsx'
import Stagger from '../components/ui/Stagger.jsx'
import StaggerItem from '../components/ui/StaggerItem.jsx'

export default function MillsPage() {
  return (
    <Band>
      <title>{pageTitles.mills}</title>
      <Section>
        <SectionHead head={millsHead} onBand />
        <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
          {millCards.map((c) => (
            <StaggerItem key={c.id} className="min-w-0">
              <MillCard card={c} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="primary" href={millCta.href}>
            {millCta.label}
          </Button>
        </div>
      </Section>
    </Band>
  )
}
