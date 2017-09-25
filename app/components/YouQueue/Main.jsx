// imports react component classes
import React from 'react';

// imports children components
import RestaurantMain from './Main/RestaurantMain.jsx';

// declares Main pure functional component, which will be this file's export
const Main = ({userType, userId}) => (
  // this will only render if userType is restaurant
  userType === 'restaurant' &&
    <RestaurantMain userId={userId}/>
  // add CustomerMain component with similar conditional here
  
); // end of Main


// exports Main component for other files to use
export default Main;