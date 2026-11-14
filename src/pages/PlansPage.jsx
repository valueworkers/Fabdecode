import { pageTitles } from '../data/site.js'
import { plans, plansHead } from '../data/plans.js'
import Band from '../components/layout/Band.jsx'
import Section from '../components/layout/Section.jsx'
import SectionHead from '../components/layout/SectionHead.jsx'
import PlanCard from '../components/plans/PlanCard.jsx'
import Stagger from '../components/ui/Stagger.jsx'
import StaggerItem from '../components/ui/StaggerItem.jsx'

export default function PlansPage() {
  return (
    <Band>
      <title>{pageTitles.plans}</title>
      <Section>
        <SectionHead head={plansHead} onBand />
        <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px] text-ink">
          {plans.map((p) => (
            <StaggerItem key={p.id} className="min-w-0">
              <PlanCard plan={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </Band>
  )
}
