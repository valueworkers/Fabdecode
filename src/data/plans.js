export const plansHead = {
  flag: 'Subscription plans',
  title: 'Start with a few swatches. Scale to a full sourcing desk.',
  lede: 'Three tiers, priced monthly, built for sampling teams through to bulk export houses.',
}

export const plans = [
  {
    id: 'starter',
    tier: 'Starter',
    price: 4999,
    blurb: 'Boutiques, emerging labels, independent designers.',
    features: [
      { k: 'Swatch quota', v: 'Up to 20 swatches / month' },
      { k: 'Report', v: 'Count, construction, GSM, content, indicative pricing and MOQ' },
      { k: 'Ready-stock marketplace', v: 'Full catalogue access and direct purchasing' },
      { k: 'Sourcing', v: 'Self-serve platform ordering' },
      { k: 'TNA reporting', v: 'Not included' },
      { k: 'Analysis turnaround', v: '48 to 72 business hours' },
    ],
  },
  {
    id: 'growth',
    tier: 'Growth',
    price: 8999,
    featured: true,
    blurb: 'Growing apparel brands and domestic garment units.',
    features: [
      { k: 'Swatch quota', v: 'Up to 50 swatches / month' },
      { k: 'Report', v: 'Full technical specs, verified mill quotes, sample and bulk lead times' },
      { k: 'Ready-stock marketplace', v: 'Full access plus 48-hour priority stock reservation' },
      { k: 'Sourcing', v: 'Dedicated sourcing desk for mill matching' },
      { k: 'TNA reporting', v: 'Key milestone notifications' },
      { k: 'Analysis turnaround', v: '24 to 48 business hours' },
    ],
  },
  {
    id: 'pro',
    tier: 'Pro / Enterprise',
    price: 12999,
    blurb: 'Garment exporters, buying houses and bulk buyers.',
    features: [
      { k: 'Swatch quota', v: 'Unlimited, up to 15 active swatches in the lab queue at once' },
      { k: 'Report', v: 'Full technical specs, custom mill development and bulk negotiation' },
      { k: 'Ready-stock marketplace', v: 'Full access, priority stock hold and preferential mill rates' },
      { k: 'Sourcing', v: 'Complete sourcing-to-warehouse execution' },
      { k: 'TNA reporting', v: 'Full live TNA from order placement to warehouse delivery' },
      { k: 'Analysis turnaround', v: 'Priority 24-hour technical turnaround' },
    ],
  },
]
