// imports react
import React from 'react';

// declares DashboardContainer pure functional component, which will be this file's export
const DashboardContainer = props => (
	<div className="row">
    <div className="col s12 l10 offset-l1">
      <div className="card z-depth-4">
        <div id="dashboard-card-title" className="card-panel red lighten-2 white-text center-align">
          <h5 id="header-card-title">{props.title}</h5>
        </div>
        <div className="card-content">
        	{props.children}
				</div>
			</div>
		</div>
	</div>
);

// exports DashboardContainer component for other files to use
export default DashboardContainer;