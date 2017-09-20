// imports react
import React from 'react';

// declares MainComponent pure functional component, which will be this file's export
const MainComponent = props => (
	<main>
		<div className="container">
			{props.children}
		</div>
	</main>
);

// exports MainComponent component for other files to use
export default MainComponent;