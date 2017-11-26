// imports react component classes
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import children components
import Main from './YouQueue/Main.jsx';
import Header from './YouQueue/Header.jsx';
import Login from './YouQueue/Login.jsx';
import Footer from './YouQueue/Footer.jsx';
import MainContainer from './YouQueue/MainContainer.jsx';
import AuthRoute from './YouQueue/AuthRoute.jsx';
import LoadingContainer from './YouQueue/LoadingContainer.jsx';
import Loading from './YouQueue/Loading.jsx';

// imports supplementary AlertContainer component from react-alert
import AlertContainer from 'react-alert';

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
			user: null,
			// for react-alert component
			alertOptions: {
		    offset: 14,
		    position: 'top right',
		    theme: 'light',
		    time: 5000,
		    transition: 'scale'
		  },
		  // boolean for triggering loading animation
		  isCheckingLoginStatus: true
		};

		this.handleLogOut = this.handleLogOut.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.loginGuest = this.loginGuest.bind(this);
		this.signupGuest = this.signupGuest.bind(this);
	}

	componentDidMount() {
		// mininum time for loading gif to be recognized before performing ajax request
		// (can be removed of changed as needed)
		// saved as this.timeout so we can clear it later.
		this.timeout = setTimeout(() => {

			// checks authentication status through axios get request
			axios.get('/login/checkauth').then(({data}) => {
				if (data.isLoggedIn) {
					this.setState({
						// sets user data as state
						loggedIn: true,
						userType: data.user.usertype,
						userId: data.user._id,
						user: data.user,
						// sets isCheckingLoginStatus to false to stop loading animation
						isCheckingLoginStatus: false
					});
					this.msg.success(data.flash.message);
				}
				else {
					this.setState({
						// sets isCheckingLoginStatus to false to stop loading animation
						isCheckingLoginStatus: false
					});
				}
			}).catch(err => {
				this.msg.error('Error checking authorization.');
				// sets isCheckingLoginStatus to false to stop loading animation
				this.setState({
					isCheckingLoginStatus: false
				});
			});

		}, 700);
	}

	// clear the timeout if it exists before unmounting to avoid setting state
	// of unmounted components
	componentWillUnmount() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
	}

	handleLogOut() {
		axios.post('/logout').then(({data}) => {
			this.setState({
				loggedIn: false,
				userType: null,
				userId: null,
				user: null
			});
			this.msg.success(data.flash.message);
		}).catch(err => {
			this.msg.error('Error signing out.');
		});
	}

	handleLogIn(user, usertype) {
		axios.post(`/login/${usertype}`, user).then(({data}) => {
			if (!data.user) {
				return this.msg.error(data.flash.message);
			}
			this.setState({
				loggedIn: true,
				userType: usertype,
				userId: data.user._id,
				user: data.user
			});
			this.msg.success(data.flash.message);
		}).catch(err => {
			this.msg.error('Error signing in.');
		});			
	}

	handleSignUp(user, usertype) {
		axios.post('/signup/restaurant', user).then(({data}) => {
			if (!data.user) {
				return this.msg.error(data.flash.message);
			}
			this.setState({
				loggedIn: true,
				userType: 'restaurant',
				userId: data.user._id,
				user: data.user
			});
			this.msg.success(data.flash.message);
		}).catch(err => {
			this.msg.error('Error creating new user.');
		});
	}

	loginGuest() {
		const user = {
			email: 'guest@g.com',
			password: 'guest'
		};
		axios.post('/login/restaurant', user).then(({data}) => {
			if (!data.user) {
				return this.msg.error(data.flash.message);
			}
			this.setState({
				loggedIn: true,
				userType: 'restaurant',
				userId: data.user._id,
				user: data.user
			});
			this.msg.success(data.flash.message);
		}).catch(err => {
			this.msg.error('Error signing in.');
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
				return this.msg.error(data.flash.message);
			}
			this.setState({
				loggedIn: true,
				userType: 'restaurant',
				userId: data.user._id,
				user: data.user
			});
			this.msg.success(data.flash.message);
		}).catch(err => {
			this.msg.error('Error creating new user.');
		});
	}

	render() {
		return (
	    <div>
				{/* AlertContainer component at top for rendering react-alert */}
				<AlertContainer ref={a => this.msg = a} {...this.state.alertOptions} />
	      <Header
	      	logIn={this.handleLogIn}
	      	logOut={this.handleLogOut}
	      	loggedIn={this.state.loggedIn}
	      	userType={this.state.userType}
	      	userId={this.state.userId}
	      />
	      <MainContainer>
	      	<LoadingContainer
	      		isLoading={this.state.isCheckingLoginStatus}
	      		renderLoading={() => <Loading text="Please wait..."/>}
	      	>
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
				      <AuthRoute path="/" loggedIn={this.state.loggedIn} render={props => (
					      <Main {...props}
					      	userType={this.state.userType}
					      	userId={this.state.userId}
					      />
						  )}/>
						</Switch>
					</LoadingContainer>
				</MainContainer>
			  <Footer/>
	    </div>
		);
	}
}

// exports YouQueue component for other files to use
export default YouQueue;