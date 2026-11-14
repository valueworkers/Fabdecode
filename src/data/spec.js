export const analysisHead = {
  flag: 'Swatch analysis',
  title: 'What a dossier looks like.',
  lede: 'Every analysed swatch returns the same standard sheet, so teams can compare fabrics and mills on equal terms.',
}

export const specSheet = {
  label: 'Sample technical spec sheet',
  title: 'TECHNICAL SPEC SHEET',
  badge: 'SAMPLE LAYOUT',
  rows: [
    { term: 'Yarn count', detail: 'Warp / weft counts' },
    { term: 'Construction', detail: 'Weave or knit, ends and picks' },
    { term: 'GSM', detail: 'Cutter measured' },
    { term: 'Fibre content', detail: 'Approximate, burn and solubility' },
    { term: 'Verified mills', detail: 'Shortlist with sources' },
    { term: 'MOQ', detail: 'Per mill' },
    { term: 'Sampling price', detail: 'Per metre' },
    { term: 'Bulk price', detail: 'Per metre' },
    { term: 'Lead time', detail: 'Sample and bulk' },
  ],
  foot: 'Values are filled per swatch. Third-party tests (SGS, Intertek: colourfastness, shrinkage, pilling, tensile strength) are billed at actual lab cost.',
}

export const analysisBlocks = [
  { id: 'inhouse', title: 'Standard in-house analysis', text: 'Included in every plan: pick-glass ends and picks, yarn count estimation, GSM cutter measurement, and burn and solubility fibre identification.' },
  { id: 'specialised', title: 'Specialised testing on request', text: 'Certified third-party lab tests are available as a separate add-on, charged at actual lab cost.' },
]

export const analysisCta = { href: '#/request', label: 'Start with a swatch' }
