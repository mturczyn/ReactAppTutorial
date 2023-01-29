import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TestArea } from "./testArea.js";
import { boundFunctionsExample, anotherExampleOfBoundFunctions, boundingExamples, argsExample } from './languageSpecific.js'

boundFunctionsExample();
anotherExampleOfBoundFunctions();
boundingExamples();
argsExample();

ReactDOM.render(
  <TestArea />,
  document.getElementById('root')
);
