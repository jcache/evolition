import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV === 'development') {
  var App  = require('./project/app-dev');
} else {
  var App  = require('./project/app-prod');
}
  ReactDOM.render(<App />, document.getElementById('mount'));
