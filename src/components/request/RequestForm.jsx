import { useActionState, useEffect, useRef } from 'react'
import usePhotoPreviews from '../../hooks/usePhotoPreviews.js'
import { requestCopy, requestTypes } from '../../data/request.js'
import Button from '../ui/Button.jsx'
import Field from '../ui/Field.jsx'

const initialState = {
  values: { company: '', type: requestTypes[0], awb: '', params: '' },
  errors: {},
  ok: false,
}

function submitRequest(_previous, formData) {
  const read = (name) => String(formData.get(name) ?? '')
  const values = { company: read('company').trim(), type: read('type'), awb: read('awb'), params: read('params') }
  const errors = values.company ? {} : { company: requestCopy.companyError }
  return { values, errors, ok: Object.keys(errors).length === 0 }
}

export default function RequestForm() {
  const [state, formAction] = useActionState(submitRequest, initialState)
  const photos = usePhotoPreviews()
  const companyRef = useRef(null)
  const summaryRef = useRef(null)

  useEffect(() => {
    if (state.errors.company) companyRef.current?.focus()
    else if (state.ok) summaryRef.current?.focus()
  }, [state])

  return (
    <form
      action={formAction}
      onReset={photos.clear}
      noValidate
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3.5"
    >
      <Field
        ref={companyRef}
        label={requestCopy.company}
        name="company"
        autoComplete="organization"
        required
        defaultValue={state.values.company}
        error={state.errors.company}
      />
      <Field as="select" label={requestCopy.type} name="type" defaultValue={state.values.type}>
        {requestTypes.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </Field>
      <Field
        label={requestCopy.images}
        name="images"
        type="file"
        accept="image/*"
        multiple
        className="pt-[9px]"
        onChange={photos.onChange}
      />
      <Field label={requestCopy.awb} name="awb" defaultValue={state.values.awb} />
      {photos.previews.length > 0 && (
        <ul aria-label={requestCopy.imagesPreview} className="col-span-full flex flex-wrap gap-2.5">
          {photos.previews.map((p) => (
            <li key={p.id}>
              <img src={p.url} alt={p.name} className="size-16 rounded-md border border-line object-cover" />
            </li>
          ))}
        </ul>
      )}
      <Field
        as="textarea"
        full
        label={requestCopy.params}
        name="params"
        placeholder={requestCopy.paramsPlaceholder}
        defaultValue={state.values.params}
      />
      <div className="col-span-full">
        <Button type="submit" variant="primary">
          {requestCopy.submit}
        </Button>
      </div>
      <div
        ref={summaryRef}
        role="status"
        tabIndex={-1}
        hidden={!state.ok}
        className="col-span-full rounded-lg border border-ok bg-surface-2 p-3.5 text-ink"
      >
        {requestCopy.success}
      </div>
    </form>
  )
}
