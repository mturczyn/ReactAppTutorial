import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TestArea } from "./testArea.js";
import { boundFunctionsExample, anotherExampleOfBoundFunctions } from './languageSpecific.js'

boundFunctionsExample();
anotherExampleOfBoundFunctions();

ReactDOM.render(
  <TestArea />,
  document.getElementById('root')
);
