// imports react component classes
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// declares AuthRoute pure functional component, which will be this file's export
const AuthRoute = ({loggedIn, ...rest}) => (
	// if logged in, render this:
	loggedIn ? (
		<Route {...rest}/>
	// if not logged in, render this:
	) : (
		<Redirect to="/login"/>
	)
); // end of AuthRoute

// exports AuthRoute component for other files to use
export default AuthRoute;