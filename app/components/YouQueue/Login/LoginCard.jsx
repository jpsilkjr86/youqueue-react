// imports react component classes
import React from 'react';
import { Redirect } from 'react-router-dom';

// declares LoginCard pure functional component, which will be this file's export
const LoginCard = props => (
  <div className="row">
    <div className="col s10 offset-s1 m8 offset-m2">
      <div className="card z-depth-4 orange lighten-4" id="signin-card">
        <div className="card-content black-text center-align">
          <h1 className="card-title">Welcome to<br/>You-Queue!</h1>
        </div>
        <div className="card-action center-align">
          {props.children}
        </div>
      </div>
    </div>
	</div>
);

// exports LoginCard component for other files to use
export default LoginCard;