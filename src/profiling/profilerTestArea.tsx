import { Profiler } from 'react'

function SomeComponent(props: any) {
  return <h1>{props.header}</h1>
}

export default function ProfilerTestArea() {
  return (
    <div>
      <Profiler
        id='SomeComponent'
        onRender={onRenderProfilerCallback}
      >
        <SomeComponent header='Michal is the best' />
      </Profiler>
    </div>
  )
}

export function onRenderProfilerCallback(
  id: string, // the "id" prop of the Profiler tree that has just committed
  phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration: number, // time spent rendering the committed update
  baseDuration: number, // estimated time to render the entire subtree without memoization
  startTime: number, // when React began rendering this update
  commitTime: number, // when React committed this update
  interactions: Set<any> // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
  const logOnRenderCallback = (obj: any, what: any) =>
    console.log(
      '>>>',
      'PROFILER',
      id,
      'CALLBACK',
      what,
      '=',
      JSON.stringify(obj)
    )
  logOnRenderCallback(id, 'id')
  logOnRenderCallback(phase, 'phase')
  logOnRenderCallback(actualDuration, 'actualDuration')
  logOnRenderCallback(baseDuration, 'baseDuration')
  logOnRenderCallback(startTime, 'startTime')
  logOnRenderCallback(commitTime, 'commitTime')
  logOnRenderCallback(interactions, 'interactions')
}
