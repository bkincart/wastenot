import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';

import routes from './routes';

let reactAppRender = (element) => {
  ReactDOM.render(
    <Router history={browserHistory} routes={routes} />,
    element
  );
};

$(function() {
  let reactApp = document.getElementById('app');
  if (reactApp) {
    reactAppRender(reactApp);
  }
});
