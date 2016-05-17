'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import DashboardBase from './_base';
import Dashboard from './dashboard';

module.exports = <Route path={`dashboard`} component={DashboardBase}>
  <IndexRoute component={Dashboard} />
</Route>;
