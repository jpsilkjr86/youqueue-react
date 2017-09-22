// imports react component classes
import React, { Component } from 'react';
import CustomerItem from './CustomerCollection/CustomerItem.jsx';


// declares CustomerCollection pure functional component, which will be this file's export
const CustomerCollection = props => (
	props.customers.length > 0 ? (
		<ul>
	  	{props.customers.map((cust, i) => (
	  		<CustomerItem key={i} customer={props.customers[i]}/>
	  	))}
  	</ul>
	) : (
		<p>NO CUSTOMERS TO DISPLAY FOR NOW</p>
	)

); // end of CustomerCollection


// exports CustomerCollection component for other files to use
export default CustomerCollection;