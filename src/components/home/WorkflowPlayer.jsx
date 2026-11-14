import { useId } from 'react'
import { motion, useTransform } from 'framer-motion'
import useWorkflowPlayer from '../../hooks/useWorkflowPlayer.js'
import { playerCopy, workflows } from '../../data/workflows.js'
import Flag from '../ui/Flag.jsx'
import Note from '../ui/Note.jsx'
import PlayerControls from './PlayerControls.jsx'
import StepRail from './StepRail.jsx'
import SceneView from './SceneView.jsx'

export default function WorkflowPlayer() {
  const player = useWorkflowPlayer(workflows)
  const panelId = useId()
  const totalWidth = useTransform(player.total, [0, 1], ['0%', '100%'])
  const { track } = player

  return (
    <div id="how" role="region" aria-label={playerCopy.label} className="min-w-0 overflow-hidden rounded-[10px] border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-3">
        <Flag className="basis-full">{playerCopy.flag}</Flag>
        <div role="tablist" aria-label={playerCopy.tabsLabel} className="flex flex-wrap gap-1.5">
          {workflows.map((w) => {
            const selected = w.id === track.id
            return (
              <button
                key={w.id}
                type="button"
                role="tab"
                id={`${panelId}-${w.id}`}
                aria-selected={selected}
                aria-controls={panelId}
                onClick={() => player.selectTrack(w.id)}
                className={`min-h-11 cursor-pointer rounded-md border px-4 font-body text-sm font-semibold ${
                  selected ? 'border-tab-on bg-tab-on text-tab-on-fg' : 'border-line bg-surface text-ink'
                }`}
              >
                {w.tab}
              </button>
            )
          })}
        </div>
        <PlayerControls
          index={player.index}
          count={player.count}
          playing={player.playing}
          onPrev={player.prev}
          onToggle={player.toggle}
          onNext={player.next}
        />
      </div>
      <div className="relative h-[3px] bg-line" aria-hidden="true">
        <motion.i className="absolute inset-y-0 left-0 bg-accent-ink" style={{ width: totalWidth }} />
      </div>
      <div id={panelId} role="tabpanel" aria-labelledby={`${panelId}-${track.id}`} className="grid min-h-[440px] grid-cols-[minmax(0,1fr)]">
        <StepRail
          label={track.railLabel}
          scenes={track.scenes}
          index={player.index}
          progress={player.progress}
          onSelect={player.goTo}
        />
        <div className="relative min-w-0 p-5">
          <SceneView key={player.sceneKey} scene={track.scenes[player.index]} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface-2 px-4 py-3">
        <Note>{playerCopy.footnote}</Note>
      </div>
    </div>
  )
}
