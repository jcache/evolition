'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import IntroBase from './_base';
import Welcome from './welcome';

module.exports = <Route path={`intro`} component={IntroBase}>
  <IndexRoute component={Welcome} />
</Route>;
