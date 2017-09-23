// imports react component classes
import React, { Component } from 'react';
import PartyItem from './PartyCollection/PartyItem.jsx';


// declares PartyCollection pure functional component, which will be this file's export
const PartyCollection = props => (
	props.parties.length > 0 ? (
		<ul className="collection">
	  	{props.parties.map((party, i) => (
	  		<PartyItem key={i} party={party}/>
	  	))}
  	</ul>
	) : (
		<p>NO CUSTOMERS TO DISPLAY FOR NOW</p>
	)

); // end of PartyCollection


// exports PartyCollection component for other files to use
export default PartyCollection;