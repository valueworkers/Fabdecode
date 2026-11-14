import { useEffect, useRef, useState } from 'react'
import { pageTitles } from '../data/site.js'
import {
  addWixCartLine,
  fetchWixCategories,
  fetchWixProducts,
  WIX_SHOP_ORIGIN,
} from '../lib/wixCatalog.js'
import Band from '../components/layout/Band.jsx'
import Section from '../components/layout/Section.jsx'

const sortOptions = [
  { value: 'featured', label: 'Default order' },
  { value: 'priceAsc', label: 'Price: low to high' },
  { value: 'priceHigh', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A–Z' },
  { value: 'nameDesc', label: 'Name: Z–A' },
  { value: 'newest', label: 'Newest' },
]

export default function ExchangePage() {
  const [categories, setCategories] = useState([])
  const [categoryError, setCategoryError] = useState('')
  const [categoryRetry, setCategoryRetry] = useState(0)
  const [categoryId, setCategoryId] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(null)
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [catalogError, setCatalogError] = useState('')
  const [retry, setRetry] = useState(0)
  const [addingProductId, setAddingProductId] = useState('')
  const [cartError, setCartError] = useState('')
  const requestVersion = useRef(0)

  useEffect(() => {
    let active = true
    setCategoryError('')

    fetchWixCategories()
      .then((items) => {
        if (active) setCategories(items)
      })
      .catch((cause) => {
        console.error('Unable to load Wix ready-stock categories.', cause)
        if (active) setCategoryError('Categories could not be loaded from Wix.')
      })

    return () => {
      active = false
    }
  }, [categoryRetry])

  useEffect(() => {
    const timeout = window.setTimeout(() => setSearch(searchInput.trim()), 300)
    return () => window.clearTimeout(timeout)
  }, [searchInput])

  useEffect(() => {
    const version = ++requestVersion.current
    let active = true
    setProducts([])
    setTotal(null)
    setCursor(null)
    setHasMore(false)
    setLoadingMore(false)
    setCatalogError('')
    setLoading(true)

    fetchWixProducts({ search, categoryId: categoryId || null, sort, inStockOnly })
      .then((page) => {
        if (!active || version !== requestVersion.current) return
        setProducts(page.products)
        setTotal(page.total)
        setCursor(page.nextCursor)
        setHasMore(page.hasMore)
      })
      .catch((cause) => {
        console.error('Unable to load the Wix ready-stock catalog.', cause)
        if (active && version === requestVersion.current) {
          setCatalogError('Ready-stock listings could not be loaded from Wix. Please try again.')
        }
      })
      .finally(() => {
        if (active && version === requestVersion.current) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [search, categoryId, sort, inStockOnly, retry])

  async function loadMore() {
    if (!cursor || !hasMore || loadingMore) return
    const version = requestVersion.current
    setLoadingMore(true)
    setCatalogError('')

    try {
      const page = await fetchWixProducts({
        search,
        categoryId: categoryId || null,
        sort,
        inStockOnly,
        cursor,
      })
      if (version !== requestVersion.current) return
      setProducts((current) => [...current, ...page.products])
      setCursor(page.nextCursor)
      setHasMore(page.hasMore)
    } catch (cause) {
      console.error('Unable to load more Wix ready-stock listings.', cause)
      if (version === requestVersion.current) {
        setCatalogError('More listings could not be loaded. Please try again.')
      }
    } finally {
      if (version === requestVersion.current) setLoadingMore(false)
    }
  }

  async function addToCart(product) {
    setAddingProductId(product.id)
    setCartError('')

    try {
      await addWixCartLine(product.id, product.minPriceVariantId)
      window.location.hash = '#/cart'
    } catch (cause) {
      console.error('Unable to add a Wix product to the cart.', cause)
      setCartError(cause instanceof Error ? cause.message : 'This item could not be added to your Wix cart.')
    } finally {
      setAddingProductId('')
    }
  }

  return (
    <Band>
      <title>{pageTitles.exchange}</title>
      <Section className="py-[42px] max-[820px]:py-[32px]">
        <h1 className="mb-2 text-[clamp(34px,5vw,58px)] font-bold leading-[1.05] tracking-[-0.04em]">
          Ready stock
        </h1>
        <p className="mb-5 text-sm text-muted">
          Prices are per metre, ex-mill. Mill names are shared after you order.
        </p>

        <div className="flex gap-2 overflow-x-auto border-b border-line pb-1.5" role="group" aria-label="Fabric category">
          <button
            type="button"
            aria-pressed={!categoryId}
            onClick={() => setCategoryId('')}
            className={`shrink-0 border px-3.5 py-2 text-sm font-medium ${!categoryId ? 'border-surface bg-surface text-ink' : 'border-line bg-transparent text-on-band hover:bg-surface/10'}`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={categoryId === category.id}
              onClick={() => setCategoryId(category.id)}
              className={`shrink-0 border px-3.5 py-2 text-sm font-medium ${categoryId === category.id ? 'border-surface bg-surface text-ink' : 'border-line bg-transparent text-on-band hover:bg-surface/10'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid gap-4 border-b border-line py-4 sm:grid-cols-[minmax(190px,210px)_minmax(150px,170px)_1fr] sm:items-end">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-on-band">
            Search
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              maxLength={100}
              placeholder="Fabric name"
              className="w-full border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-on-band">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full border border-line bg-surface px-3 py-2.5 text-ink"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 self-end pb-2.5 text-sm font-medium text-on-band">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            In stock only
          </label>
        </div>

        {categoryError && (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-on-band" role="alert">
            <span>{categoryError}</span>
            <button type="button" onClick={() => setCategoryRetry((value) => value + 1)} className="underline">
              Retry
            </button>
          </div>
        )}

        {cartError && (
          <div className="mt-4 border border-line bg-surface px-4 py-3 text-sm text-ink" role="alert">
            {cartError}
          </div>
        )}

        <div className="mt-4">
          <p className="border-b border-line pb-2 text-sm font-semibold" aria-live="polite">
            {loading
              ? 'Loading lots…'
              : catalogError && products.length === 0
                ? 'Lots unavailable'
                : total == null
                  ? `${products.length} lots loaded`
                  : `${total} ${total === 1 ? 'lot' : 'lots'}`}
          </p>

          {catalogError && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 text-sm text-ink" role="alert">
              <span>{catalogError}</span>
              <button
                type="button"
                onClick={() => (hasMore && products.length > 0 ? loadMore() : setRetry((value) => value + 1))}
                className="font-semibold text-accent-ink underline"
              >
                Try again
              </button>
            </div>
          )}

          {loading && products.length === 0 ? (
            <p className="border-b border-line py-6 text-sm text-muted" role="status">Loading fabric lots…</p>
          ) : !loading && products.length === 0 && !catalogError ? (
            <p className="border-b border-line py-6 text-sm text-muted">
              {search || categoryId || inStockOnly ? 'No lots match these filters.' : 'No lots listed yet.'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[790px]">
                {products.map((product) => {
                  const productUrl = product.slug
                    ? `${WIX_SHOP_ORIGIN}/product.html?slug=${encodeURIComponent(product.slug)}`
                    : `${WIX_SHOP_ORIGIN}/shop.html`
                  const price = product.fromPrice
                    ? `From ${product.price}`
                    : product.price && product.maxPrice && product.price !== product.maxPrice
                      ? `${product.price} – ${product.maxPrice}`
                      : product.price || 'See price on Wix'
                  const availability = product.availability === 'OUT_OF_STOCK'
                    ? product.preorder ? 'Pre-order' : 'Sold out'
                    : 'In stock'
                  const canAdd = product.quickAddable && product.minPriceVariantId

                  return (
                    <article
                      key={product.id}
                      className="grid grid-cols-[56px_minmax(300px,1fr)_170px_110px_110px] items-center gap-4 border-b border-line py-3"
                    >
                      <a href={productUrl} target="_blank" rel="noreferrer" className="block h-[78px] w-14 bg-surface-2">
                        {product.imageUrl && (
                          <img src={product.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
                        )}
                      </a>
                      <a
                        href={productUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold leading-snug text-on-band no-underline hover:underline"
                      >
                        {product.name}
                      </a>
                      <div>
                        <div className="font-mono text-sm font-semibold text-on-band">{price}</div>
                        <div className="mt-1 text-sm text-muted">per metre</div>
                      </div>
                      <span className={`text-sm font-semibold ${availability === 'In stock' ? 'text-ok' : 'text-muted'}`}>
                        {availability}
                      </span>
                      {canAdd ? (
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          disabled={Boolean(addingProductId)}
                          className="bg-accent px-3 py-2 text-sm font-semibold text-on-accent disabled:opacity-60"
                        >
                          {addingProductId === product.id ? 'Adding…' : 'Add 1 m'}
                        </button>
                      ) : (
                        <a
                          href={productUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-line px-3 py-2 text-center text-sm font-semibold text-on-band no-underline hover:bg-surface/10"
                        >
                          {product.availability === 'OUT_OF_STOCK' && !product.preorder ? 'View' : 'Choose'}
                        </a>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {!loading && hasMore && (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="border border-line px-5 py-2.5 text-sm font-semibold text-on-band disabled:opacity-60"
            >
              {loadingMore ? 'Loading…' : 'Load more'}
            </button>
          </div>
        )}
      </Section>
    </Band>
  )
}
