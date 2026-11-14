const pill = (label, d) => ({ label, d })
const kv = (k, v, d) => ({ k, v, d })

export const playerCopy = {
  flag: 'How it works',
  label: 'Ordering workflow video',
  tabsLabel: 'Choose a workflow',
  footnote: 'Animated walkthrough. Names, lots and figures shown are illustrative.',
}

export const workflows = [
  {
    id: 'stock',
    tab: 'Order ready stock',
    railLabel: 'Ready stock steps',
    scenes: [
      {
        rail: 'Search the exchange',
        title: 'Search verified mill inventory',
        tag: 'Ready-Stock Exchange',
        cap: 'Filter by weave or knit structure, fibre, GSM, finish and ready quantity. Every lot carries live photos and parameters from the mill.',
        mock: [
          { id: 'filters', type: 'pills', hl: true, items: [pill('Woven', 0.2), pill('Cotton', 0.7), pill('110 to 130 GSM', 1.2), pill('Finished', 1.7), pill('2,000 m or more', 2.2)] },
          { id: 'count', type: 'count', d: 2.6, label: 'Matching lots', note: 'sample view' },
          { id: 'lot', type: 'lot', d: 2.8, title: 'Cotton poplin, finished', sub: '110 to 130 GSM / ready yardage shown per lot', tag: 'Verified mill' },
        ],
      },
      {
        rail: 'Shortlist and hold',
        title: 'Shortlist and hold the lot',
        tag: '48-hour priority reservation',
        cap: 'Compare lots side by side. Growth and Pro subscribers can reserve stock for 48 hours while samples are checked.',
        mock: [
          { id: 'a', type: 'lot', d: 0.2, title: 'Lot A: cotton poplin', sub: 'Finished / yardage on hand', tag: 'Available' },
          { id: 'b', type: 'lot', d: 0.7, title: 'Lot B: cotton poplin', sub: 'Finished / yardage on hand', action: 'Reserve 48 h', selected: true, tint: 'hue-rotate-[160deg]' },
          { id: 'c', type: 'lot', d: 1.2, title: 'Lot C: cotton sateen', sub: 'Deadstock / yardage on hand', tag: 'Available', tint: 'grayscale-[.6]' },
        ],
      },
      {
        rail: 'Order through the platform',
        title: 'Place the order on the platform',
        tag: 'Managed order routing',
        cap: "Orders route through fabDecode, so buyer and mill identities stay confidential. The mill's commission is deducted automatically once your payment is realised.",
        mock: [
          { id: 'kv', type: 'kv', items: [kv('LOT', 'B', 0.2), kv('QUANTITY', 'As reserved', 0.5), kv('SUPPLIER', 'Identity protected', 0.8), kv('ROUTING', 'Via fabDecode', 1.1)] },
          { id: 'stamp', type: 'stamp', d: 1.8, label: 'Order placed' },
        ],
      },
      {
        rail: 'Mill dispatches',
        title: 'Mill confirms, inspects and ships',
        tag: 'To your warehouse',
        cap: 'The mill confirms stock accuracy, the lot is inspected, and dispatch moves with tracking until it reaches you.',
        mock: [
          {
            id: 'steps',
            type: 'steps',
            items: [
              { n: 'STEP 1', label: 'Mill confirms stock', d: 0.3 },
              { n: 'STEP 2', label: 'Quality check', d: 1.0 },
              { n: 'STEP 3', label: 'Ex-mill dispatch', d: 1.7 },
              { n: 'STEP 4', label: 'Delivered to you', d: 2.4 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'custom',
    tab: 'Source custom fabric',
    railLabel: 'Custom sourcing steps',
    scenes: [
      {
        rail: 'Submit swatch',
        title: 'Upload a photo and your target',
        tag: 'Stage 1 of the inquiry funnel',
        cap: 'Share fabric images and the parameters you want. Photos are often enough for the technical team.',
        mock: [
          { id: 'drop', type: 'drop', d: 0.2, file: 'swatch-front.jpg', note: 'Reference image' },
          { id: 'targets', type: 'pills', items: [pill('Target GSM', 1), pill('Quantity', 1.3), pill('Destination', 1.6)] },
          { id: 'stamp', type: 'stamp', d: 2.2, label: 'Request received' },
        ],
      },
      {
        rail: 'Courier if needed',
        title: 'Courier the swatch if photos fall short',
        tag: 'Stage 2 and 3',
        cap: 'When visual inspection is inconclusive, register the courier and our lab runs a physical dissection: pick-glass ends and picks, GSM cutter, burn and solubility tests.',
        mock: [
          { id: 'parcel', type: 'parcel', d: 0.2, from: 'Your office', to: 'fabDecode lab' },
          { id: 'kv', type: 'kv', items: [kv('COUNT', 'Ends and picks', 0.8), kv('GSM', 'Cutter measured', 1.1), kv('FIBRE', 'Burn and solubility', 1.4)] },
        ],
      },
      {
        rail: 'Technical dossier',
        title: 'Receive the technical and commercial dossier',
        tag: "Within your plan's turnaround",
        cap: 'One standardised sheet: how the fabric is made, who can make it, and what it will cost.',
        mock: [
          {
            id: 'kv',
            type: 'kv',
            items: [
              kv('YARN COUNT', 'Decoded', 0.2),
              kv('CONSTRUCTION', 'Weave or knit', 0.5),
              kv('GSM AND FIBRE', 'Measured', 0.8),
              kv('VERIFIED MILLS', 'Matched', 1.1),
              kv('MOQ', 'Stated', 1.4),
              kv('SAMPLING PRICE', 'Quoted', 1.7),
              kv('BULK PRICE', 'Quoted', 2.0),
              kv('LEAD TIMES', 'Sample and bulk', 2.3),
            ],
          },
        ],
      },
      {
        rail: 'Mill match and sampling',
        title: 'Pick a mill and approve the sample',
        tag: 'Custom mill development on Pro',
        cap: 'Compare verified mills on price, MOQ and lead time, then approve the lab dip and sample before bulk is placed.',
        mock: [
          { id: 'm1', type: 'lot', d: 0.2, title: 'Mill option 1', sub: 'MOQ / sample price / lead time', tag: 'Verified' },
          { id: 'm2', type: 'lot', d: 0.7, title: 'Mill option 2', sub: 'MOQ / sample price / lead time', action: 'Select', selected: true, tint: 'hue-rotate-[160deg]' },
          { id: 'stamp', type: 'stamp', d: 2, label: 'Lab dip approved' },
        ],
      },
      {
        rail: 'Production and TNA',
        title: 'Track production on seven checkpoints',
        tag: 'Live TNA on Pro',
        cap: 'From order to your warehouse, our team manages every stage and you see each milestone as it clears.',
        mock: [
          {
            id: 'steps',
            type: 'steps',
            items: [
              { n: '1', label: 'Order and lab dip approval', d: 0.2 },
              { n: '2', label: 'Yarn or greige procurement', d: 0.6 },
              { n: '3', label: 'Weaving or knitting', d: 1.0 },
              { n: '4', label: 'Dyeing and finishing', d: 1.4 },
              { n: '5', label: '4-point fabric inspection', d: 1.8 },
              { n: '6', label: 'Ex-mill dispatch', d: 2.2 },
              { n: '7', label: 'Buyer warehouse delivery', d: 2.6 },
            ],
          },
        ],
      },
    ],
  },
]
