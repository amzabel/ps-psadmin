"use strict";
var React = require('react');

var About = React.createClass({
    statics: {
        willTransitionTo: function (transition, params, query, callback) {
            console.log(transition);
            if (!confirm('Are you sure you want to read a page that\'s this boring')) {
                //transition.about();
            } else { callback(); }
        },
        willTransitionFrom: function (transition, component) {            
            if (!confirm('Are you sure you want to leave a page that\'s this excitiong')) {
                transition.abort();
            } 
        }
    },
    render: function () {
        return (
            <div className="container">
                <h1>About</h1>
                <p>
                    This Appliction uses the following technologies:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                        <li>Node</li>
                        <li>Gulp</li>
                        <li>Browserify</li>
                        <li>Bootstrap</li>
                    </ul>
                </p>
            </div>);
    }
});

module.exports = About;