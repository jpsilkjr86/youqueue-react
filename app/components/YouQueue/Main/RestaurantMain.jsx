// imports react component classes
import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import QueueDashboard from './RestaurantMain/QueueDashboard.jsx';
import PartyForm from './RestaurantMain/PartyForm.jsx';

// declares RestaurantMain pure functional component, which will be this file's export
const RestaurantMain = props => (
	<Switch>
		<Route exact path="/restaurant/test/dashboard" render={props => 
			<QueueDashboard/>
		}/>
		<Route exact path="/restaurant/test/parties/add" render={props => (
			<PartyForm/>
		)}/>
		<Redirect to="/restaurant/test/dashboard"/>
	</Switch>
); // end of RestaurantMain

// exports RestaurantMain component for other files to use
export default RestaurantMain;






		