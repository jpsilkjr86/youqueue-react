// imports react component classNames
import React from 'react';

// declares PartyItem as pure functional component (stateless)
const PartyItem = props => (

	<li className="collection-item dismissable party-row" data-id="">
		<div className="row">
		  <div className="col s3 m2">
		    <SMSButton
		    	_id={props.party._id}
		    	alerted_sms={props.party.alerted_sms}
		    	handleAlertSMS={props.handleAlertSMS}
		    />
		  </div>
		  <div className="col s6 m6">
		    <p>Party: <b>{props.party.party_name}</b></p>
		    <p>Party Size: <b>{props.party.party_size}</b></p>
		    <p>Reserved Under: <b>{props.party.reserved_under}</b></p>
		  </div>
		  <div className="col s3 m4">
		    <div className="row">
		      <div className="col s12 m6">
		        <DeactivateButton
		        	_id={props.party._id}
		        	handleDeactivate={props.handleDeactivate}
		        />
		      </div>
		      <div className="col s12 m6">
		        <ArrivedTableButton
		        	_id={props.party._id}
		        	arrived_table={props.party.arrived_table}
		        	handleArriveTable={props.handleArriveTable}
		        />
		      </div>
		    </div>
		  </div>                                    
		</div>
	</li>

);

// booleans in Party model:  is_active, arrived_table, alerted_sms

const SMSButton = ({_id, alerted_sms, handleAlertSMS}) => (
	alerted_sms ? (
		<a className="btn-floating sms-btn green">
			<i className="material-icons">phonelink_ring</i>
		</a>
	) : (
		<a className="btn-floating sms-btn" onClick={() => handleAlertSMS(_id)}>
			<i className="material-icons">phonelink_ring</i>
		</a>
	)
);

const DeactivateButton = ({_id, handleDeactivate}) => (
	<a className="btn-floating cancel-btn red" onClick={() => handleDeactivate(_id)}>
		<i className="material-icons">close</i>
	</a>
);

const ArrivedTableButton = ({_id, arrived_table, handleArriveTable}) => (
	arrived_table ? (
		<a className="btn-floating arrived-btn green">
			<i className="material-icons">check_box</i>
		</a>
	) : (
		<a className="btn-floating arrived-btn" onClick={() => handleArriveTable(_id)}>
			<i className="material-icons">check_box_outline_blank</i>
		</a>
	)
);

// exports PartyItem component for other files to use
export default PartyItem;