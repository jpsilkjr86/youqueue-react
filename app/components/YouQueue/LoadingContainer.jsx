// imports react component classes
import React from 'react';

// declares LoadingContainer as pure functional component.
const LoadingContainer = props => {
  // destructures needed props
  const {
    isLoading,
    loadingComponent: LoadingComponent,
    renderLoading,
    children
  } = props;

  console.log("LoadingContainer isLoading:", isLoading);
  console.log(LoadingComponent);
  console.log(renderLoading);

  if (isLoading) {
    // LoadingComponent takes precedence in case renderLoading
    // and LoadingCompoent are both received as props.
    if (LoadingComponent){
      return <LoadingComponent/>
    }
    // if no LoadingComponent exists then invoke renderLoading, a function
    // that allows inline component rendering.
    if (renderLoading) {
      return renderLoading();
    }
    // returns text "Loading..." if isLoading is true but none of the above exist.
    return <div>Loading...</div>;
  }
  // if isLoading is false, just render children.
  return <div>{children}</div>;

};

// exports LoadingContainer component for other files to use
export default LoadingContainer;