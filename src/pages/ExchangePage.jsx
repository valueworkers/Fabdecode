import { useDeferredValue, useMemo, useState } from 'react'
import { pageTitles } from '../data/site.js'
import { emptyFilters, exchangeHead, lots } from '../data/lots.js'
import filterLots from '../lib/filterLots.js'
import Band from '../components/layout/Band.jsx'
import Section from '../components/layout/Section.jsx'
import SectionHead from '../components/layout/SectionHead.jsx'
import Filters from '../components/exchange/Filters.jsx'
import LotsTable from '../components/exchange/LotsTable.jsx'

export default function ExchangePage() {
  const [filters, setFilters] = useState(emptyFilters)
  const deferredFilters = useDeferredValue(filters)
  const rows = useMemo(() => filterLots(lots, deferredFilters), [deferredFilters])

  return (
    <Band>
      <title>{pageTitles.exchange}</title>
      <Section>
        <SectionHead head={exchangeHead} onBand />
        <Filters filters={filters} onChange={setFilters} />
        <LotsTable rows={rows} />
      </Section>
    </Band>
  )
}
