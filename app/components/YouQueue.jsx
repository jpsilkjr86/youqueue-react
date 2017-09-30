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
			userId: null,
			user: null
		};

		this.handleLogOut = this.handleLogOut.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.loginGuest = this.loginGuest.bind(this);
		this.signupGuest = this.signupGuest.bind(this);
	}

	componentDidMount() {
		// checks authentication status through axios get request
		axios.get('/login/checkauth').then(({data}) => {
			if (data.isLoggedIn) {
				this.setState({
					loggedIn: true,
					userType: data.user.usertype,
					userId: data.user._id,
					user: data.user
				});
			}
		}).catch(err => {
			console.log(err);
		});
	}

	handleLogOut() {
		axios.post('/logout').then(({data}) => {
			console.log(data);
			this.setState({
				loggedIn: false,
				userType: null,
				userId: null,
				user: null
			});
		}).catch(err => {
			console.log(err);
		});
	}

	handleLogIn(user, usertype) {
		axios.post(`/login/${usertype}`, user).then(({data}) => {
			if (!data.user) {
				return console.log('Login failed');
			}
			this.setState({
				loggedIn: true,
				userType: usertype,
				userId: data.user._id,
				user: data.user
			});
		}).catch(err => {
			console.log(err);
		});			
	}

	handleSignUp(user, usertype) {
		axios.post('/signup/restaurant', user).then(({data}) => {
			if (!data.user) {
				return console.log('Signup failed');
			}
			this.setState({
				loggedIn: true,
				userType: 'restaurant',
				userId: data.user._id,
				user: data.user
			});
		}).catch(err => {
			console.log(err);
		});
	}

	loginGuest() {
		const user = {
			email: 'guest@g.com',
			password: 'guest'
		};
		axios.post('/login/restaurant', user).then(({data}) => {
			if (!data.user) {
				return console.log('Login failed');
			}
			this.setState({
				loggedIn: true,
				userType: 'restaurant',
				userId: data.user._id,
				user: data.user
			});
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
		axios.post('/signup/restaurant', user).then(({data}) => {
			if (!data.user) {
				return console.log('Signup failed');
			}
			this.setState({
				loggedIn: true,
				userType: 'restaurant',
				userId: data.user._id,
				user: data.user
			});
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
			      		handleLogIn={this.handleLogIn}
			      		handleSignUp={this.handleSignUp}
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