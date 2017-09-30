// ================ Dependencies ================
const express = require('express'),
	bodyParser = require('body-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  yqh = require('./helpers/youqueue-helpers.js');

// sets up express app
const app = express();
const port = process.env.PORT || 3000;

// ================ Mongoose Configuration ================
// configures mongoose promises to ES6 Promises
mongoose.Promise = Promise;
// first checks to see if production environment variable exists
if (process.env.PROD_MONGODB) {
  // if so, connects to mlab uri that is saved in env variable
  console.log('CONNECTING TO MONGODB IN PRODUCTION MODE...');
  mongoose.connect(process.env.PROD_MONGODB, { useMongoClient: true });
} // else checks to see if config.json exists
else if (fs.existsSync('./config/config.json')){
  // if so, connects to mongodb according to uri that is saved in config.json
  console.log('CONNECTING TO MONGODB IN DEVELOPMENT MODE...');
  const URI = require('./config/config.json')['development']['uri'];
  mongoose.connect(URI, { useMongoClient: true });
} else {
  // if none of the above work then server throws an error
  throw new Error('ERROR: NO DATABASE URI SPECIFIED.');
}

// saves resulting connection as constable
const db = mongoose.connection;

// ================ Passport Configuration (User Authentication) ================
// creates youqueue helper object for easy db management
const dbHelper = yqh.createDatabaseHelper();

// Passport session setup
passport.serializeUser((user, done) => {
  console.log("serializing user " + user._id);
  done(null, user._id);
});
passport.deserializeUser((_id, done) => {
  console.log("deserializing user " + _id);
  dbHelper.getUser(_id).then(user => {
    done(null, user);
  }).catch(err => {
    done(err);
  });
});

// sets up sign-in LocalStrategy within Passport
passport.use('local-signin', new LocalStrategy({
    passReqToCallback : true, // allows us to pass back the request to the callback
    usernameField: 'email' // changes default 'username' to be 'email' instead
  }, (req, email, password, done) => {
    // calls youqueue loginAuth helper method
    yqh.loginAuth(email, password, req.params.usertype).then(response => {
      // early returns if no match
      if (!response.emailMatch) {
        console.log('USER NOT FOUND:', email);
        return done(null, false);
      } // early returns if password doesn't match
      if (!response.pwMatch) {
        console.log("PASSWORD DOESN'T MATCH", email);
        return done(null, false);
      }
      if (!response.user) {
        console.log('UNABLE TO LOGIN USER');
        return done(null, false);
      }
      console.log('PASSWORD MATCHED! LOGGED IN AS USER:', email);
      done(null, response.user);
    }).catch(err => {
    console.log(err);
      console.log('SERVER ERROR - UNABLE TO SIGN IN USER');
      done(err);
    });
  } //end of passport callback
)); // end of local-signin

// sets up restaurant sign-up LocalStrategy within Passport
passport.use('local-restaurant-signup', new LocalStrategy({
    passReqToCallback : true, // allows us to pass back the request to the callback
    usernameField: 'email' // changes default 'username' to be 'email' instead
  }, (req, email, password, done) => {
    yqh.signupRestaurantAuth(email, password, req.body).then(response => {
      // early returns if user already exists
      if (response.accountExists) {
        console.log("USER ALREADY EXISTS:" + email);
        return done(null, false);        
      }
      if (!response.user) {
        console.log('UNABLE TO CREATE USER');
        return done(null, false);
      }
      console.log('ACCOUNT SUCCESSFULLY CREATED! SIGNED IN AS:', email);
      console.log('New User Data:');
      console.log(response.user);
      done(null, response.user);
    }).catch(err => {
      console.log(err);
      console.log('FAILED TO CREATE USER:', email);
      done(err);
    });
  } // end of passport callback
)); // end of passport.use

// ================ Express Configuration ================
// Configures Express and body parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// serves public directory as static, enabling html pages to link with their assets
app.use(express.static('public'));

// Passport, Session and cookieParser configuration with express instance
app.use(cookieParser());
app.use(session({secret: 'targetgumption', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// ============ Webpack Middleware Configurations (Development Only) ============
// first checks to make sure NODE_ENV is in development mode (ie not production mode)
if (process.env.NODE_ENV !== 'production') {
  console.log('NODE_ENV is in development mode.'
  	+ '\nConfiguring webpack-dev-middleware and webpack-hot-middleware...');

  // dependendies for webpack middleware
  const webpack = require('webpack'),
  	webpackDevMiddleware = require('webpack-dev-middleware'),
  	webpackHotMiddleware = require('webpack-hot-middleware'),
  	config = require('./webpack.dev.js');
  const compiler = webpack(config);

  // webpack-dev-middleware emits files compiled by webpack to a live server.
  // webpack-hot-middleware allows hot reload of webpack with express server (just refresh page).
  // more info about webpack-dev-middleware at:
  // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
  // https://github.com/webpack/webpack-dev-middleware
  // for info on integrating hot-middleware and dev-middleware see section "Server" at:
  // https://ditrospecta.com/javascript/react/es6/webpack/heroku/2015/08/08/deploying-react-webpack-heroku.html

  // configures webpack middlewares in development mode
  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

// ================ Connection Establishment ================
// show any mongoose connection errors
db.on('error', function(error) {
 	console.log('Mongoose Error: ', error);
});

// attempts to establish connection to mongoose db
db.once('open', function() {
	console.log('Mongoose connection successful!');
	// listens to port for running server within mongoose connection callback
	app.listen(port, () => {
		console.log('App listening on port ' + port);
		// sets up routes
    require('./controllers/auth-routes.js')(app, passport);
		require('./controllers/api-routes.js')(app);
	});
});