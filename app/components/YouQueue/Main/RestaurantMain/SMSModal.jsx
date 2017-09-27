// imports react component classes
import React, { Component } from 'react';

// imports Modal from materialize
import { Modal } from 'react-materialize';

// imports child component
import SMSForm from './SMSModal/SMSForm.jsx';

// pure functional component, only job is to decide whether to render a form or not
const SMSModal = ({ party, id }) => (
	
	<Modal id={id} header="Send SMS">
		{ party != null && 
			<SMSForm party={party}/> 
		}
	</Modal>

);

// exports SMSModal component for other files to use
export default SMSModal;