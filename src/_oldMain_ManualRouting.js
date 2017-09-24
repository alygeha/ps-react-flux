$ = jQuery = require("jquery");//we dont use "use strict" because this variable to be global; but this is caught by lint
var React = require('react');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');
var Authors = require('./components/authors/authorPage');


// var App = console.log("Hello world from Browserify");

// module.exports = App;
(function (win) { //we user this iife to create a scope bloc whthin it we can use "strict" mode
    "use strict";
    var App = React.createClass({
        render: function () {
            var Child;

            switch (this.props.route) {
                case 'about': Child = About;
                    break;
                case 'authors': Child = Authors;
                break;
                default: Child = Home;
            }
            return (
                <div>
                    <Header/>
                    <Child />
                </div>
            );
        }
    });

    function render() {
        var route = win.location.hash.substr(1);
        React.render(<App route={route} />, document.getElementById('app'));
    }

    win.addEventListener('hashchange', render); //an event listener to watch a hash style url changing (page changing)
    render(); //the default call to render
})(window);
