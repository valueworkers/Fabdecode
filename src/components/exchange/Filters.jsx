import { filterFields } from '../../data/lots.js'
import Field from '../ui/Field.jsx'

export default function Filters({ filters, onChange }) {
  return (
    <div className="mb-[18px] flex flex-wrap gap-3">
      {filterFields.map((f) => (
        <Field
          key={f.name}
          as="select"
          name={f.name}
          label={f.label}
          labelClassName="font-mono text-xs font-medium tracking-[.06em] text-muted uppercase"
          value={filters[f.name]}
          onChange={(e) => onChange({ ...filters, [f.name]: e.target.value })}
        >
          <option value="">All</option>
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Field>
      ))}
    </div>
  )
}
