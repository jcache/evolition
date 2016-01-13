"use strict";

import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {

  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action,
    });
  }

  handleServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action,
    });
  }
}

const evDispatcher = new DispatcherClass();

export default evDispatcher;
