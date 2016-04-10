import React from 'react';
import NotFound from './components/notfound';
import Anon from './views/anon/handler';
import SignedIn from './views/signedin/handler';
import Base from './base';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
const Characters   = require('./views/signedin/characters/handler');
const AllCharacters   = require('./views/signedin/characters/list-all');
const CharacterView   = require('./views/signedin/characters/character_view/handler');
const CharacterAdd    = require('./views/signedin/characters/character_add/handler');
const CharacterEdit    = require('./views/signedin/characters/character_edit/handler');
const Welcome         = require('./views/signedin/welcome/handler');

export default (
  <Router history={browserHistory}>
    <Route path='/' component={Base}>
      <Route path="auth" component={Anon} />
      <Route path="signedin" component={SignedIn}>
        <IndexRoute component={Welcome} />
        <Route path="characters" component={Characters}>
          <IndexRoute component={AllCharacters}/>
          <Route path="view/:id" component={CharacterView} />
          <Route path="add/:id" component={CharacterAdd} />
          <Route path="edit/:id" component={CharacterEdit} />
        </Route>
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
