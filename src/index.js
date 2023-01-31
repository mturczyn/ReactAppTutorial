import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TestArea } from "./testArea.js";
import { boundFunctionsExample, anotherExampleOfBoundFunctions, boundingExamples, argsExample } from './languageSpecific.js'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { MailApp } from './MailingApp/MailAppComponent'

boundFunctionsExample();
anotherExampleOfBoundFunctions();
boundingExamples();
argsExample();

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path='MailingApp' element={<MailApp />} />
        <Route path='*' element={<TestArea />} />
      </Routes>
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);

// function NavigateButton(props) {
//   const navigate = useNavigate();
//   return (
//     <BrowserRouter>
//       <button onClick={() => navigate(props.relativePath)}>Open mailing app</button>
//     </BrowserRouter>
//   )
// }