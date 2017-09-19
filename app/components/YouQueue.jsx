// react dependencies
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// import child components
// import Main from './YouQueue/Main.jsx';
// import Header from './YouQueue/Header.jsx';
// import Login from './YouQueue/Login.jsx';
// import EnsureUserLogin from './YouQueue/EnsureUserLogin.jsx';

// declares YouQueue component as ES6 class, which will be this file's export.
// YouQueue will be the parent component that stores logged-in state,
// which is necessary info that will determine all other app behavior.
class YouQueue extends Component {
	constructor() {
		super();

		// set initial state
    this.state = { 
			loggedIn: false
		};

		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	handleLogIn() {
		this.setState({ loggedIn: true });
	}

	handleLogOut() {
		console.log(this.state);
		this.setState({ loggedIn: false });
	}

	render() {
		return (
	    <div>
	      Hello world!
	    </div>
		);
	}
}

// exports YouQueue component for other files to use
export default YouQueue;