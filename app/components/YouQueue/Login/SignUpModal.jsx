// imports react component classes
import React from 'react';

// imports Modal from materialize
import { Modal } from 'react-materialize';

// pure functional component, only job is to decide whether to render a form or not
const SignUpModal = props => (
	
	<Modal id={props.id} header="Create New User"> 
		some content
	</Modal>

);

// exports SignUpModal component for other files to use
export default SignUpModal;