import React from 'react'

/**
 * Error boundaries are React components that are meant to
 * intercept, hadne and log errors that happen beneath them in visual tree.
 * They also accept as their property fallback UI.
 * They DO NOT catch errors taht happen in:
 * - event handlers
 * - asyncronous code (e.g. setTimeout)
 * - server side rendering
 * - errors thrown in the error boundary itself, they handle only
 *   errors that happen "beneath" them
 *
 * A component becomes error boundary if it defines either (or both)
 * of the lifecycle methods:
 * static getDerivedStateFromError() - this is used to render fallback UI
 * componentDidCatch() - this is used to log information about error
 * Only class components can be error boundaries.
 */

class ExceptionalSituationsHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state, so render method knows what to render
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    alert('ERROR CAUGHT! ' + JSON.stringify(errorInfo))
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

function MustBeLessThan(props) {
  const counterCrash = props.maxValue ?? 5
  const [counter, setCounter] = React.useState(0)

  if (counter >= counterCrash) {
    throw new Error('Counter exceeded allowed value of ' + counterCrash)
  }

  return (
    <div>
      <h2>Error boundary example</h2>
      <p>
        When the counter reach {counterCrash}, component will crash and error
        boundary will come into play!
      </p>
      <h2>{counter + ' < ' + counterCrash}</h2>
      <button onClick={() => setCounter(x => x + 1)}>Increase counter</button>
    </div>
  )
}

export default function ErrorWidget() {
  return (
    <ExceptionalSituationsHandler>
      <MustBeLessThan maxValue={10} />
    </ExceptionalSituationsHandler>
  )
}
