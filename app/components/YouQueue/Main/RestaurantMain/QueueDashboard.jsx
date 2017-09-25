// imports react component classes
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// imports children components
import PartyCollection from './QueueDashboard/PartyCollection.jsx';

// declares QueueDashboard pure functional component, which will be this file's export
const QueueDashboard = ({parties}) => (
	<div className="row">
    <div className="col s12 l10 offset-l1">
      <div className="card z-depth-4">
        <div id="dashboard-card-title" className="card-panel red lighten-2 white-text center-align">
          <h5 id="header-card-title">You-Queue Dashboard</h5>
        </div>
        <div className="card-content">
        	{parties.length > 0 ? (
        		<PartyCollection parties={parties}/>
        	) : (
        		<div className="center">
        			<Link to="/restaurant/test/parties/add" className="btn-large center">ADD CUSTOMER</Link>
						</div>
        	)  }
        </div> 
      </div> 
    </div> 
	</div>
); // end of QueueDashboard

// exports QueueDashboard component for other files to use
export default QueueDashboard;

/*
// imports axios for ajax calls
import axios from 'axios';

class QueueDashboard extends Component {
	// constructor is called once when setting initial state
	constructor(props) {
		super(props);

		// set initial state
	  this.state = { 
			parties: [],
			restaurant_id: 'test'
		};
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

  render() {
		return (
	    <div className="row">
		    <div className="col s12 l10 offset-l1">
	        <div className="card z-depth-4">
            <div id="dashboard-card-title" className="card-panel red lighten-2 white-text center-align">
              <h5 id="header-card-title">You-Queue Dashboard</h5>
            </div>
            <div className="card-content">
            	{this.state.parties.length > 0 ? (
            		<PartyCollection parties={this.state.parties}/>
            	) : (
            		<div className="center">
            			<Link to="/restaurant/test/parties/add" className="btn-large center">ADD CUSTOMER</Link>
	  						</div>
            	)  }
            </div> 
	        </div> 
		    </div> 
			</div>
		);
	}
}

// exports QueueDashboard component for other files to use
export default QueueDashboard;

*/