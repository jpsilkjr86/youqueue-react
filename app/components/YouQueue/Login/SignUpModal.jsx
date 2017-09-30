// imports react component classes
import React from 'react';

// imports Modal from materialize
import { Modal } from 'react-materialize';

// pure functional component, only job is to decide whether to render a form or not
const SignUpModal = props => (
	
	<Modal 
		id={props.id}
		header="Create New Account"
		actions={
			<div>
				<p className="left required-fields"><i>*All Fields Required</i></p>
				<button className="btn btn-flat waves-effect waves-light right" type="submit">Submit</button>
			</div>
		}
		fixedFooter={true}
	>
		<form id="new-account">
      <div className="row">
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">account_circle</i>
          <input id="first_name" type="text" className="validate" required="required" name="first_name"/>
          <label htmlFor="first_name">*First Name</label>
        </div>
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">account_circle</i>
          <input id="last_name" type="text" className="validate" required="required" name="last_name"/>
          <label htmlFor="last_name">*Last Name</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">business</i>
          <input id="company_name" type="text" className="validate" required="required" name="company_name"/>
          <label htmlFor="company_name">*Company Name</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">phone</i>
          <input id="phone_number" type="tel" className="validate" required="required" name="phone_number"/>
          <label htmlFor="phone_number">*Telephone</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">email</i>
          <input id="email-new" type="email" className="validate" required="required" name="email"/>
          <label htmlFor="email">*Email</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">security</i>
          <input id="password-new" type="password" className="validate" required="required" name="password"/>
          <label htmlFor="password">*Password</label>
        </div>
      </div>
	  </form>
	</Modal>

);

// exports SignUpModal component for other files to use
export default SignUpModal;