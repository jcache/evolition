'use strict';
const path = require('path');
const electron = require('electron');
import {  crashReporter} from "electron";

crashReporter.start(
  {
    productName: 'EVOLITION',
    companyName: 'evolition.io',
    submitURL: 'http://evolition.io',
    autoSubmit: true,
  }
);
