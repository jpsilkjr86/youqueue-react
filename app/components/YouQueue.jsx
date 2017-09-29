// imports react component classes
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import children components
import Main from './YouQueue/Main.jsx';
import Header from './YouQueue/Header.jsx';
import Login from './YouQueue/Login.jsx';
import Footer from './YouQueue/Footer.jsx';
import MainContainer from './YouQueue/MainContainer.jsx';

// imports axios for http requests
import axios from 'axios';

// declares YouQueue component as ES6 class, which will be this file's export.
// YouQueue will be the parent component that stores logged-in state,
// which is necessary info that will determine all other app behavior.
class YouQueue extends Component {
	constructor() {
		super();

		// set initial state
    this.state = { 
			loggedIn: false,
			userType: null,
			userId: null
		};

		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.loginGuest = this.loginGuest.bind(this);
		this.signupGuest = this.signupGuest.bind(this);
	}

	handleLogIn() {
		this.setState({ 
			loggedIn: true,
			userType: 'restaurant',
			userId: 'test'
		});
	}

	handleLogOut() {
		console.log(this.state);
		this.setState({ 
			loggedIn: false,
			userType: null,
			userId: null
		});
	}

	loginGuest() {
		const user = {
			email: 'guest@g.com',
			password: 'guest'
		};
		axios.post('/login/restaurant', user).then(response => {
			console.log(response);
		}).catch(err => {
			console.log(err);
		});
	}

	signupGuest() {
		const user = {
			email: 'guest@g.com',
			password: 'guest',
			first_name: 'jane',
			last_name: 'doe',
			restaurant_name: 'Do-Re-Mi Guest Bistro',
			phone_number: '5555555555',
			default_sms: 'some message'
		};
		axios.post('/signup/restaurant', user).then(response => {
			console.log(response);
		}).catch(err => {
			console.log(err);
		});
	}

	render() {
		return (
	    <div>
	      <Header 
	      	logIn={this.handleLogIn}
	      	logOut={this.handleLogOut}
	      	loggedIn={this.state.loggedIn}
	      	userType={this.state.userType}
	      	userId={this.state.userId}	      	
	      />
	      <MainContainer>
		      <Switch>
			      <Route exact path="/login" render={props => 
			      	<Login
			      		logIn={this.handleLogIn}
			      		loggedIn={this.state.loggedIn}
			      		loginGuest={this.loginGuest}
			      		signupGuest={this.signupGuest}
			      	/>
			      }/>
			    	{/* This route ensures user is logged in before rendering anything in Main*/}
			      <Route path="/" render={props => (
					    this.state.loggedIn ? (
					      <Main {...props}
					      	loggedIn={this.state.loggedIn}
					      	userType={this.state.userType}
					      	userId={this.state.userId}
					      />
					    ) : (
					      <Redirect exact to="/login"/>
					    )
					  )}/>
					</Switch>
				</MainContainer>
			  <Footer/>
	    </div>
		);
	}
}

// exports YouQueue component for other files to use
export default YouQueue;