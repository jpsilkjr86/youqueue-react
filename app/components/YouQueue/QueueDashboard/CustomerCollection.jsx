// imports react component classes
import React, { Component } from 'react';
import CustomerItem from './CustomerCollection/CustomerItem.jsx';


// declares CustomerCollection pure functional component, which will be this file's export
const CustomerCollection = props => (
	
		<ul>
	  	{props.customers.map((cust, i) => (
	  		<CustomerItem key={i} customer={props.customers[i]}/>
	  	))}
  	</ul>	

); // end of CustomerCollection


// exports CustomerCollection component for other files to use
export default CustomerCollection;