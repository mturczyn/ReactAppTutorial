import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function OptimizingPerformanceNotes() {
  const notes = `## Optimizing Performance
  
In order to optimize performance of components we can override method 
shouldComponentUpdate and apply there logic that will decide if 
component should be updated in UI. Most of the times this logic will be
based on shallow comparison of state and props object variable, in such occasion
React provides PureComponent that we can inherit from instead of
Component:
\`\`\`
class OptimizedComponent extends React.PureComponent
\`\`\`
But if the state is, for example, is array (object), the comparison
may return that state is equal even though elements in array may have
changed, thus not working properly.`

  return <ReactMarkdown>{notes}</ReactMarkdown>
}
