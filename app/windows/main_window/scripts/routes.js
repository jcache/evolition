import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import NotFound from      './components/notfound';
import Anon from          './views/anon/handler';
import SignedIn from      './views/signedin/handler';
import Base from          './base';
import { RelayRouter } from 'react-router-relay';

function requireAuth (nextState, replace) {
  if (true == true) {
    replace('/auth');
    ipc.send('resize-to-login');
  } else {

  }
}

export default (
  <Router history={browserHistory}>
    <Route component={Base} path='/'>
      <Route path="/auth" component={Anon} />
      <Route path="/signedin" component={SignedIn}/>
      <Route component={NotFound} onEnter={requireAuth} path='*' />
    </Route>
  </Router>
);
