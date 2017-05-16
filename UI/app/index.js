var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  routes,
  document.getElementById('app')
);
