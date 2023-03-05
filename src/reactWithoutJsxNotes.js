import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function ReactWithoutJsxNotes() {
  const notes = `## React without JSX  
    Each JSX element is just syntactic sugar for calling \`React.createElement(component, props, ...children)\`.`
  return <ReactMarkdown>{notes}</ReactMarkdown>
}
