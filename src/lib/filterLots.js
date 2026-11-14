export default function filterLots(lots, { structure, fibre, gsm, finish }) {
  const [min, max] = gsm ? gsm.split('-').map(Number) : [0, Infinity]
  return lots.filter(
    (l) =>
      (!structure || l.structure === structure) &&
      (!fibre || l.fibre === fibre) &&
      (!finish || l.finish === finish) &&
      l.gsm >= min &&
      l.gsm <= max,
  )
}
