// imports react component classes
import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import CustomerCollection from './QueueDashboard/CustomerCollection.jsx';
import CustomerForm from './CustomerForm.jsx';

class QueueDashboard extends Component {
	constructor(props) {
		super(props);

		// set initial state
	  this.state = { 
			customers: []
		};



	} 

  render() {
		return (
	    <div className="row">
		    <div className="col s12 l10 offset-l1">
	        <div className="card z-depth-4">
            <div id="dashboard-card-title" className="card-panel red lighten-2 white-text center-align">
              <h5 id="header-card-title">You-Queue Dashboard</h5>
            </div>
            <div className="card-content">
            	{this.state.customers.length > 0 ? (
            		<CustomerCollection customers={this.state.customers}/>
            	) : (
            		<div className="center">
            			<Link to="/addcustomer" className="btn-large center">ADD CUSTOMER</Link>
	  						</div>
            	)  }
	            
            </div> 
	        </div> 
		    </div> 
			</div>


		);
	}





}


// exports QueueDashboard component for other files to use
export default QueueDashboard;