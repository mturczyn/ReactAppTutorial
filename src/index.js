import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { TestArea } from './testArea.js'
import {
  boundFunctionsExample,
  anotherExampleOfBoundFunctions,
  boundingExamples,
  argsExample,
  computedPropertiesExample,
} from './languageSpecific.js'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { MailApp } from './MailingApp/MailAppComponent'
import { ExampleDataTable } from './dataTableWithFragments'
import { AccessibilityTestArea } from './accessibility'
import DocumentTitle from 'react-document-title'
import SuspenseWrapper from './codeSplitting/suspenseWrappers'
import ComponentWithContext from './passingContext/deeplyNestedComponents'

/**
 * One of the good ways to start and maintain code splitting is
 * to split on Routes - so you load specific page when it's
 * actually navigated to.
 */
const MouseAndPointerEventsTestArea = React.lazy(() =>
  import('./mouseAndPointersEvents')
)
const ComponentWithLazyLoadedImportOfChild = React.lazy(() =>
  import('./codeSplitting/codeSplittingTestArea')
)

boundFunctionsExample()
anotherExampleOfBoundFunctions()
boundingExamples()
argsExample()
computedPropertiesExample()

ReactDOM.render(
  <DocumentTitle title='Learning React'>
    <BrowserRouter>
      <SuspenseWrapper>
        <Routes>
          <Route
            path='DataTable'
            element={<ExampleDataTable size={200} />}
          />
          <Route
            path='MailingApp'
            element={<MailApp />}
          />
          <Route
            path='Accessibility'
            element={<AccessibilityTestArea />}
          />
          <Route
            path='mouseAndPointersEvents'
            element={<MouseAndPointerEventsTestArea />}
          />
          <Route
            path='codeSplitting'
            element={<ComponentWithLazyLoadedImportOfChild />}
          />
          <Route
            path='contextPassing'
            element={<ComponentWithContext />}
          />
          <Route
            path='*'
            element={<TestArea />}
          />
        </Routes>
      </SuspenseWrapper>
    </BrowserRouter>
  </DocumentTitle>,
  document.getElementById('root')
)
