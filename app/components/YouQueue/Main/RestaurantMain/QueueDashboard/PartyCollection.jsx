// imports react component classes
import React, { Component } from 'react';
import PartyItem from './PartyCollection/PartyItem.jsx';


// declares PartyCollection pure functional component, which will be this file's export
const PartyCollection = props => (
	<ul className="collection">
  	{props.parties.map((party, i) => (
  		<PartyItem key={i} party={party}/>
  	))}
	</ul>
	
); // end of PartyCollection


// exports PartyCollection component for other files to use
export default PartyCollection;