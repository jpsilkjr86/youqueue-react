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
		    time: 4000,
		    transition: 'scale'
		  }
		};

		this.handleDeactivate = this.handleDeactivate.bind(this);
		this.handleAlertSMS = this.handleAlertSMS.bind(this);
		this.handleArriveTable = this.handleArriveTable.bind(this);
		this.handleUndoArrived = this.handleUndoArrived.bind(this);
		this.handleUndoDeactivate = this.handleUndoDeactivate.bind(this);
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
			this.msg.success(
				<AlertWithUndo
					msg="Party deactivated."
					handler={this.handleUndoDeactivate}
				/>
			);
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
			this.msg.success('SMS delivered!');
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
			this.msg.success(
				<AlertWithUndo 
					msg="Party data updated!"
					handler={this.handleUndoArrived}
			/>);
		}).catch(err => {
			console.log(err);
			// alert user that there was an error processing the request
			this.msg.error('Error: Unable to update party arrived table data.');
		});
	}

	handleUndoArrived() {
		console.log('handle undo arrived');
	}

	handleUndoDeactivate() {
		console.log('handle undo deactivate');
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
} // end of RestaurantMain

// RestaurantMain sub-components
const AlertWithUndo = ({msg, handler}) => (
	<div>
		<p>{msg}</p>
		<a className="btn-flat custom-btn-small" onClick={handler}>Click to Undo</a>	
	</div>
);

const UndoDeactivate = ({msg, handler}) => (
	<div>
		{msg}
		<button className="waves-effect waves-light btn" onClick={handler}>
		Undo
		</button>
		<a className="btn-floating waves-effect waves-light red right" onClick={handler}>
			<i className="material-icons">undo</i>
		</a>
	</div>
);

// exports RestaurantMain component for other files to use
export default RestaurantMain;