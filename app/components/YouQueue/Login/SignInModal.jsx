// imports react component classes
import React from 'react';

// imports Modal from materialize
import { Modal } from 'react-materialize';

// pure functional component, only job is to decide whether to render a form or not
const SignInModal = props => (

	<Modal 
		id={props.id}
		header="Sign In"
		actions={null}>
		<form id="sign-in">
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">email</i>
          <input id="email-existing" type="email" className="validate" required="required" name="email"/>
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">security</i>
          <input id="password-existing" type="password" className="validate" required="required" name="password"/>
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <button className="btn waves-effect waves-light right" type="submit">Submit</button>
	  </form>
	</Modal>

);

// exports SignInModal component for other files to use
export default SignInModal;