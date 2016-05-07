/* */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
/* */
import AuthBase from './_base';
import Login from './login';
import ForgotPassword from './forgot_password';
import PasswordReset from './password_reset';
/* */
module.exports = <Route component={AuthBase}>
  <IndexRoute component={Login} />
  <Route path={`forgot_password`} component={ForgotPassword} />
  <Route path={`password_reset`} component={PasswordReset} />
</Route>;
/* */
