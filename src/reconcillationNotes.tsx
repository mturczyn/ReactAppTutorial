import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Profiler, useState } from 'react'
import { onRenderProfilerCallback } from './profiling/profilerTestArea'

function ProfiledReconcillation() {
  const [items, setItems] = useState<any[]>([])
  const [insertAtStart, setInsertAtStart] = useState(false)

  return (
    <div>
      <button
        onClick={() =>
          setItems((x: any[]) =>
            insertAtStart ? [CreateUUID(), ...x] : [...x, CreateUUID()]
          )
        }
      >
        Add item
      </button>
      <button
        disabled={insertAtStart}
        onClick={() => setInsertAtStart(x => !x)}
      >
        Insert item at beginning
      </button>
      <button
        disabled={!insertAtStart}
        onClick={() => setInsertAtStart(x => !x)}
      >
        Insert item at end
      </button>
      <h3>List without keys</h3>
      <Profiler
        id='Without keys'
        onRender={onRenderProfilerCallback}
      >
        <ul>
          {items.map(x => (
            <ListItemWithoutKey content={x} />
          ))}
        </ul>
      </Profiler>
      <h3>List with keys</h3>
      <Profiler
        id='with keys'
        onRender={onRenderProfilerCallback}
      >
        <ul>
          {items.map(x => (
            <ListItem
              id={x}
              content={x}
            />
          ))}
        </ul>
      </Profiler>
    </div>
  )
}

function ListItem(props: any) {
  console.log('>>>', 'rendering LIST ITEM')
  return <li key={props.id}>{props.content}</li>
}

function ListItemWithoutKey(props: any) {
  console.log('>>>', 'rendering LIST ITEM WITHOUT KEY')
  return <li>{props.content}</li>
}

function CreateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function ReconcillationNotes() {
  const notes = `## Reconcillation
  
### Diffing algorithm

Diffing algorithm is based on assumptions that:
1. Two elements of different types will produce different results
2. Developer can hint at which child elements may be stable across different renders with a key prop.

Using \`key\` prop is especially useful when working with lists:
\`\`\`
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
\`\`\`

When inserting element at the top like below:

\`\`\`
<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
\`\`\`

React will mutate and cause re-render of all eleemnts. That's why it's important to define \`key\` prop:
\`\`\`
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
\`\`\`
And insertion like below
\`\`\`
<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
\`\`\`
will cause only insertion of new HTML DOM elemnt.

  `

  const [showProfiledReconcillation, setShowProfiledReconcillation] =
    useState(false)

  return (
    <div>
      <ReactMarkdown>{notes}</ReactMarkdown>
      <button onClick={() => setShowProfiledReconcillation(x => !x)}>
        Toggle reconcillation with profiler example
      </button>
      {showProfiledReconcillation && <ProfiledReconcillation />}
    </div>
  )
}
