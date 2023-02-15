import React from 'react'
import ErrorBoundary from './errorBoundary'
import SuspenseWrapper from './suspenseWrappers'

/**
 * For this the export must be default.
 * If the module isn't exported as default, we must create intermediate
 * module and make it default there:
 * export { MyComponent as dafult } from './myComponent'
 * By doing it this way, component is fetched from server
 * only after showing it by clicking the button.
 */
const ExampleComponent = React.lazy(() => import('./exampleComponent'))

/**
 * When stopping the server, before showing this component, upon trying
 * showing it error is thrown, but due to ErrorBoundary, fallback component
 * is shown instead of app crashing.
 */
const AnotherExampleComponent = React.lazy(() =>
  import('./anotherExampleComponent')
)

export default function ComponentWithLazyLoadedImportOfChild() {
  const [showComponentState, setShowComponentState] = React.useState(false)
  const [showNonExistingComponentState, setShowNonExistingComponentState] =
    React.useState(false)
  return (
    <div>
      <button onClick={() => setShowComponentState(x => !x)}>
        Toggle component
      </button>
      {showComponentState && (
        <SuspenseWrapper message='Loading component...'>
          <ExampleComponent />
        </SuspenseWrapper>
      )}
      <button onClick={() => setShowNonExistingComponentState(x => !x)}>
        Toggle error component
      </button>
      {showNonExistingComponentState && (
        <ErrorBoundary>
          <SuspenseWrapper message='Loading Another component...'>
            <AnotherExampleComponent />
          </SuspenseWrapper>
        </ErrorBoundary>
      )}
    </div>
  )
}
