// imports react component classes
import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginCard from './Login/LoginCard.jsx';
import SignInModal from './Login/SignInModal.jsx';
import SignUpModal from './Login/SignUpModal.jsx';

// declares Login pure functional component, which will be this file's export
const Login = props => (
	props.loggedIn ? (
		<Redirect exact to="/"/>
	) : (
    <LoginCard>
      <SignInModal id="signin-modal" handleLogIn={props.handleLogIn}/>
      <SignUpModal id="signup-modal" handleSignUp={props.handleSignUp}/>
      <a
        className="btn btn-flat modal-trigger waves-effect waves-light"
        onClick={() => $('#signin-modal').modal('open')}
      >
        SIGN IN
      </a>
      <a
        className="btn btn-flat modal-trigger waves-effect waves-light"
        onClick={() => $('#signup-modal').modal('open')}
      >
        SIGN UP
      </a>
      <a
        className="btn btn-flat modal-trigger waves-effect waves-light"
        onClick={props.loginGuest}
      >
        GUEST
      </a>
    </LoginCard>
	)
);

// exports Login component for other files to use
export default Login;