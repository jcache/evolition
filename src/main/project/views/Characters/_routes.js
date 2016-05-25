'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CharacterContainer from '../../containers/CharacterContainer';
import List from './list';

module.exports = <Route path={`character_view`} component={CharacterContainer}>
  <IndexRoute component={List} />
</Route>;
