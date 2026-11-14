export default function MillCard({ card }) {
  return (
    <div className="h-full rounded-[10px] border border-white/18 bg-white/4 p-5">
      <b className="mb-1.5 block font-display text-[17px] font-semibold">{card.title}</b>
      <p className="text-sm text-band-muted">{card.text}</p>
    </div>
  )
}
