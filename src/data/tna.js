export const tnaHead = {
  flag: 'Time and action reporting',
  title: 'Seven checkpoints from order to your warehouse.',
  lede: 'Pro orders show every production milestone live. Growth subscribers get key milestone notifications. This preview shows an example order part-way through.',
}

export const statusLabels = { done: 'Done', now: 'In progress', pending: 'Pending' }

export const tnaSteps = [
  { n: 1, label: 'Order and lab dip approval', status: 'done' },
  { n: 2, label: 'Yarn or greige procurement', status: 'done' },
  { n: 3, label: 'Weaving or knitting progress', status: 'done' },
  { n: 4, label: 'Dyeing and finishing', status: 'now' },
  { n: 5, label: '4-point fabric inspection', status: 'pending' },
  { n: 6, label: 'Ex-mill dispatch and logistics', status: 'pending' },
  { n: 7, label: 'Buyer warehouse delivery', status: 'pending' },
]

export const tnaBlocks = [
  { id: 'fair', title: 'Fair usage on unlimited plans', text: 'Pro includes unlimited monthly swatches with up to 15 active swatches in the lab queue at the same time. That keeps turnaround steady for every account all month.' },
  { id: 'standards', title: 'Mills accept the same standards', text: 'Every mill signs an agreement covering stock accuracy, 48-hour inventory hold, quality tolerances and automatic commission deduction.' },
]
