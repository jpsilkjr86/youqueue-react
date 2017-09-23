// imports react component classes
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CustomerCollection from './QueueDashboard/CustomerCollection.jsx';

// imports axios for ajax calls
import axios from 'axios';

class QueueDashboard extends Component {
	constructor(props) {
		super(props);

		// set initial state
	  this.state = { 
			customers: [],
			restaurant_id: 'test'
		};



	}

	componentDidMount() {
		// saves id as more manageable constable
		const id = this.state.restaurant_id;
		// performs axios request to get parties by restaurant id
		axios.get(`/restaurant/${id}/parties/all`).then( ({data}) => {
			// updates customers array with response data
			console.log(data);
			this.setState({customers: data});
		}).catch(err => {
			console.log(err);
		});
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
	            <CustomerCollection customers={this.state.customers}/>
            </div> 
	        </div> 
		    </div> 
			</div>


		);
	}





}


// exports QueueDashboard component for other files to use
export default QueueDashboard;