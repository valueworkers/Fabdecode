import Heading from '../ui/Heading.jsx'
import Lede from '../ui/Lede.jsx'
import Note from '../ui/Note.jsx'
import MockBlock from './MockBlock.jsx'

export default function SceneView({ scene }) {
  return (
    <div className="flex h-full flex-col gap-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <Heading as="h3" className="text-xl">
          {scene.title}
        </Heading>
        <Note className="font-medium">{scene.tag}</Note>
      </div>
      <Lede className="max-w-[60ch] text-sm">{scene.cap}</Lede>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 rounded-lg border border-line bg-paper p-3.5">
        {scene.mock.map((b) => (
          <MockBlock key={b.id} block={b} />
        ))}
      </div>
    </div>
  )
}
