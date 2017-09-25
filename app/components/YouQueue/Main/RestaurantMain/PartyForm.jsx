// imports react component classNamees
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// imports children components
import FormContainer from '../FormContainer.jsx';

// declares PartyForm component as stateful class component, which will be this file's export.
class PartyForm extends Component {

	constructor(props) {
		super(props);

		// set initial state
	  this.state = { 
			
		};
	} 

  render() {
  	const { restaurant_id } = this.props;
  	return (
  		<FormContainer>
				<form id="new-customer" action="/customer/add" method="post">			                
					<div className="row">
					  <h5 className="center-align">Add Customer</h5>
					  <p className="right"><em>*Required input</em></p>
			      <div className="row" id="partyform-row-wrapper">
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">group</i>
			          <input id="party_name" type="text" className="validate" required="required" name="party_name"/>
			          <label htmlFor="party_name">*Party Name</label>
			        </div>
			      	<div className="input-field col s12 m6">
			        	<i className="material-icons prefix">group</i>
			          <input id="party_size" type="number" className="validate" required="required" name="party_size"/>
			          <label htmlFor="party_size">*Party Size</label>
			        </div>
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">phone</i>
			          <input id="phone_number" type="tel" className="validate" required="required" name="phone_number"/>
			          <label htmlFor="phone_number">*Telephone</label>
			        </div>
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">email</i>
			          <input id="email-new" type="email" className="validate" required="required" name="email"/>
			          <label htmlFor="email">Email</label>
			        </div>
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">account_circle</i>
			          <input id="first_name" type="text" className="validate" required="required" name="first_name"/>
			          <label htmlFor="first_name">*First Name</label>
			        </div>
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">account_circle</i>
			          <input id="last_name" type="text" className="validate" name="last_name"/>
			          <label htmlFor="last_name">Last Name</label>
			        </div>
			        <div className="input-field col s12">
			          <i className="material-icons prefix">event</i>
			          <select multiple name="occasion" form="new-customer" required>
			            <option value="" disabled selected>*Choose one or more occasion.</option>
			            <option value="casual dining">Casual Dining</option>
			            <option value="birthday">Birthday</option>
			            <option value="wedding anniversary">Wedding Anniversary</option>
			            <option value="family gathering">Family Gathering</option>
			            <option value="other">Other</option>
			          </select>
			          <label htmlFor="occasion">*Occasion</label>
			        </div>
			        <div className="col s12 center">
			          <Link to="/" className="btn btn-large waves-effect waves-light red lighten-2 left">Cancel</Link>
			          <button className="btn btn-large waves-effect waves-light right" type="submit">Submit</button>
			        </div>                                
			  		</div> 
					</div>
				</form>
			</FormContainer>
		);
	}
}

// exports PartyForm component for other files to use
export default PartyForm;