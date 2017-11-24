// imports react
import React from 'react';

 const 	michaelLink = "https://www.linkedin.com/in/michael-tolmie-83527537/",
 				johnLink = "https://www.linkedin.com/in/john-silkey-jr/",
 				tarminLink = "https://www.linkedin.com/in/tarmin-sidharta/",
 				tylerLink = "https://www.linkedin.com/in/tyler-r-peterson/";

const LinkedInLink = ({ href, text }) => (
	<a className="grey-text text-lighten-3" target="_blank" href={href}>
		{text}
	</a>
);

// declares Footer pure functional component, which will be this file's export
const Footer = props => (
	<footer className="page-footer light-blue darken-4">
		<div className="container">
			<div className="row">
				<div className="col s12 m6 white-text">
					<h5>Connect with the contributors:</h5>
					<ul>
						<li><LinkedInLink href={michaelLink} text="Michael"/></li>
						<li><LinkedInLink href={johnLink} text="John"/></li>
						<li><LinkedInLink href={tarminLink} text="Tarmin"/></li>
						<li><LinkedInLink href={tylerLink} text="Tyler"/></li>
					</ul> 
				</div>
				<div className="col s12 m3 offset-m3 white-text">
					<h5>Appreciate Donations on Patreon!</h5>
					<p>Future Link Here</p>
				</div>
			</div>
		</div>
		<div className="footer-copyright">
			<div className="container">
			© 2017 Copyright John, Michael, Tarmin and Tyler
			</div>
		</div>
	</footer>
); // end of Footer

// exports Footer component for other files to use
export default Footer;