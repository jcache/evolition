'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CharacterBase from './_base';
import CharacterList from './character_list';

module.exports = <Route path={`character_view`} component={CharacterBase}>
  <IndexRoute component={CharacterList} />
</Route>;
