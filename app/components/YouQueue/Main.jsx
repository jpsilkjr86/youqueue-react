// imports react component classes
import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import MainContainer from './MainContainer.jsx';
import QueueDashboard from './QueueDashboard.jsx';

// imports axios for routing / server communication
import axios from 'axios';

// declares Main component as ES6 class, which will be this file's export
class Main extends Component {
	
	// constructor has no props since this is the parent element
	constructor(props) {
    super(props);
    console.log('main props:');
    console.log(props);
    // set initial state
  //   this.state = {

		// };
    
	} // end of constructor

  componentDidMount() {
    console.log('Main component mounted');
  }

	render() {
    return (
      <MainContainer>
        <QueueDashboard/>
      </MainContainer>
    );
  } // end of render

} // end of class

// exports Main component for other files to use
export default Main;