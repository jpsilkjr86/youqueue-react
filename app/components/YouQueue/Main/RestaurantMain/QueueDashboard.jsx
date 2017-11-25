// imports react component classes
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// imports children components
import DashboardContainer from '../DashboardContainer.jsx';
import PartyCollection from './QueueDashboard/PartyCollection.jsx';
import LoadingContainer from '../../LoadingContainer.jsx';
import Loading from '../../Loading.jsx';

// declares QueueDashboard pure functional component, which will be this file's export
const QueueDashboard = props => (
	<DashboardContainer title="You-Queue Dashboard">
    <LoadingContainer
      isLoading={props.isRetrievingParties}
      renderLoading={() => <Loading text="Retrieving Party Data..."/>}
    >
    	{ // after finished loading, render under the following conditions:
        // 1) render PartyCollection component for each party in the parties array
        props.parties.length > 0 ? (
      		<PartyCollection
      			parties={props.parties}
    				handleDeactivate={props.handleDeactivate}
    				handleAlertSMS={props.handleAlertSMS}
    				handleArriveTable={props.handleArriveTable}
      		/>
      	) : (
        // 2) or display add customers btn if there are no parties to display
      		<div className="center">
      			<Link to="/restaurant/test/parties/add" className="btn-large center">ADD CUSTOMER</Link>
    			</div>
      	)
      }
    </LoadingContainer>
	</DashboardContainer>
); // end of QueueDashboard

// exports QueueDashboard component for other files to use
export default QueueDashboard;