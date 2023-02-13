import React from 'react'

/*
A class component becomes an error boundary if it defines either (or both)
of the lifecycle methods static getDerivedStateFromError() or componentDidCatch().
Use static getDerivedStateFromError to render a fallback UI after an error has
been thrown. Use componentDidCatch() to log error information.

Error boundaries work like a catch block, but for components.
Only class components can be error boundaries.
*/

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
    alert(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
