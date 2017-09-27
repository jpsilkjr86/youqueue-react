// imports react component classNamees
import React, { Component } from 'react';

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

    // const party = this.state;
    // clears state data, triggering re-rendering of component to empty form
   //  this.setState({
   //    party_name: "",
			// party_size: "",
			// phone_number: "",
			// email: "",
			// first_name: "",
			// last_name: ""
   //  });
    
    // call parent function from RestaurantMain.jsx 
    // this.props.handleAddParty(party);


	}

  render() {
  	const { party } = this.props;
  	return (
  		<form>
				<legend>Notify {party.party_name} their table is ready!</legend>
			</form>
		);
	}
}

// exports PartyForm component for other files to use
export default PartyForm;