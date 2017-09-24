"use strict";
//$ = jQuery = require("jquery");//we dont use "use strict" because this variable to be global; but this is caught by lint
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();
Router.run(routes, function(Handler){ //Router.HistoryLocation
    React.render(<Handler/>, document.getElementById('app'));
});