import Heading from '../ui/Heading.jsx'
import Lede from '../ui/Lede.jsx'

export default function InfoColumn({ blocks, gap = 'gap-4', children }) {
  return (
    <div className={`flex flex-col ${gap}`}>
      {blocks.map((b) => (
        <div key={b.id} className={`flex flex-col ${gap}`}>
          <Heading as="h3" className="text-[26px]">
            {b.title}
          </Heading>
          <Lede className="max-w-[60ch] text-base">{b.text}</Lede>
        </div>
      ))}
      {children}
    </div>
  )
}
