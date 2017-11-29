// imports react component classes
import React, { Component } from 'react';

// imports Modal from materialize
import { Modal } from 'react-materialize';

// declares SignUpModal component as stateful class component, which will be this file's export.
class SignUpModal extends Component {

	constructor(props) {
		super(props);

		// set initial state 
	  this.state = {
			first_name: "",
			last_name: "",
			restaurant_name: "",
			phone_number: "",
			email: "",
			password: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	componentWillUnmount() {
		$('#signup-modal').modal('close')
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

	handleSubmit(event) {
		// prevents default form behavior
    event.preventDefault();

    const newUser = this.state;
    // clears state data, triggering re-rendering of component to empty form
    this.setState({
			first_name: "",
			last_name: "",
			restaurant_name: "",
			phone_number: "",
			email: "",
			password: ""
    });
    
    // call parent function from RestaurantMain.jsx 
    this.props.handleSignUp(newUser, 'restaurant');

	}

  render() {
		return (
			<Modal 
				id={this.props.id}
				header="Create New Account"
				actions={null}
			>
				<form id="new-account" onSubmit={this.handleSubmit}>
		      <div className="row">
		        <div className="input-field col s12 m6">
		          <i className="material-icons prefix">account_circle</i>
		          <input
		          	type="text"
		          	className="validate"
		          	required="required"
		          	name="first_name"
		          	onChange={this.handleChange}
		          	value={this.state.first_name}
		          />
		          <label htmlFor="first_name">*First Name</label>
		        </div>
		        <div className="input-field col s12 m6">
		          <i className="material-icons prefix">account_circle</i>
		          <input
		          	type="text"
		          	className="validate"
		          	required="required"
		          	name="last_name"
		          	onChange={this.handleChange}
		          	value={this.state.last_name}
		          />
		          <label htmlFor="last_name">*Last Name</label>
		        </div>
		        <div className="input-field col s12">
		          <i className="material-icons prefix">business</i>
		          <input
		          	type="text"
		          	className="validate"
		          	required="required"
		          	name="restaurant_name"
		          	onChange={this.handleChange}
		          	value={this.state.restaurant_name}
		          />
		          <label htmlFor="restaurant_name">*Restaurant Name</label>
		        </div>
		        <div className="input-field col s12">
		          <i className="material-icons prefix">phone</i>
		          <input
		          	type="tel"
		          	className="validate"
		          	required="required"
		          	name="phone_number"
		          	onChange={this.handlePhoneChange}
		          	value={this.state.phone_number}
		          	// pattern ensures phone number is in proper format (123-456-7890)
		          	pattern="\d{3}-\d{3}-\d{4}"
		          	// title appears on hover and on incorrect input submission
		          	title="123-456-7890"
		          	maxLength="12"
		          />
		          <label htmlFor="phone_number">*Telephone</label>
		        </div>
		        <div className="input-field col s12">
		          <i className="material-icons prefix">email</i>
		          <input
		          	type="email"
		          	className="validate"
		          	required="required"
		          	name="email"
		          	onChange={this.handleChange}
		          	value={this.state.email}
		          	// grabbing ref for auto-focusing after phone number format is complete
		          	ref={inp => this.inputAfterPhoneNumber = inp}
		          />
		          <label htmlFor="email">*Email</label>
		        </div>
		        <div className="input-field col s12">
		          <i className="material-icons prefix">security</i>
		          <input
		          	type="password"
		          	className="validate"
		          	required="required"
		          	name="password"
		          	onChange={this.handleChange}
		          	value={this.state.password}
		          />
		          <label htmlFor="password">*Password</label>
		        </div>
		      </div>
					<p className="left required-fields"><i>*All Fields Required</i></p>
					<button
						className="btn waves-effect waves-light right"
						type="submit"
						>
						Submit
					</button>
			  </form>
			</Modal>
		);
	}
}

// exports SignUpModal component for other files to use
export default SignUpModal;