import { tnaBlocks, tnaHead } from '../../data/tna.js'
import Section from '../layout/Section.jsx'
import SectionHead from '../layout/SectionHead.jsx'
import Split from '../layout/Split.jsx'
import InfoColumn from './InfoColumn.jsx'
import TnaChecklist from './TnaChecklist.jsx'

export default function Tna() {
  return (
    <Section>
      <SectionHead head={tnaHead} />
      <Split>
        <TnaChecklist />
        <InfoColumn blocks={tnaBlocks} />
      </Split>
    </Section>
  )
}
