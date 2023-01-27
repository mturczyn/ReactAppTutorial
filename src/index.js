import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TestArea } from "./testArea.js";
import { boundFunctionsExample } from './languageSpecific.js'

boundFunctionsExample();

ReactDOM.render(
  <TestArea />,
  document.getElementById('root')
);
