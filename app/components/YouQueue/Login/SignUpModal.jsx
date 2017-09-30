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
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	componentWillUnmount() {
		$('#signup-modal').modal('close')
	}

	handleChange(event) {
		
    const { value, name } = event.target;
    // sets state of whatever the input name is to the value of event object
    this.setState({
      [name]: value
    });

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
		          	onChange={this.handleChange}
		          	value={this.state.phone_number}
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