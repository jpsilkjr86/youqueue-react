// imports react component classes
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// imports children components
import QueueDashboard from './RestaurantMain/QueueDashboard.jsx';
import PartyForm from './RestaurantMain/PartyForm.jsx';

// imports axios for ajax calls
import axios from 'axios';


class RestaurantMain extends Component {
	// constructor is called once when setting initial state
	constructor(props) {
		super(props);
		// console.log('RestaurantMain props');
		// console.log(props);

		// set initial state
	  this.state = { 
			parties: [],
			restaurant_id: props.userId
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
  	const { parties, restaurant_id } = this.state;
		return (
			<Switch>
				<Route exact path="/restaurant/:id/dashboard" render={props => 
					<QueueDashboard parties={parties}/>
				}/>
				<Route exact path="/restaurant/:id/parties/add" render={props => (
					<PartyForm/>
				)}/>
      	<Redirect exact to={`/restaurant/${restaurant_id}/dashboard`}/>
			</Switch>
		);
	}
}

// exports RestaurantMain component for other files to use
export default RestaurantMain;


/*

// declares RestaurantMain pure functional component, which will be this file's export
const RestaurantMain = ({userId}) => {
	console.log('RestaurantMain rendered');
	// console.log(match);
	return (
	<Switch>
		<Route exact path="/restaurant/:id/dashboard" render={props => 
			<QueueDashboard/>
		}/>
		<Route exact path="/restaurant/:id/parties/add" render={props => (
			<PartyForm/>
		)}/>
		<Redirect to={`/restaurant/${userId}/dashboard`}/>
	</Switch>
)}; // end of RestaurantMain

*/