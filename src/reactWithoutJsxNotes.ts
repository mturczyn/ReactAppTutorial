import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function ReactWithoutJsxNotes() {
  const notes = `## React without JSX  
Each JSX element is just syntactic sugar for calling
\`\`\`
React.createElement(component, props, ...children)
\`\`\`
So, naything you can do with JSX 
can be done with just plain JavaScript.
    
For example, this code
\`\`\`
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />);
\`\`\`
can be compiled to this code that does not use JSX:
\`\`\`
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, 'Hello ' + this.props.toWhat);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'World'}, null));
\`\`\`
If you're curious to see more examples of how JSX is converted to JavaScript, you can try out 
[the online Babel compiler](https://babeljs.io/repl/#?presets=react&amp;code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA)`

  return <ReactMarkdown>{notes}</ReactMarkdown>
}
