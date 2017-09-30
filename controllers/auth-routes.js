// exports as a function which takes in express app and passport parameters
module.exports = (app, passport) => {
	// route for signing in. authenticates with passport local strategy 'local-signin'
	app.post('/login/:usertype', (req, res, next) => {
	  passport.authenticate('local-signin', (err, user, info) => {
	    if (err) {
	    	console.log(err);
	    	return next(err);
	    }
	    if (!user) {
	    	return res.json({loginSuccess: false, user: null, flash: info});
	    }
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				console.log('AUTH ROUTE LOGIN SUCCESS');
		    console.log(user);
		    res.json({loginSuccess: true, user: user, flash: info});
			});
	  })(req, res, next);
	});

	// route for signing up new users. authenticates w/ passport local strategy 'local-restaurant-signup'
	app.post('/signup/restaurant', (req, res, next) => {
	  passport.authenticate('local-restaurant-signup', (err, user, info) => {
	    if (err) {
	    	console.log(err);
	    	return next(err);
	    }
	    if (!user) {
	    	return res.json({signupSuccess: false, user: null, flash: info});
	    }
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				console.log('AUTH ROUTE SIGNUP SUCCESS');
		    console.log(user);
		    res.json({signupSuccess: true, user: user, flash: info});
			});
	  })(req, res, next);
	});

	// logs user out of site
	app.post('/logout', (req, res) => {
		if (req.user) {
			let email = req.user.email;
			console.log("LOGGING OUT " + email);
			req.logout();
			return res.json({logoutSuccess: true, user: null, flash: {message: 'Log out successful!'}});
		}
		res.json({logoutSuccess: true, user: null, flash: {message: 'Unable to log out: no user was logged in'}});
	});

	// get route for checking to see if there is an existing login session
	app.get('/login/checkauth', (req, res) => {
		console.log('USER REQUESTING AUTHENTICATION STATUS');
		if (!req.user) {
			console.log('NOT LOGGED IN. SENDING FALSE.');
			return res.json({isLoggedIn: false, user: null});
		}
		console.log('USER LOGGED IN AS ' + req.user.email + '. SENDING TRUE AND USER OBJECT.');
		res.json({isLoggedIn: true, user: req.user, flash: {message: `Welcome back, ${req.user.restaurant_name}!`}});
	});
};