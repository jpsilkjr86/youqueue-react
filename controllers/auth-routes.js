// exports as a function which takes in express app and passport parameters
module.exports = (app, passport) => {
	// route for signing in. authenticates with passport local strategy 'local-signin'
	app.post('/login/:usertype', (req, res) => {
	  passport.authenticate('local-signin', (err, user, info) => {
	    if (err) {
	    	console.log(err);
	    	return res.json(err);
	    }
	    if (!user) {
	    	return res.json({loginSuccess: false, user: null});
	    }
	    console.log('AUTH ROUTE LOGIN SUCCESS');
	    console.log(user);
	    res.json({loginSuccess: true, user: user});
	  })(req, res);
	});

	// route for signing up new users. authenticates w/ passport local strategy 'local-restaurant-signup'
	app.post('/signup/restaurant', (req, res) => {
	  passport.authenticate('local-restaurant-signup', (err, user, info) => {
	    if (err) {
	    	console.log(err);
	    	return res.json(err);
	    }
	    if (!user) {
	    	return res.json({signupSuccess: false, user: null});
	    }
	    console.log('AUTH ROUTE SIGNUP SUCCESS');
	    console.log(user);
	    res.json({signupSuccess: true, user: user});
	  })(req, res);
	});
};