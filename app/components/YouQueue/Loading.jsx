// imports react component classes
import React from 'react';

// declares Loading as pure functional component.
const Loading = props => (
  <div className="loading-wrapper">
    <img src="/assets/images/loadingcube.gif" alt="Loading..."/>
  </div>
);

// exports Loading component for other files to use
export default Loading;