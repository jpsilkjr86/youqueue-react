// imports react
import React from 'react';

// declares FormContainer as pure functional component, which will be this file's export
const FormContainer = props => (
	<div className="row">
    <div className="col s12">
      <div className="card z-depth-4">
        <div className="card-content" id="partyform-content">
          {props.children}
        </div> 
      </div> 
    </div> 
  </div>
);

// exports FormContainer component for other files to use
export default FormContainer;