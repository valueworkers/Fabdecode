import { pageTitles } from '../data/site.js'
import { requestHead } from '../data/request.js'
import Section from '../components/layout/Section.jsx'
import SectionHead from '../components/layout/SectionHead.jsx'
import RequestForm from '../components/request/RequestForm.jsx'

export default function RequestPage() {
  return (
    <Section>
      <title>{pageTitles.request}</title>
      <SectionHead head={requestHead} />
      <RequestForm />
    </Section>
  )
}
