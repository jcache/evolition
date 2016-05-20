import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV === 'development') {
  var AppDev  = require('./project/app-dev');
  ReactDOM.render(<AppDev />, document.getElementById('mount'));
} else {
  var AppProd  = require('./project/app-prod');
  ReactDOM.render(<AppProd />, document.getElementById('mount'));
}
