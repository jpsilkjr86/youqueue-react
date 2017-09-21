// imports react
import React from 'react';

// declares MainContainer pure functional component, which will be this file's export
const MainContainer = props => (
	<main>
		<div className="container">
			{props.children}
		</div>
	</main>
);

// exports MainContainer component for other files to use
export default MainContainer;