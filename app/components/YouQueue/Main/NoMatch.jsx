// imports react component classes
import React from 'react';

// imports children components
import DashboardContainer from './DashboardContainer.jsx';

// declares NoMatch as pure functional component
const NoMatch = ({userType, userId, location, history}) => (
  <DashboardContainer title="404: Page Not Found">

  	<div className="center-align">

      Sorry, but "{location.pathname}" is not a valid pathname.
      <br/>
      <br/>
      <button className="btn center" onClick={history.goBack}>
      	Back
      </button>

      &nbsp;&nbsp;

      <button className="btn center" onClick={()=> history.push('/')}>
      	Home
      </button>

    </div>

  </DashboardContainer>  
);


// exports NoMatch component for other files to use
export default NoMatch;