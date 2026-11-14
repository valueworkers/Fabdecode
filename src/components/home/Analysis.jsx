import { analysisBlocks, analysisCta, analysisHead } from '../../data/spec.js'
import Section from '../layout/Section.jsx'
import SectionHead from '../layout/SectionHead.jsx'
import Split from '../layout/Split.jsx'
import Button from '../ui/Button.jsx'
import InfoColumn from './InfoColumn.jsx'
import SpecSheet from './SpecSheet.jsx'

export default function Analysis() {
  return (
    <Section>
      <SectionHead head={analysisHead} />
      <Split>
        <SpecSheet />
        <InfoColumn blocks={analysisBlocks} gap="gap-[18px]">
          <Button variant="primary" href={analysisCta.href} className="self-start">
            {analysisCta.label}
          </Button>
        </InfoColumn>
      </Split>
    </Section>
  )
}
