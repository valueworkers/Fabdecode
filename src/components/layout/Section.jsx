export default function Section({ children, className = '' }) {
  return <section className={`mx-auto max-w-[1180px] py-[72px] max-[820px]:py-[52px] ${className}`}>{children}</section>
}
