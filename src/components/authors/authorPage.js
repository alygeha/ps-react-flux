"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorList');

var Authors = React.createClass({
    getInitialState: function(){
        return {
            authors: AuthorStore.getAllAuthors()
        };
    },

    componentWillMount: function() {
        AuthorStore.addChangeListener(this._onChange);
    },

    componentWillUnMount: function() {
        AuthorStore.removeChangeListener(this._onChange); 
    },

    _onChange: function() {
        debugger;
        this.setState({ authors: AuthorStore.getAllAuthors() });
    },

    // componentDidMount: function(){
    //     if(this.isMounted()){ //best practice
    //         this.setState({ authors: AuthorApi.getAllAuthors() });
    //     }
    // },

    render: function(){        
       return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors}/>
            </div>
       );
    }
});

module.exports = Authors;