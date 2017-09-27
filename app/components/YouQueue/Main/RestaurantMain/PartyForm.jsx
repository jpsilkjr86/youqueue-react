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
			party_name: "",
			party_size: "",
			phone_number: "",
			email: "",
			first_name: "",
			last_name: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);

	} 

	handleChange(event) {
		
    const { value, name } = event.target;
    // sets state of whatever the input name is to the value of event object
    this.setState({
      [name]: value
    });

	}

	handleSubmitForm(event) {
		// console.log(this.state);
		// prevents default form behavior
    event.preventDefault();

    const party = this.state;
    // clears state data, triggering re-rendering of component to empty form
    this.setState({
      party_name: "",
			party_size: "",
			phone_number: "",
			email: "",
			first_name: "",
			last_name: ""
    });
    
    // call parent function from RestaurantMain.jsx 
    this.props.handleAddParty(party);


	}

  render() {
  	const { restaurant_id } = this.props;
  	return (
  		<FormContainer>
				<form id="new-customer" onSubmit={this.handleSubmitForm}>			                
					<div className="row">
					  <h5 className="center-align">Add Customer</h5>
					  <p className="right"><em>*Required input</em></p>
			      <div className="row" id="partyform-row-wrapper">
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">group</i>
			          <input
			          	id="party_name"
			          	type="text"
			          	className="validate"
			          	value={this.state.party_name}
			          	onChange={this.handleChange}
			          	required="required"
			          	name="party_name"
			          />
			          <label htmlFor="party_name">*Party Name</label>
			        </div>
			      	<div className="input-field col s12 m6">
			        	<i className="material-icons prefix">group</i>
			          <input
			          	id="party_size"
			          	type="number"
			          	className="validate"
			          	value={this.state.party_size}
			          	onChange={this.handleChange}
			          	required="required"
			          	name="party_size"
			          />
			          <label htmlFor="party_size">*Party Size</label>
			        </div>
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">phone</i>
			          <input
			          	id="phone_number"
			          	type="tel"
			          	className="validate"
			          	value={this.state.phone_number}
			          	onChange={this.handleChange}
			          	required="required"
			          	name="phone_number"
			          />
			          <label htmlFor="phone_number">*Telephone</label>
			        </div>
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">email</i>
			          <input
			          	id="email-new"
			          	type="email"
			          	className="validate"
			          	value={this.state.email}
			          	onChange={this.handleChange}
			          	required="required"
			          	name="email"
			          />
			          <label htmlFor="email">Email</label>
			        </div>
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">account_circle</i>
			          <input
			          	id="first_name"
			          	type="text"
			          	className="validate"
			          	value={this.state.first_name}
			          	onChange={this.handleChange}
			          	required="required"
			          	name="first_name"
			          />
			          <label htmlFor="first_name">*First Name</label>
			        </div>
			        <div className="input-field col s12 m6">
			          <i className="material-icons prefix">account_circle</i>
			          <input
			          	id="last_name"
			          	type="text"
			          	className="validate"
			          	value={this.state.last_name}
			          	onChange={this.handleChange}
			          	name="last_name"
			          />
			          <label htmlFor="last_name">Last Name</label>
			        </div>
			        
			        <div className="col s12 center">
			          <Link to="/" className="btn btn-large waves-effect waves-light red lighten-2 left">
			          	Cancel
			          </Link>
			          <button className="btn btn-large waves-effect waves-light right" type="submit">
			          	Submit
			          </button>
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