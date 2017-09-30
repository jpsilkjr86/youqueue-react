// imports react component classes
import React, { Component } from 'react';

// imports Modal from materialize
import { Modal } from 'react-materialize';

// declares SignInModal component as stateful class component, which will be this file's export.
class SignInModal extends Component {

  constructor(props) {
    super(props);

    // set initial state 
    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // ensures modal always closes before the component unmounts
  componentWillUnmount() {
    $('#signin-modal').modal('close')
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

    const user = this.state;
    // clears state data, triggering re-rendering of component to empty form
    this.setState({
      email: "",
      password: ""
    });
    
    // call parent function from YouQueue.jsx 
    this.props.handleLogIn(user, 'restaurant');


  }

  render() {
    return (
    	<Modal 
    		id={this.props.id}
    		header="Sign In"
    		actions={null}>
    		<form id="sign-in" onSubmit={this.handleSubmit}>
          <div className="row">
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
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
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
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light right" type="submit">Submit</button>
    	  </form>
    	</Modal>
    );
  }
}

// exports SignInModal component for other files to use
export default SignInModal;