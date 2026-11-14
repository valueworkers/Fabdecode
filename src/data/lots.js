const plain = (values) => values.map((v) => ({ value: v, label: v }))

export const exchangeHead = {
  flag: 'Ready-Stock Mill Exchange',
  title: 'A searchable catalogue sorted the way buyers specify fabric.',
  lede: 'Filter by structure, fibre, GSM range, finish and ready quantity. The rows below are sample lots that show the layout.',
}

export const filterFields = [
  { name: 'structure', label: 'Structure', options: plain(['Woven', 'Knit']) },
  { name: 'fibre', label: 'Fibre', options: plain(['Cotton', 'Polyester', 'Viscose', 'Blend']) },
  {
    name: 'gsm',
    label: 'GSM range',
    options: [
      { value: '0-120', label: 'Up to 120' },
      { value: '121-200', label: '121 to 200' },
      { value: '201-999', label: 'Above 200' },
    ],
  },
  { name: 'finish', label: 'Finish', options: plain(['Greige', 'Finished', 'Deadstock']) },
]

export const emptyFilters = { structure: '', fibre: '', gsm: '', finish: '' }

export const lotColumns = ['Sample lot', 'Structure', 'Fibre', 'GSM', 'Finish', 'Ready qty (m)', 'Mill region']

export const lotsEmpty = 'No sample lots match these filters.'

export const lots = [
  { id: 'S-01', structure: 'Woven', fibre: 'Cotton', gsm: 115, finish: 'Finished', qty: 3200, region: 'Gujarat' },
  { id: 'S-02', structure: 'Woven', fibre: 'Cotton', gsm: 140, finish: 'Greige', qty: 5400, region: 'Tamil Nadu' },
  { id: 'S-03', structure: 'Knit', fibre: 'Cotton', gsm: 180, finish: 'Finished', qty: 2800, region: 'Tiruppur' },
  { id: 'S-04', structure: 'Woven', fibre: 'Polyester', gsm: 95, finish: 'Deadstock', qty: 7600, region: 'Surat' },
  { id: 'S-05', structure: 'Knit', fibre: 'Blend', gsm: 210, finish: 'Finished', qty: 4100, region: 'Ludhiana' },
  { id: 'S-06', structure: 'Woven', fibre: 'Viscose', gsm: 120, finish: 'Finished', qty: 2300, region: 'Bhilwara' },
  { id: 'S-07', structure: 'Knit', fibre: 'Polyester', gsm: 160, finish: 'Greige', qty: 6900, region: 'Surat' },
]
