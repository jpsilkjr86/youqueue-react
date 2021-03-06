// imports react component classes
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// imports supplementary AlertContainer component from react-alert and Modal from materialize
import AlertContainer from 'react-alert';

// imports children components
import QueueDashboard from './RestaurantMain/QueueDashboard.jsx';
import PartyForm from './RestaurantMain/PartyForm.jsx';
import SMSModal from './RestaurantMain/SMSModal.jsx';
import NoMatch from './NoMatch.jsx';

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
		  },
		  partyToSendSMS: null,
		  // for letting QueueDashboard know whether to render loading gif
		  isRetrievingParties: true
		};

		this.handleDeactivate = this.handleDeactivate.bind(this);
		this.handleAlertSMS = this.handleAlertSMS.bind(this);
		this.handleArriveTable = this.handleArriveTable.bind(this);
		this.handleUndoArrived = this.handleUndoArrived.bind(this);
		this.handleUndoDeactivate = this.handleUndoDeactivate.bind(this);
		this.showSMSModal = this.showSMSModal.bind(this);
		this.handleAddParty = this.handleAddParty.bind(this);
		this.handleSendSMS = this.handleSendSMS.bind(this);
	}

	// called once the component mounts for the first time
	componentDidMount() {
		// mininum time for loading gif to be recognized before performing ajax request
		// (can be removed or changed as needed).
		// saved as this.timeout so we can clear it later.
		this.timeout = setTimeout(() => {

			// saves id as more manageable constable
			const id = this.state.restaurant_id;
			// performs axios request to get parties by restaurant id
			axios.get(`/restaurant/${id}/parties/all`).then( ({data}) => {
				// updates parties array with response data, sets isRetrievingParties to false
				// to tell QueueDashboard to stop rendering loading gif
				this.setState({
					parties: data,
			  	isRetrievingParties: false
				});
			}).catch(err => {
				this.msg.error(`Error: Unable to retrieve active parties`);
				// sets isRetrievingParties to false to tell QueueDashboard to stop rendering loading gif
				this.setState({
			  	isRetrievingParties: false
				});
			});

		}, 900);
	}

	// clear the timeout if it exists before unmounting to avoid setting state
	// of unmounted components
	componentWillUnmount() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
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
					_id={partyId}
				/>
			);
		}).catch(err => {
			// alert user that there was an error processing the request
			this.msg.error('Error: Unable to deactivate party.');
		});
	}

	// handles deactivate party functionality
	handleAlertSMS(partyId) {
		// retrieves party data using partyId argument
		axios.get(`/party/${partyId}`).then( ({data}) => {
			// sets state of partyToSendSMS and showSMSModal so modal is triggered
			this.setState({ partyToSendSMS: data }, () => this.showSMSModal());
		}).catch(err => {
			// alert user that there was an error processing the request
			this.msg.error('Error: Unable to deliver SMS');
		});
	}

	handleSendSMS(sms_message){
		// grabs party id from state
		const partyId = this.state.partyToSendSMS._id;
		// submits post request which will carry out SMS delivery
		axios.post(`/party/${partyId}/send_sms`, {sms_message}).then(response => {
			console.log(response);
			// sets alerted_sms to true
			return axios.post(`/party/${partyId}/alerted_sms`);
		}).then(({data}) => {
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
			this.msg.success("SMS Successfully Delivered");
		}).catch(err => {
			this.msg.error("SMS Failed To Deliver");
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
					msg="Party status set to arrived!"
					handler={this.handleUndoArrived}
					_id={partyId}
			/>);
		}).catch(err => {
			// alert user that there was an error processing the request
			this.msg.error('Error: Unable to update party arrived status.');
		});
	}

	handleUndoArrived(partyId) {
		// performs axios post request which returns a promise
		axios.post(`/party/${partyId}/arrive_table/undo`).then( ({data}) => {
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
			this.msg.success('Party reset to not-yet-arrived.');	
		}).catch(err => {
			// alert user that there was an error processing the request
			this.msg.error('Error: Unable to undo arrived status.');
		});
	}

	handleUndoDeactivate(partyId) {
		// performs axios post request which returns a promise
		axios.post(`/party/${partyId}/deactivate/undo`).then( response => {
			// saves restaurant_id as more manageable constable
			const { restaurant_id } = this.state;
			// performs axios request to get all active parties by restaurant id
			return axios.get(`/restaurant/${restaurant_id}/parties/all`);
		}).then( ({data}) => {
			// updates parties array with response data
			this.setState({parties: data});
			this.msg.success('Party reactivated!');
		}).catch(err => {
			// alert user that there was an error processing the request
			this.msg.error('Error: Unable to undo deactivation.');
		});
	}

	showSMSModal() {
		// using jquery for using modals programatically, in accordance
		// with react-materialize documentation:
		// https://react-materialize.github.io/#/modals
		// https://github.com/react-materialize/react-materialize/issues/246
		$('#sms-modal').modal('open');
	}

	handleAddParty(party){
		const { restaurant_id } = this.state;
		// builds new party data. 
		const newPartyData = {
			party_name: party.party_name,
			party_size: party.party_size,
			phone_number: party.phone_number,
			reserved_under: party.first_name,
			email: party.email,
			occasion: [],
			restaurant_id: restaurant_id
		};

		// preform axios post request with new party data
		axios.post(`/restaurant/${restaurant_id}/parties/add`, newPartyData).then(response => {
			// return an axios get request grabbing all the parties data
			return axios.get(`/restaurant/${restaurant_id}/parties/all`);
		}).then(({data}) => {
			this.setState({ parties: data});
			this.msg.success(`${party.party_name} successfully added!`);
		}).catch(err => {
			this.msg.error(`Server Error: Unable to add ${party.party_name}`);
		});
	}

  render() {
  	const { parties, restaurant_id, isRetrievingParties } = this.state;
		return (
			<div>
				{/* AlertContainer component at top for rendering react-alert */}
				<AlertContainer ref={a => this.msg = a} {...this.state.alertOptions} />
				{/* SMSModal here ready to be dipslayed as needed */}
				<SMSModal id="sms-modal" party={this.state.partyToSendSMS} send_sms={this.handleSendSMS}/>
				{/* Switch route for principle components in RestaurantMain */}
				<Switch>
					<Route exact path="/restaurant/:id/dashboard" render={props => 
						<QueueDashboard
							isRetrievingParties={isRetrievingParties}
							parties={parties}
							handleDeactivate={this.handleDeactivate}
							handleAlertSMS={this.handleAlertSMS}
							handleArriveTable={this.handleArriveTable}
						/>
					}/>
					<Route exact path="/restaurant/:id/parties/add" render={props => (
						<PartyForm handleAddParty={this.handleAddParty}/>
					)}/>
					{/* renders dashboard as default index route */}
	      	<Redirect exact from="/" to={`/restaurant/${restaurant_id}/dashboard`}/>
	      	{/* all other routes will be rendered as NoMatch */}
	      	<Route component={NoMatch}/>
				</Switch>
			</div>
		);
	}
} // end of RestaurantMain

// RestaurantMain sub-component that contains undo button
const AlertWithUndo = ({msg, handler, _id}) => (
	<div>
		<p>{msg}</p>
		<a className="btn-flat custom-btn-small" onClick={() => handler(_id)}>Click to Undo</a>	
	</div>
);

// exports RestaurantMain component for other files to use
export default RestaurantMain;