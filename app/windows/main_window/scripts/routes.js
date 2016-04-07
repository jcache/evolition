import React from 'react';
import NotFound from './components/notfound';
import Anon from './views/anon/handler';
import SignedIn from './views/signedin/handler';
import Base from './base';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
const CharacterView  = require('./views/signedin/character/character_view/handler');
const CharacterAdd  = require('./views/signedin/character/character_add/handler');
const Welcome  = require('./views/signedin/welcome/handler');

export default (
  <Router history={browserHistory}>
    <Route path='/' component={Base}>
      <Route path="/auth" component={Anon} />
      <Route path="/signedin" component={SignedIn}>
        <Route path="/signedin/welcome" component={Welcome} />
        <Route path="/signedin/character-view" component={CharacterView} />
        <Route path="/signedin/character-add" component={CharacterAdd} />
      </Route>
      <Route component={Anon} onEnter={requireAuth} path='*'/>
    </Route>
  </Router>
);

// REQUIRE AUTH METHOD
function requireAuth(nextState, replace) {
  replace('/auth');
  ipc.send('resize-to-login');
}
