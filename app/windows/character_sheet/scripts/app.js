'use strict';

const React = require('react');
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

let Index = require('./components/index.js');

render((
  <Router history={browserHistory}>
    <Route path="*" component={Index}/>
  </Router>
), document.getElementById('content'))
