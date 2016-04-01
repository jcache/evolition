import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Anon from          './views/anon/handler';
import SignedIn from      './views/signedin/handler';
import Base from          './base';

export default (
  <Route component={Base} path='/'>
    <Route path="/signedin" component={SignedIn} />
    <Route component={Anon} path='*' /> 
  </Route>
);
