// imports react component classes
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// imports children components
import DashboardContainer from '../DashboardContainer.jsx';
import PartyCollection from './QueueDashboard/PartyCollection.jsx';

// declares QueueDashboard pure functional component, which will be this file's export
const QueueDashboard = props => (
	<DashboardContainer title="You-Queue Dashboard">
  	{props.parties.length > 0 ? (
  		<PartyCollection
  			parties={props.parties}
				handleDeactivate={props.handleDeactivate}
				handleAlertSMS={props.handleAlertSMS}
				handleArriveTable={props.handleArriveTable}
  		/>
  	) : (
  		<div className="center">
  			<Link to="/restaurant/test/parties/add" className="btn-large center">ADD CUSTOMER</Link>
			</div>
  	)  }
	</DashboardContainer>
); // end of QueueDashboard

// exports QueueDashboard component for other files to use
export default QueueDashboard;