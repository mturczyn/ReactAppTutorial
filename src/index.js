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

boundFunctionsExample()
anotherExampleOfBoundFunctions()
boundingExamples()
argsExample()
computedPropertiesExample()

ReactDOM.render(
  <div>
    <BrowserRouter>
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
          path='*'
          element={<TestArea />}
        />
      </Routes>
    </BrowserRouter>
  </div>,
  document.getElementById('root')
)
