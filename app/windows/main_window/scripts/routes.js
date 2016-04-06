import React from 'react';
import NotFound from      './components/notfound';
import Anon from          './views/anon/handler';
import SignedIn from      './views/signedin/handler';
import Base from          './base';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={Base}>
      <Route path="auth" component={Anon} />
      <Route path="signedin" component={SignedIn}/>
    </Route>
  </Router>
);

// REQUIRE AUTH METHOD
function requireAuth(nextState, replace) {
  if (true == true) {
    replace('/auth');
    ipc.send('resize-to-login');
  } else {
    //
  }
}
