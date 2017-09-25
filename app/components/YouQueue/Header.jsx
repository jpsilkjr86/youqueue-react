// imports react component classes
import React from 'react';
import { Link } from 'react-router-dom';

// declares Header pure functional component, which will be this file's export
const Header = ({loggedIn, logIn, logOut, userId, userType}) => (
	// if logged in, render this:
	loggedIn ? (

		<header>
			<nav>
				<div className="nav-wrapper">
					<Link to="/" id="logo"><img src="/assets/images/brand_smaller.png"/></Link>
					<a href="#" data-activates="slide-out" className="button-collapse right hide-on-med-and-up">
						<i className="material-icons">menu</i>
					</a>
					<div className="brand-logo center">Welcome!</div>
					<ul id="nav-mobile" className="right hide-on-small-only">
						<li><Link to={`/${userType}/${userId}/parties/add`} className="btn-floating"><i className="material-icons red accent-1">add</i></Link></li>
						<li><Link to={`/${userType}/${userId}/dashboard`} className="btn-floating"><i className="material-icons red accent-1">dashboard</i></Link></li>
						<li><a href="#" onClick={logOut}>Log Out</a></li>
					</ul>
					<ul className="side-nav hide-on-med-and-up" id="slide-out">
						<li><img src="/assets/images/brand_small.png" className="slide-out-brand"/></li>
						<li><Link to={`/${userType}/${userId}/dashboard`}>Queue Dashboard</Link></li>
						<li><Link to={`/${userType}/${userId}/parties/add`}>Add Customer</Link></li>
						<li><a href="#" onClick={logOut}>Log Out</a></li>
					</ul>
				</div>
			</nav>
		</header>
	// if not logged in, render this:
	) : (

		<header>
			<nav>
				<div className="nav-wrapper">
					<Link to="/" id="logo"><img src="/assets/images/brand_smaller.png"/></Link>
					<a href="#" data-activates="slide-out" className="button-collapse right hide-on-med-and-up">
						<i className="material-icons">menu</i>
					</a>
					<div className="brand-logo center">WELCOME</div>
					<ul id="nav-mobile" className="right hide-on-small-only">
						<li><a href="#" onClick={logIn}>Sign In</a></li>
					</ul>
					<ul className="side-nav hide-on-med-and-up" id="slide-out">
						<li><img src="/assets/images/brand_small.png" className="slide-out-brand"/></li>
						<li><a href="#" onClick={logIn}>Sign In</a></li>
					</ul>
				</div>
			</nav>
		</header>
	) // end of return
); // end of Header

// exports Header component for other files to use
export default Header;