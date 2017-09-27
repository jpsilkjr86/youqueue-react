// imports react component classes
import React, { Component } from 'react';

// imports Modal from materialize
import { Modal } from 'react-materialize';

// imports axios for ajax calls
import axios from 'axios';

class SMSModal extends Component {
	// constructor is called once when setting initial state
	constructor(props) {
		super(props);

		// set initial state
	  this.state = { 
			party: {}
		};

		this.showSMSModal = this.showSMSModal.bind(this);
	}

	// called once the component mounts for the first time
	componentDidMount() {
		console.log(this.props)
	}

	componentDidUpdate() {
		$('#sms-modal').modal('open');
	}

	showSMSModal() {
		// using jquery for using modals programatically, in accordance
		// with react-materialize documentation:
		// https://react-materialize.github.io/#/modals
		// https://github.com/react-materialize/react-materialize/issues/246
		$('#sms-modal').modal('open');
	}

  render() {
  	const { party } = this.props;
		return (
			<div>
				<Modal
					id='sms-modal'
					header={party.party_name}>
					{party.party_size}
				</Modal>
			</div>
		);
	}
} // end of SMSModal

// exports SMSModal component for other files to use
export default SMSModal;