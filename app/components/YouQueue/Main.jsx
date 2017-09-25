// imports react component classes
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainContainer from './MainContainer.jsx';
import RestaurantMain from './Main/RestaurantMain.jsx';


// declares Main pure functional component, which will be this file's export
const Main = ({match, userType, userId}) => (
  <MainContainer>
    {/* wrap in Switch so that exactly one of these Routes is hit */}
    <Switch>
      {/* this route only exists if userType is restaurant */}
      { userType === 'restaurant' &&
      <Route exact to="/restaurant/:id" render={props => 
        <RestaurantMain {...props} userId={userId}/>
      }/> }
      {/* add customer user route in similar conditional here */}

      {/* automatically redirects according to usertype and id */}
      <Redirect exact to={`/${userType}/${userId}`}/>
    </Switch>
  </MainContainer>
  
); // end of Main


// exports Main component for other files to use
export default Main;