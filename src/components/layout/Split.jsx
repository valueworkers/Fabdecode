export default function Split({ children }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-start gap-7">{children}</div>
  )
}
