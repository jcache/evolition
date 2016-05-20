import React from 'react';
import { Route } from 'react-router';
import Base from './base';

module.exports =
<Route path={`/`} component={Base}>
  {require('./Auth/_routes')}
  {require('./Characters/_routes')}
  {require('./Dashboard/_routes')}
  {require('./Intro/_routes')}
</Route>;
