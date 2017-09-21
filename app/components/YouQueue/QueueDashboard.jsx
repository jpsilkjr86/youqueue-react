// imports react component classes
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

class QueueDashboard extends Component {
	constructor(props) {
		super(props);



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
            YOU-QUEUE DASHBOARD CONTENT
            </div> 
	        </div> 
		    </div> 
			</div>


		);
	}





}


// exports QueueDashboard component for other files to use
export default QueueDashboard;