import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

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

  return <ReactMarkdown>{notes}</ReactMarkdown>
}
