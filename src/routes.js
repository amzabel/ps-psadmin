"use strict";

var React = require('react');
var Router = require('react-router');
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
    <Route name="app" path="/" handler={require('./app')}>
        <DefaultRoute handler={require('./components/homePage')} />
        <Route name="authors" handler={require('./components/authors/authorPage')} />
        <Route name="about" handler={require('./components/about/aboutPage')} />
        <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')} />        
        <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')} />                
        <NotFoundRoute handler={require('./components/notFoundPage')}></NotFoundRoute>
        <Redirect from="about-us" to="about" />
        <Redirect from="about/*" to="about" />
        <Redirect from="awthurs" to="authors" />        
    </Route>);


module.exports = routes;