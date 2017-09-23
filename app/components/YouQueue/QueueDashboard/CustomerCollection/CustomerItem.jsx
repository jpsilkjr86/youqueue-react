// imports react component classNames
import React, { Component } from 'react';


const CustomerItem = props => (

	<li className="collection-item dismissable customer-row" data-id="">
		<div className="row">
		  <div className="col s3 m2">
		    <a className="btn-floating sms-btn" data-id="" data-alerted_sms=""><i className="material-icons">phonelink_ring</i></a>
		  </div>
		  <div className="col s6 m6">
		    <p>Party: <b>TEST</b></p>
		    <p>Party Size: <b>TEST</b></p>
		    <p>Reserved Under: <b>TEST</b></p>
		  </div>
		  <div className="col s3 m4">
		    <div className="row">
		      <div className="col s12 m6">
		        <a className="btn-floating cancel-btn red" data-id="" data-active=""><i className="material-icons">close</i></a>
		      </div>
		      <div className="col s12 m6">
		        <a className="btn-floating arrived-btn green" data-id="" data-arrived_table=""><i className="material-icons">check_box_outline_blank</i></a>
		      </div>
		    </div>
		  </div>                                    
		</div>
	</li>

)

// exports CustomerItem component for other files to use
export default CustomerItem;