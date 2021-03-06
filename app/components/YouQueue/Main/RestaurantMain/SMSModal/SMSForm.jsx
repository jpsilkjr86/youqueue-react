// imports react component classNamees
import React, { Component } from 'react';

// react-materialize components
// import { Input } from 'react-materialize';

// declares SMSForm component as stateful class component, which will be this file's export.
class SMSForm extends Component {

	constructor(props) {
		super(props);

		const sms_message = 'You-Queue Alert for ' + props.party.party_name + ': ' 
		          	+ 'Your table is ready! Please come at your earliest convenience. '
		          	+ 'Enjoy your meal! (AUTO-SMS:Do not reply!)';

		const charactersRemaining = 140 - sms_message.length;

		// set initial state 
	  this.state = { 
			sms_message: sms_message,
		  charactersRemaining: charactersRemaining
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);

	}

	// needed so as to ensure button's disabled state is set properly upon mounting.
	componentDidMount() {
		// disables submit button if SMS 140 character limit is exceeded
    this.button.disabled = (this.state.charactersRemaining < 0);
	}

	// since the same modal is being used, this lifecycle method is needed 
	// so that the content can change dynamically such as when another customer
	// phone button is clicked. new props will thus change the content.
	componentWillReceiveProps(nextProps) {
		// updates like how the constructor sets state from received props
		const sms_message = 'You-Queue Alert for ' + nextProps.party.party_name + ': ' 
		          	+ 'Your table is ready! Please come at your earliest convenience. '
		          	+ 'Enjoy your meal! (AUTO-SMS:Do not reply!)';
		const charactersRemaining = 140 - sms_message.length;

		// disables submit button if SMS 140 character limit is exceeded
    this.button.disabled = (charactersRemaining < 0);

		// updates state
	  this.setState({ 
			sms_message: sms_message,
		  charactersRemaining: charactersRemaining
		});
	}

	handleChange(event) {
		
    const newSMSMsg = event.target.value;

    // disables submit button if SMS 140 character limit is exceeded
    const newCharRemainging = 140 - newSMSMsg.length;
    this.button.disabled = (newCharRemainging < 0);

    // sets state of whatever the input name is to the value of event object
    this.setState({
    	sms_message: newSMSMsg,
    	charactersRemaining: newCharRemainging
    });

	}

	handleSubmitForm(event) {
		// prevents default form behavior
    event.preventDefault();

    const { sms_message } = this.state;
    
    // call parent function from RestaurantMain.jsx 

    this.props.send_sms(sms_message);

    $('#sms-modal').modal('close');

	}

  render() {
  	const { party } = this.props,
  		{ sms_message, charactersRemaining } = this.state;
  	return (
  		<div className="card-panel blue-grey">
  			<div className="card-content white-text">
	  			<div className="row">
		  			<form className="col s12" onSubmit={this.handleSubmitForm}>
		  				<div className="row">
				        <div className="col s12">
				        	<label htmlFor="sms_message">SMS Messsage Content - Customizable!</label>
				        </div>
				  			<div className="input-field col s12">
				          <textarea
				          	className="materialize-textarea"
				          	name="sms_message"
				          	value={sms_message}
				          	onChange={this.handleChange}
				          />
				        </div>
				        <div className="col s12 center">
				        	<p className="left"><em>Characters remaining: {charactersRemaining}</em></p>
				          <button
				          	className="btn waves-effect waves-light right"
				          	type="submit"
				          	ref={(node) => this.button = node}>
				          	Send Message
				          </button>
			        	</div>
				  		</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

// exports SMSForm component for other files to use
export default SMSForm;



		          	//{/*className="materialize-textarea"*/}

		  				// <legend>
		  				// 	<p>Notify <strong>{party.party_name}</strong> their table is ready!</p>
		  				// </legend>