// imports React Component class
import React from 'react';
import { Redirect } from 'react-router-dom';

// declares Login component as ES6 class, which will be this file's export
const Login = props => {

	return (
		props.loggedIn ? (
			<Redirect exact to="/"/>
		) : (
	  	<main className="container">
		    Welome - please sign in.
	    </main>
		)
  );
};

// exports Login component for other files to use
export default Login;