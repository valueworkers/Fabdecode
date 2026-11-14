const WIX_API_BASE = 'https://www.wixapis.com'
export const WIX_SHOP_ORIGIN = 'https://headless-dsagjcfnsob-connect7776-140b.wix-site-host.com'
const WIX_CLIENT_ID = '037b248d-b40b-4a58-ba78-28b38eb67626'
const WIX_STORES_APP_ID = '215238eb-22a5-4c36-9e7b-e7c08025e04e'
const TOKEN_STORAGE_KEY = `wix-visitor-${WIX_CLIENT_ID}`
const PAGE_SIZE = 24
const LIST_FIELDS = ['CURRENCY', 'MEDIA_ITEMS_INFO', 'MIN_PRICE_VARIANT', 'DISCOUNT_INFO']
const SORTS = {
  featured: null,
  priceAsc: [{ fieldName: 'actualPriceRange.minValue.amount', order: 'ASC' }, { fieldName: 'name', order: 'ASC' }],
  priceHigh: [{ fieldName: 'actualPriceRange.minValue.amount', order: 'DESC' }, { fieldName: 'name', order: 'ASC' }],
  name: [{ fieldName: 'name', order: 'ASC' }],
  nameDesc: [{ fieldName: 'name', order: 'DESC' }],
  newest: [{ fieldName: 'createdDate', order: 'DESC' }, { fieldName: 'name', order: 'ASC' }],
}

let tokenSet
let tokenRequest

function readStoredTokens() {
  if (typeof localStorage === 'undefined') return null
  try {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!stored) return null
    const tokens = JSON.parse(stored)
    return typeof tokens.accessToken === 'string' && typeof tokens.expiresAt === 'number' ? tokens : null
  } catch (cause) {
    console.error('Unable to read the Wix visitor session from browser storage.', cause)
    return null
  }
}

function saveTokens(tokens) {
  tokenSet = tokens
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens))
  } catch (cause) {
    console.error('Unable to persist the Wix visitor session in browser storage.', cause)
  }
}

async function mintTokens(body) {
  const response = await fetch(`${WIX_API_BASE}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId: WIX_CLIENT_ID, ...body }),
  })

  if (!response.ok) throw new Error(`Wix visitor authentication failed (${response.status}).`)

  const data = await response.json()
  if (typeof data.access_token !== 'string' || typeof data.expires_in !== 'number') {
    throw new Error('Wix returned an invalid visitor token response.')
  }

  return {
    accessToken: data.access_token,
    refreshToken: typeof data.refresh_token === 'string' ? data.refresh_token : '',
    expiresAt: Date.now() + data.expires_in * 1000,
  }
}

async function getVisitorToken() {
  const current = tokenSet ?? readStoredTokens()
  if (current?.accessToken && current.expiresAt > Date.now() + 30_000) {
    tokenSet = current
    return current.accessToken
  }
  if (tokenRequest) return tokenRequest

  tokenRequest = (async () => {
    let tokens
    if (current?.refreshToken) {
      try {
        tokens = await mintTokens({ grantType: 'refresh_token', refreshToken: current.refreshToken })
      } catch (cause) {
        console.error('Unable to refresh the Wix visitor session; creating a new visitor session.', cause)
      }
    }
    if (!tokens) tokens = await mintTokens({ grantType: 'anonymous' })
    saveTokens(tokens)
    return tokens.accessToken
  })().finally(() => {
    tokenRequest = null
  })

  return tokenRequest
}

async function wixRequest(path, { method = 'POST', body, query } = {}, retry = true) {
  const url = new URL(path, WIX_API_BASE)
  for (const [key, value] of Object.entries(query ?? {})) {
    for (const item of Array.isArray(value) ? value : [value]) url.searchParams.append(key, String(item))
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: await getVisitorToken(),
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (response.status === 401 && retry) {
    tokenSet = undefined
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
      } catch (cause) {
        console.error('Unable to clear the expired Wix visitor session.', cause)
      }
    }
    return wixRequest(path, { method, body, query }, false)
  }
  if (!response.ok) {
    const error = new Error(`Wix request failed (${response.status}).`)
    error.status = response.status
    throw error
  }
  return response.status === 204 ? null : response.json()
}

function mediaValue(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (value.image && typeof value.image === 'object') return mediaValue(value.image)
  return value.image || value.url || value.id || ''
}

function wixImageUrl(value) {
  const source = mediaValue(value)
  if (!source) return ''

  const wixImage = source.match(/^wix:image:\/\/v1\/([^/]+)/)
  const staticImage = source.match(/^https:\/\/static\.wixstatic\.com\/media\/([^/?#]+)/)
  const bareFile = source.match(/^[\w-]+~mv2\.[a-z0-9]+$/i)
  const fileId = wixImage?.[1]?.split('#')[0] || staticImage?.[1] || (bareFile ? source : '')

  if (fileId) {
    return `https://static.wixstatic.com/media/${fileId}/v1/fill/w_800,h_800,al_c,q_90/${fileId}`
  }

  try {
    const url = new URL(source)
    return url.protocol === 'https:' ? url.href : ''
  } catch {
    return ''
  }
}

function mapProduct(raw) {
  const min = raw.actualPriceRange?.minValue
  const max = raw.actualPriceRange?.maxValue
  const minVariant = raw.variantSummary?.minPriceVariant
  const variantPrice = minVariant?.price
  const currentPrice = variantPrice?.priceAfterDiscount ?? variantPrice?.actualPrice ?? min
  const hasPriceRange = Boolean(min?.amount && max?.amount && min.amount !== max.amount)
  const availability = raw.inventory?.availabilityStatus
  const preorderAvailability = raw.inventory?.preorderAvailability
  const preorder =
    preorderAvailability === 'ALL_VARIANTS' ||
    (preorderAvailability === 'SOME_VARIANTS' && availability === 'OUT_OF_STOCK') ||
    raw.inventory?.preorderStatus === 'ENABLED'
  const media = [raw.media?.main, ...(raw.media?.itemsInfo?.items ?? [])]
  const image = media.find(Boolean)
  const hasSubscriptions = (raw.subscriptionDetails?.subscriptions ?? []).some((item) => item.visible !== false)
  const id = raw._id ?? raw.id ?? raw.slug

  return {
    id,
    slug: raw.slug ?? '',
    name: raw.name ?? 'Ready-stock fabric',
    price: currentPrice?.formattedAmount ?? '',
    maxPrice: hasPriceRange ? max?.formattedAmount ?? '' : '',
    fromPrice: hasPriceRange && variantPrice?.priceAfterDiscount !== undefined,
    minPriceVariantId: minVariant?._id ?? minVariant?.id ?? minVariant?.variantId ?? null,
    imageUrl: wixImageUrl(image?.image ?? image),
    availability,
    preorder,
    quickAddable: (raw.options ?? []).length === 0 && availability === 'IN_STOCK' && !hasSubscriptions,
  }
}

function catalogFilter({ categoryId, inStockOnly }) {
  const conditions = [{ visible: true }]
  if (categoryId) {
    conditions.push({ 'allCategoriesInfo.categories': { $matchItems: [{ id: categoryId }] } })
  }
  if (inStockOnly) {
    conditions.push({ 'inventory.availabilityStatus': { $eq: 'IN_STOCK' } })
  }
  return { $and: conditions }
}

export async function fetchWixProducts({ search = '', categoryId = null, sort = 'featured', inStockOnly = false, cursor = null } = {}) {
  if (!Object.hasOwn(SORTS, sort)) throw new Error('Unsupported Wix catalog sort.')

  const filter = catalogFilter({ categoryId, inStockOnly })
  const catalogSearch = { cursorPaging: { limit: PAGE_SIZE, ...(cursor ? { cursor } : {}) } }
  let countRequest = Promise.resolve(null)

  if (!cursor) {
    catalogSearch.filter = filter
    if (SORTS[sort]) catalogSearch.sort = SORTS[sort]
    if (search.trim()) catalogSearch.search = { expression: search.trim(), fields: ['name'] }
    if (!search.trim()) {
      countRequest = wixRequest('/stores/v3/products/count', { body: { filter } }).catch((cause) => {
        console.error('Unable to get the Wix ready-stock listing count.', cause)
        return null
      })
    }
  }

  const [result, count] = await Promise.all([
    wixRequest('/stores/v3/products/search', {
      body: { fields: LIST_FIELDS, search: catalogSearch },
    }),
    countRequest,
  ])
  const items = result?.products ?? []
  if (!Array.isArray(items)) throw new Error('Wix returned an invalid product catalog response.')

  const nextCursor = result?.pagingMetadata?.cursors?.next ?? null
  return {
    products: items.map(mapProduct),
    total: typeof count?.count === 'number' ? count.count : null,
    nextCursor,
    hasMore: result?.pagingMetadata?.hasNext === true && Boolean(nextCursor),
  }
}

export async function fetchWixCategories() {
  const categories = []
  let cursor = null

  for (let page = 0; page < 20; page += 1) {
    const query = cursor
      ? { cursorPaging: { limit: 100, cursor } }
      : { filter: { visible: true }, cursorPaging: { limit: 100 } }
    const result = await wixRequest('/categories/v1/categories/query', {
      body: {
        treeReference: { appNamespace: '@wix/stores', treeKey: null },
        fields: ['DESCRIPTION'],
        query,
      },
    })
    categories.push(...(result?.categories ?? []))
    cursor = result?.pagingMetadata?.hasNext ? result?.pagingMetadata?.cursors?.next ?? null : null
    if (!cursor) break
  }

  return categories
    .filter((category) => category.visible !== false && category.slug !== 'all-products')
    .map((category) => ({
      id: category._id ?? category.id,
      name: category.name ?? '',
    }))
    .filter((category) => category.id && category.name)
}

export async function addWixCartLine(productId, variantId) {
  const options = variantId ? { variantId } : {}
  const result = await wixRequest('/ecom/v2/carts/current/add-line-items', {
    body: {
      catalogItems: [{
        quantity: 1,
        catalogReference: {
          catalogItemId: productId,
          appId: WIX_STORES_APP_ID,
          ...(Object.keys(options).length ? { options } : {}),
        },
      }],
    },
  })
  const cart = result?.cart
  const line = (cart?.lineItems ?? []).find((item) =>
    item.source?.catalogReference?.catalogItemId === productId &&
    (!variantId || item.source?.catalogReference?.options?.variantId === variantId),
  )

  if (line?.status && line.status !== 'IN_STOCK') {
    throw new Error(`This item is not available right now (${String(line.status).toLowerCase().replace(/_/g, ' ')}).`)
  }
  if (!line || line.quantityInfo?.confirmedQuantity === 0) {
    throw new Error('This item could not be added. Please open it on Wix to check its options and availability.')
  }
}

function translated(value) {
  if (typeof value === 'string') return value
  return value?.translated ?? value?.original ?? ''
}

function formatCartMoney(money, currencyCode) {
  const amount = money?.convertedAmount ?? money?.amount
  if (amount == null || amount === '') return ''
  const currency = currencyCode || 'USD'
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(Number(amount))
  } catch {
    return `${amount} ${currency}`
  }
}

function emptyCart() {
  return { lines: [], itemCount: 0, subtotal: '', discount: '', total: '', totalsError: '' }
}

export async function fetchWixCart() {
  let raw
  try {
    raw = (await wixRequest('/ecom/v2/carts/current', { method: 'GET' }))?.cart ?? null
  } catch (cause) {
    if (cause?.status === 404) return emptyCart()
    throw cause
  }

  if (!raw?.lineItems?.length) return emptyCart()

  const currencyCode = raw.customerInfo?.currencyCode ?? raw.businessInfo?.currencyCode ?? ''
  const lines = raw.lineItems.map((item) => ({
    id: item._id ?? item.id ?? '',
    name: translated(item.name) || 'Ready-stock fabric',
    quantity: item.quantityInfo?.confirmedQuantity ?? 0,
    availableQuantity: typeof item.quantityInfo?.availableQuantity === 'number' ? item.quantityInfo.availableQuantity : null,
    unitPrice: formatCartMoney(item.pricing?.unitPrice, currencyCode),
    linePrice: formatCartMoney(item.pricing?.totalPrice, currencyCode),
    imageUrl: wixImageUrl(item.attributes?.image),
    status: item.status ?? 'IN_STOCK',
  }))

  let subtotal = ''
  let discount = ''
  let total = ''
  let totalsError = ''
  try {
    const estimate = await wixRequest('/ecom/v2/carts/current/estimate', {
      body: { calculateTax: true, calculateAdditionalFees: true },
    })
    const priceSummary = estimate?.summary?.priceSummary ?? {}
    subtotal = formatCartMoney(priceSummary.subtotal, currencyCode)
    discount = formatCartMoney(priceSummary.discount, currencyCode)
    total = formatCartMoney(priceSummary.total, currencyCode)
  } catch (cause) {
    console.error('Unable to calculate Wix cart totals.', cause)
    totalsError = 'The items are in your cart, but Wix could not calculate the latest total.'
  }

  return {
    lines,
    itemCount: lines.reduce((count, item) => count + item.quantity, 0),
    subtotal,
    discount,
    total,
    totalsError,
  }
}

export async function updateWixCartLine(lineItemId, quantity) {
  if (!lineItemId || !Number.isInteger(quantity) || quantity < 1) {
    throw new Error('Cart quantity must be a positive whole number.')
  }
  await wixRequest('/ecom/v2/carts/current/update-line-items', {
    body: { lineItems: [{ lineItemId, quantity: { newQuantity: quantity } }] },
  })
  return fetchWixCart()
}

export async function removeWixCartLine(lineItemId) {
  if (!lineItemId) throw new Error('A cart line is required to remove an item.')
  await wixRequest('/ecom/v2/carts/current/remove-line-items', {
    body: { lineItemIds: [lineItemId] },
  })
  return fetchWixCart()
}
