import { lotColumns, lotsEmpty } from '../../data/lots.js'
import { formatNumber } from '../../lib/format.js'
import Tag from '../ui/Tag.jsx'

const cell = 'border-b border-line px-3.5 py-3 text-left tabular-nums'

export default function LotsTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-line bg-surface text-ink">
      <table className="w-full min-w-[700px] border-collapse text-sm">
        <thead>
          <tr>
            {lotColumns.map((c) => (
              <th key={c} scope="col" className={`${cell} bg-band font-body text-[13px] font-semibold text-on-band`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr:last-child>td]:border-b-0">
          {rows.map((l) => (
            <tr key={l.id}>
              <td className={cell}>
                <b>Lot {l.id}</b>
              </td>
              <td className={cell}>{l.structure}</td>
              <td className={cell}>{l.fibre}</td>
              <td className={`${cell} font-mono`}>{l.gsm}</td>
              <td className={cell}>
                <Tag>{l.finish}</Tag>
              </td>
              <td className={`${cell} font-mono`}>{formatNumber(l.qty)}</td>
              <td className={cell}>{l.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="p-6 text-muted">{lotsEmpty}</div>}
    </div>
  )
}
