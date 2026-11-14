import { useSyncExternalStore } from 'react'
import { navLinks } from '../data/site.js'

const known = new Set([...navLinks.map((l) => l.route), 'cart'])

function subscribe(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getSnapshot() {
  const id = window.location.hash.replace(/^#\/?/, '').split(/[/?]/)[0]
  return known.has(id) ? id : 'home'
}

export default function useHashRoute() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'home')
}
