import { Profiler } from 'react'

function SomeComponent(props) {
  return <h1>{props.header}</h1>
}

export default function ProfilerTestArea() {
  return (
    <div>
      <Profiler
        id='SomeComponent'
        onRender={onRenderCallback}
      >
        <SomeComponent header='Michal is the best' />
      </Profiler>
    </div>
  )
}

function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
  const logOnRenderCallback = (obj, what) =>
    console.log('>>>', 'PROFILER CALLBACK', what, '=', JSON.stringify(obj))
  logOnRenderCallback(id, 'id')
  logOnRenderCallback(phase, 'phase')
  logOnRenderCallback(actualDuration, 'actualDuration')
  logOnRenderCallback(baseDuration, 'baseDuration')
  logOnRenderCallback(startTime, 'startTime')
  logOnRenderCallback(commitTime, 'commitTime')
  logOnRenderCallback(interactions, 'interactions')
}
