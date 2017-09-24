"use strict";

var React = require('react');
var Router = require('react-router'); //to use mixins
var AuthorForm = require('./authorForm');
//var AuthorApi = require('../../api/authorApi'); //replaced by authorActions
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    
    statics: {
        willTransitionFrom: function(transition, component){
            if(component.state.dirty && !confirm('leave without saving?')){
                transition.abort();
            }      
        }
    },

    getInitialState: function(){
        return {
            author: { id: '', firstName: '', lastName: '' },
            errors: {}
        };
    },

    componentWillMount: function(){
        var authorId = this.props.params.id; // from the path '/author:id' passed by react-router into params
        
        if(authorId){
            this.setState({author: AuthorStore.getAuthorById(authorId)});
        }
    },

    setAuthorState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        this.setState({author: this.state.author});
    },

    authorFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors

        if(this.state.author.firstName.length < 3){
            this.state.errors.firstName = 'First name must be at least 3 characters';
            formIsValid = false;
        }

        
        if(this.state.author.lastName.length < 3){
            this.state.errors.lastName = 'Last name must be at least 3 characters';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});

        return formIsValid;
    },

    saveAuthor: function(event){
        event.preventDefault(); //this prevent the default brower submit
        
        if(!this.authorFormIsValid()){
            return;
        }
        
        if(this.state.author.id) {
            AuthorActions.updateAuthor(this.state.author);
         } else {
            AuthorActions.createAuthor(this.state.author);
         }
        this.setState({dirty: false});
        toastr.success('Author saved');
        this.transitionTo('authors'); //transition to authors after a author save
    },

    render: function(){
        return (           
            <AuthorForm 
                author={this.state.author}
                onChange={this.setAuthorState} 
                onSave={this.saveAuthor} 
                errors={this.state.errors} />            
        );
    }
});

module.exports = ManageAuthorPage;