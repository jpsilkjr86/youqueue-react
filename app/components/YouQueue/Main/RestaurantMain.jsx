// imports react component classes
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// imports supplementary AlertContainer component from react-alert
import AlertContainer from 'react-alert'

// imports children components
import QueueDashboard from './RestaurantMain/QueueDashboard.jsx';
import PartyForm from './RestaurantMain/PartyForm.jsx';

// imports axios for ajax calls
import axios from 'axios';

class RestaurantMain extends Component {
	// constructor is called once when setting initial state
	constructor(props) {
		super(props);

		// set initial state
	  this.state = { 
			parties: [],
			restaurant_id: props.userId,
			// for react-alert component
			alertOptions: {
		    offset: 14,
		    position: 'top right',
		    theme: 'light',
		    time: 5000,
		    transition: 'scale'
		  }
		};

		this.handleDeactivate = this.handleDeactivate.bind(this);
		this.handleAlertSMS = this.handleAlertSMS.bind(this);
		this.handleArriveTable = this.handleArriveTable.bind(this);
	}

	// called once the component mounts for the first time
	componentDidMount() {
		// saves id as more manageable constable
		const id = this.state.restaurant_id;
		// performs axios request to get parties by restaurant id
		axios.get(`/restaurant/${id}/parties/all`).then( ({data}) => {
			// updates parties array with response data
			console.log(data);
			this.setState({parties: data});
		}).catch(err => {
			console.log(err);
		});
	}

	// handles deactivate party functionality
	handleDeactivate(partyId) {
		// performs axios post request which returns a promise
		axios.post(`/party/${partyId}/deactivate`).then( ({data}) => {
			// grabs parties array through destructuring assignment
			const { parties } = this.state;
			// creates new updatedParties array by returning only the
			// original parties from this.state.parties that are not equal
			// to the updated party's id.
			const updatedParties = parties.filter((originalParty) => 
				originalParty._id !== partyId
			);
			// call setState to update parties array
			this.setState({parties: updatedParties});
			// alert user that their request was successful
			this.msg.success('Party successfully deactivated.');
		}).catch(err => {
			console.log(err);
			// alert user that there was an error processing the request
			this.msg.error('Error: Unable to deactivate party.');
		});
	}

	// handles deactivate party functionality
	handleAlertSMS(partyId) {
		// performs axios post request which returns a promise
		axios.post(`/party/${partyId}/alert_sms`).then( ({data}) => {
			// grabs parties array through destructuring assignment
			const { parties } = this.state;
			// saves updatedParty equal to the updated document
			const updatedParty = data;
			// saves updated as new array equal to parties array but
			// with the updated document replacing its original value
			const updatedParties = parties.map((originalParty, i) => 
				originalParty._id === partyId ? updatedParty : originalParty
			);
			// call setState to update parties array
			this.setState({parties: updatedParties});
			// alert user that their request was successful
			this.msg.success('SMS successfully delivered.');
		}).catch(err => {
			console.log(err);
			// alert user that there was an error processing the request
			this.msg.error('Error: Unable to deliver SMS');
		});
	}

	// handles deactivate party functionality
	handleArriveTable(partyId) {
		// performs axios post request which returns a promise
		axios.post(`/party/${partyId}/arrive_table`).then( ({data}) => {
			// grabs parties array through destructuring assignment
			const { parties } = this.state;
			// saves updatedParty equal to the updated document
			const updatedParty = data;
			// saves updated as new array equal to parties array but
			// with the updated document replacing its original value
			const updatedParties = parties.map((originalParty, i) => 
				originalParty._id === partyId ? updatedParty : originalParty
			);
			// call setState to update parties array
			this.setState({parties: updatedParties});
			// alert user that their request was successful
			this.msg.success('Party data successfully updated.');
		}).catch(err => {
			console.log(err);
			// alert user that there was an error processing the request
			this.msg.error('Error: Unable to update party arrived table data.');
		});
	}

  render() {
  	const { parties, restaurant_id } = this.state;
		return (
			<div>
				<AlertContainer ref={a => this.msg = a} {...this.state.alertOptions} />
				<Switch>
					<Route exact path="/restaurant/:id/dashboard" render={props => 
						<QueueDashboard
							parties={parties}
							handleDeactivate={this.handleDeactivate}
							handleAlertSMS={this.handleAlertSMS}
							handleArriveTable={this.handleArriveTable}
						/>
					}/>
					<Route exact path="/restaurant/:id/parties/add" render={props => (
						<PartyForm/>
					)}/>
	      	<Redirect exact to={`/restaurant/${restaurant_id}/dashboard`}/>
				</Switch>
			</div>
		);
	}
}

// exports RestaurantMain component for other files to use
export default RestaurantMain;