// imports react component classes
import React from 'react';
import { Redirect } from 'react-router-dom';

// declares Login pure functional component, which will be this file's export
const Login = props => (
	props.loggedIn ? (
		<Redirect exact to="/"/>
	) : (
    <div className="row">
	    <div className="col s10 offset-s1 m8 offset-m2">
        <div className="card z-depth-4 orange lighten-4" id="signin-card">
          <div className="card-content black-text center-align">
            <h2 className="card-title">Welcome to<br/>You-Queue</h2>
          </div>
          <div className="card-action center-align">
            <a className="btn btn-flat modal-trigger waves-effect waves-light" data-target="signin-modal">SIGN IN</a>
            <a className="btn btn-flat modal-trigger waves-effect waves-light" data-target="newuser-modal">NEW USER</a>
          </div>
        </div>
	    </div>
		</div>
	)
);

// exports Login component for other files to use
export default Login;