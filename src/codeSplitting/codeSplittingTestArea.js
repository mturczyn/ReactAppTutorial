import React, { Suspense } from 'react'
import ErrorBoundary from './errorBoundary'

// For this the export must be default.
// By doing it this way, component is fetched from server
// only after showing it by clicking the button.
const ExampleComponent = React.lazy(() => import('./exampleComponent'))

// When stopping the server, before showing this component, upon trying
// showing it error is thrown, but due to ErrorBoundary, fallback component
// is shown instead of app crashing.
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
        <Suspense fallback={<h3>Loading component...</h3>}>
          <ExampleComponent />
        </Suspense>
      )}
      <button onClick={() => setShowNonExistingComponentState(x => !x)}>
        Toggle error component
      </button>
      {showNonExistingComponentState && (
        <ErrorBoundary>
          <Suspense fallback={<h3>Loading Another component...</h3>}>
            <AnotherExampleComponent />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}
