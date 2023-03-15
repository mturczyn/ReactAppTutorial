import React from 'react'
import '../index.css'

/**
 * We use this instead of having to pass down to innermost
 * component via props.
 * It will be used by components using the context, but
 * cannot find one above the them in the tree.
 * Context.displayName
 * Context object accepts diplayName string property, React DEvTools uses this
 * string to determine what to display for the context, for example
 *
 * const MyContext = React.createContext('some value')
 * MyContext.displayName = 'My display name'
 */
const ThemeContext = React.createContext('lightblue')

export default function ComponentWithContext() {
  /**
   * Comparison of the value of Context is done with Object.is method
   * to decided whether there was change in the value.
   */
  return (
    <div>
      <ThemeContext.Provider value='lightgray'>
        <Toolbar title='With lightgraylightgray theme context' />
      </ThemeContext.Provider>
      <Toolbar title='With default theme context' />
    </div>
  )
}

function Toolbar(props) {
  return (
    <div className='container-with-border'>
      <h3>{props.title}</h3>
      <div>
        <ThemedButton />
      </div>
      <div>
        <FunctionalThemedButton />
      </div>
    </div>
  )
}

class ThemedButton extends React.Component {
  /**
   * React will try to find the closest ThemeContext up the tree
   * and use its value.
   * The contextType property on a class can be assigned a Context object
   * created by React.createComponent(). Using this property lets you consume
   * the nearest current value of that Context type using this.context. You
   * can reference this in any of the lifecycle methods including the
   * render function.
   */
  static contextType = ThemeContext
  render() {
    return <button style={{ backgroundColor: this.context }}>Click me</button>
  }
}

/**
 * For functional components we can use Context.Provider to access
 * context information and then use 'value'. 'value` argument is
 * populated by the value of closest ThemeContext element.
 * @returns
 */
function FunctionalThemedButton() {
  return (
    <ThemeContext.Consumer>
      {value => (
        <button style={{ backgroundColor: value }}>Functional: Click me</button>
      )}
    </ThemeContext.Consumer>
  )
}
