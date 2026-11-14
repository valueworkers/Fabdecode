import { useEffect, useState } from 'react'
import { pageTitles } from '../data/site.js'
import { fetchWixCart, removeWixCartLine, updateWixCartLine } from '../lib/wixCatalog.js'
import Band from '../components/layout/Band.jsx'
import Section from '../components/layout/Section.jsx'

export default function CartPage() {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busyLine, setBusyLine] = useState('')
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    fetchWixCart()
      .then((nextCart) => {
        if (active) setCart(nextCart)
      })
      .catch((cause) => {
        console.error('Unable to load the ready-stock cart.', cause)
        if (active) setError('Your cart could not be loaded. Please try again.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [reload])

  async function changeQuantity(line, quantity) {
    setBusyLine(line.id)
    setError('')
    try {
      setCart(await updateWixCartLine(line.id, quantity))
    } catch (cause) {
      console.error('Unable to update a cart item quantity.', cause)
      setError(cause instanceof Error ? cause.message : 'The quantity could not be updated.')
    } finally {
      setBusyLine('')
    }
  }

  async function removeItem(line) {
    setBusyLine(line.id)
    setError('')
    try {
      setCart(await removeWixCartLine(line.id))
    } catch (cause) {
      console.error('Unable to remove a cart item.', cause)
      setError(cause instanceof Error ? cause.message : 'The item could not be removed.')
    } finally {
      setBusyLine('')
    }
  }

  return (
    <Band>
      <title>{pageTitles.cart}</title>
      <Section className="py-[42px] max-[820px]:py-[32px]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="mb-2 text-[clamp(34px,5vw,58px)] font-bold leading-[1.05] tracking-[-0.04em]">
              Your cart
            </h1>
            <p className="text-sm text-muted">
              Review quantities and estimated prices before sending an order request.
            </p>
          </div>
          <a
            href="#/exchange"
            className="border border-line px-4 py-2.5 text-sm font-semibold text-on-band no-underline hover:bg-surface/10"
          >
            Continue shopping
          </a>
        </div>

        {error && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border border-line bg-surface px-4 py-3 text-sm text-ink" role="alert">
            <span>{error}</span>
            <button type="button" onClick={() => setReload((value) => value + 1)} className="font-semibold text-accent-ink underline">
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <p className="border-y border-line py-6 text-sm text-muted" role="status">Loading your cart…</p>
        ) : !cart && error ? null : !cart?.lines.length ? (
          <div className="border-y border-line py-8">
            <h2 className="text-lg font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-sm text-muted">Browse ready stock and add a metre of any available fabric.</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <p className="mb-2 text-sm font-semibold">
                {cart.itemCount} {cart.itemCount === 1 ? 'metre' : 'metres'} · {cart.lines.length} {cart.lines.length === 1 ? 'item' : 'items'}
              </p>
              <div className="border-y border-line">
                {cart.lines.map((line) => (
                  <article key={line.id} className="flex flex-wrap items-center gap-4 border-b border-line py-4 last:border-b-0">
                    <div className="h-[88px] w-16 shrink-0 bg-surface-2">
                      {line.imageUrl && (
                        <img src={line.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-[180px] flex-1">
                      <h2 className="font-semibold leading-snug">{line.name}</h2>
                      <p className="mt-1 text-sm text-muted">{line.unitPrice || 'Price unavailable'} per metre</p>
                      {line.status !== 'IN_STOCK' && (
                        <p className="mt-1 text-sm text-err">Availability needs confirmation.</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Remove one metre of ${line.name}`}
                        onClick={() => changeQuantity(line, line.quantity - 1)}
                        disabled={Boolean(busyLine) || line.quantity <= 1}
                        className="size-9 border border-line text-lg disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="min-w-10 text-center font-mono" aria-live="polite">{line.quantity} m</span>
                      <button
                        type="button"
                        aria-label={`Add one metre of ${line.name}`}
                        onClick={() => changeQuantity(line, line.quantity + 1)}
                        disabled={Boolean(busyLine) || (line.availableQuantity != null && line.quantity >= line.availableQuantity)}
                        className="size-9 border border-line text-lg disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                    <div className="min-w-24 text-right font-mono font-semibold">
                      {line.linePrice || '—'}
                      <button
                        type="button"
                        onClick={() => removeItem(line)}
                        disabled={Boolean(busyLine)}
                        className="mt-1 block w-full text-right font-sans text-xs font-medium text-muted underline disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              {cart.totalsError && (
                <p className="mt-3 text-sm text-err" role="alert">{cart.totalsError}</p>
              )}
            </div>

            <aside className="h-fit border border-line bg-surface p-5 text-ink">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <div className="mt-4 space-y-3 border-b border-line pb-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-mono">{cart.subtotal || '—'}</span>
                </div>
                {cart.discount && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted">Discount</span>
                    <span className="font-mono">{cart.discount}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-between gap-4 font-semibold">
                <span>Estimated total</span>
                <span className="font-mono">{cart.total || '—'}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Shipping and final availability are confirmed with your order request.
              </p>
              <button
                type="button"
                disabled
                title="Order request delivery has not been configured yet."
                className="mt-5 w-full bg-accent px-4 py-3 text-sm font-semibold text-on-accent opacity-60"
              >
                Submit order request
              </button>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Order submission is not configured yet. No request will be sent.
              </p>
            </aside>
          </div>
        )}
      </Section>
    </Band>
  )
}
