// imports react component classes
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainContainer from './MainContainer.jsx';
import RestaurantMain from './Main/RestaurantMain.jsx';


// declares Main pure functional component, which will be this file's export
const Main = ({userType, userId}) => (
  <MainContainer>
    {/* this will only render if userType is restaurant */}
    { userType === 'restaurant' &&
      <RestaurantMain userId={userId}/>
    }
    {/* add CustomerMain component with similar conditional here */}
  </MainContainer>
  
); // end of Main


// exports Main component for other files to use
export default Main;