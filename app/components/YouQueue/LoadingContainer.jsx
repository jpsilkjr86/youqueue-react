// imports react component classes
import React from 'react';

// declares LoadingContainer as pure functional component.
const LoadingContainer = ({ isLoading, loadingComponent: LoadingComponent, children }) => {
  console.log("LoadingContainer isLoading:", isLoading);
  return (
  // if isLoading is true, render LoadingComponent prop
  isLoading ? (
    <LoadingComponent/>
  ) : (
  // if isLoading is false, render children of LoadingContainer
    <div>
      {children}
    </div>
  )

)};

// exports LoadingContainer component for other files to use
export default LoadingContainer;