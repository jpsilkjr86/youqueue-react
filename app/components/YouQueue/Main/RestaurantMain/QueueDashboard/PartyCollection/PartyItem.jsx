// imports react component classNames
import React from 'react';

// declares PartyItem as pure functional component (stateless)
const PartyItem = ({party, alerted_sms, arrived_table}) => (

	<li className="collection-item dismissable party-row" data-id="">
		<div className="row">
		  <div className="col s3 m2">
		    <SMSButton alerted_sms={alerted_sms}/>
		  </div>
		  <div className="col s6 m6">
		    <p>Party: <b>{party.party_name}</b></p>
		    <p>Party Size: <b>{party.party_size}</b></p>
		    <p>Reserved Under: <b>{party.reserved_under}</b></p>
		  </div>
		  <div className="col s3 m4">
		    <div className="row">
		      <div className="col s12 m6">
		        <CancelButton/>
		      </div>
		      <div className="col s12 m6">
		        <ArrivedTableButton arrived_table={arrived_table}/>
		      </div>
		    </div>
		  </div>                                    
		</div>
	</li>

);

// booleans in Party model:  is_active, arrived_table, alerted_sms

const SMSButton = ({alerted_sms}) => (
	alerted_sms ? (
		<a className="btn-floating sms-btn" data-id="" data-alerted_sms="">
			<i className="material-icons">phonelink_ring</i>
		</a>
	) : (
		<a className="btn-floating sms-btn green" data-id="" data-alerted_sms="">
			<i className="material-icons">phonelink_ring</i>
		</a>
	)
);

const CancelButton = props => (
	<a className="btn-floating cancel-btn red" data-id="" data-active="">
		<i className="material-icons">close</i>
	</a>
);

const ArrivedTableButton = ({arrived_table}) => (
	arrived_table ? (
		<a className="btn-floating arrived-btn green" data-id="" data-arrived_table="">
			<i className="material-icons">check_box_outline_blank</i>
		</a>
	) : (
		<a className="btn-floating arrived-btn red" data-id="" data-arrived_table="">
			<i className="material-icons">check_box_outline_blank</i>
		</a>
	)
);

// exports PartyItem component for other files to use
export default PartyItem;