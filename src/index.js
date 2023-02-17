import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { TestAreaMainPage } from './testArea.js'
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
import SectionedHeaders from './passingContext/headersSections'
import ErrorWidget from './errorBoundaries/errorBoundaryExample'
import RefForwardingTestArea from './forwardingRefs/refForwarding'
import HocLogButtonProps from './HigherOrderComponents/hocExamples'

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

const availablePages = [
  {
    path: 'DataTable',
    element: <ExampleDataTable size={200} />,
  },
  {
    path: 'MailingApp',
    element: <MailApp />,
  },
  {
    path: 'Accessibility',
    element: <AccessibilityTestArea />,
  },
  {
    path: 'mouseAndPointersEvents',
    element: <MouseAndPointerEventsTestArea />,
  },
  {
    path: 'codeSplitting',
    element: <ComponentWithLazyLoadedImportOfChild />,
  },
  {
    path: 'contextPassing',
    element: <ComponentWithContext />,
  },
  {
    path: 'SectionedHeaders',
    element: <SectionedHeaders />,
  },
  {
    path: 'ErrorWidget',
    element: <ErrorWidget />,
  },
  {
    path: 'RefForwardingTestArea',
    element: <RefForwardingTestArea />,
  },
  {
    path: 'HocLogButtonProps',
    element: <HocLogButtonProps />,
  },
]

const mainPage = {
  path: '*',
  element: <TestAreaMainPage availablePages={availablePages} />,
}

ReactDOM.render(
  <DocumentTitle title='Learning React'>
    <BrowserRouter>
      <SuspenseWrapper>
        <Routes>
          {[...availablePages, mainPage].map(x => (
            <Route
              path={x.path}
              element={x.element}
            />
          ))}
        </Routes>
      </SuspenseWrapper>
    </BrowserRouter>
  </DocumentTitle>,
  document.getElementById('root')
)
