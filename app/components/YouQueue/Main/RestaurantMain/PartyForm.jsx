// imports react component classNamees
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

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
			last_name: "",
			fireRedirect: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);

	} 

	// general handler for input value changes
	handleChange(event) {
		
    const { value, name } = event.target;
    // sets state of whatever the input name is to the value of event object
    this.setState({
      [name]: value
    });

	}

	// specifically handles phone number input changes
	handlePhoneChange(event) {
		// console.log(event.target);
		const { value } = event.target;

		// if the input value has 3 characters and consists of 3 digits, add hyphen
		if (value.length === 3 && /\d{3}/.test(value)) {
			this.setState({
	      phone_number: value + '-'
	    });
		}
		// if input value has 7 characters and is in 123-456 format, add hyphen
		else if (value.length === 7 && /\d{3}-\d{3}/.test(value)) {
			this.setState({
	      phone_number: value + '-'
	    });
		}
		// tests to see if phone number input format is correct and complete
		else if (value.length === 12 && /\d{3}-\d{3}-\d{4}/.test(value)) {
			this.setState({
	      phone_number: value
	    }, () => {
	    	// focuses on next input automatically after correct format is reached
	    	this.inputAfterPhoneNumber.focus();
	    });
		}
		// default is just update state with input value
		else {
			this.setState({
	      phone_number: value
	    });
		}
	}

	handleSubmitForm(event) {
		// console.log(this.state);
		// prevents default form behavior
    event.preventDefault();

    const currentState = this.state;

    // takes away dashes from phone number
    const phone_number = currentState.phone_number.split('-').join('');

    // builds newParty object
    const newParty = {
    	party_name: currentState.party_name,
    	party_size: currentState.party_size,
    	phone_number: phone_number,
    	email: currentState.email,
    	first_name: currentState.first_name,
    	last_name: currentState.last_name
    };

    // clears state data, triggering re-rendering of component to empty form
    this.setState({
      party_name: "",
			party_size: "",
			phone_number: "",
			email: "",
			first_name: "",
			last_name: "",
			fireRedirect: true
    });

    // call parent function from RestaurantMain.jsx to pass up newParty
    this.props.handleAddParty(newParty);
	}

  render() {

  	return (

  		this.state.fireRedirect ? (

        <Redirect exact to='/'/>

  		) : (

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
				          	// autoFocus will cause browser to automatically
				          	// focus on this input field when component renders
				          	autoFocus
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
				          	onChange={this.handlePhoneChange}
				          	required="required"
				          	name="phone_number"
				          	// pattern ensures phone number is in proper format (123-456-7890)
				          	pattern="\d{3}-\d{3}-\d{4}"
				          	// title appears on hover and on incorrect input submission
				          	title="123-456-7890"
				          	maxLength="12"
				          />
				          <label htmlFor="phone_number">*Phone Number</label>
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
				          	// grabbing ref for auto-focusing after phone number format is complete
				          	ref={inp => this.inputAfterPhoneNumber = inp}
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
  		) // end of ternary operation
		); // end of return
	} // end of render
} // end of PartyForm ES6 class

// exports PartyForm component for other files to use
export default PartyForm;