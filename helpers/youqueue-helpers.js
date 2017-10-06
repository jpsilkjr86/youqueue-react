// imports textmagic for promisified (thenable) server requests
const TMClient = require('textmagic-rest-client'),
			fs = require('fs'),
			bcrypt = require('bcryptjs');	

// imports database models
const mongoose = require('mongoose'),
	Party = require('../models/Party.js'),
	RestaurantUser = require('../models/RestaurantUser.js');

// instantiates object to be exported
const yqh = {
	// prototype for youqueue's dbHelper object
	dbHelperPrototype: {
		// gets all active parties that match a restaurant ID
		getAllParties(restaurant_id) {
			// returns thenable promise that resolves with retrieved parties
			return Party.find({restaurant_id: restaurant_id, is_active: true}).exec();
		}, // end of getAllParties()
		seedParties (restaurant_id) {
			testData = [{
				party_name: 'john doe party',
			  party_size: 3,
			  phone_number: 5555555555,
			  reserved_under: 'john doe',
			  email: 'john@j.com',
			  restaurant_id: restaurant_id
			},{
				party_name: 'jane doe party',
			  party_size: 4,
			  phone_number: 5555555555,
			  reserved_under: 'jane doe',
			  email: 'jane@j.com',
			  restaurant_id: restaurant_id
			},{
				party_name: 'smith party',
			  party_size: 5,
			  phone_number: 5555555555,
			  reserved_under: 'smith smithee',
			  email: 'smith@s.com',
			  restaurant_id: restaurant_id
			}];
			const promises = [];
			// testData.forEach((i, element) => {
			// 	const seed = new Party(element);
			// 	promises.push(seed.save());
			// });
			for (let i = 0; i < testData.length; i++) {
				const seed = new Party(testData[i]);
				promises.push(seed.save());
			}
			return Promise.all(promises);
		}, // end of seedParties()
		getPartyData(_id) {
			return Party.findById({_id}).exec();
		},
		addParty(newPartyData) {
			const newParty = new Party(newPartyData);
			return newParty.save();
		},
		deactivateParty(_id) {
			return Party.findOneAndUpdate({_id}, {is_active: false}, {new: true}).exec();
		},
		arrivedTable(_id) {
			return Party.findOneAndUpdate({_id}, {arrived_table: true}, {new: true}).exec();
		},
		alertedSMS(_id) {
			return Party.findOneAndUpdate({_id}, {alerted_sms: true}, {new: true}).exec();
		},
		undoDeactivate(_id) {
			return Party.findOneAndUpdate({_id}, {is_active: true}, {new: true}).exec();
		},
		undoArrived(_id) {
			return Party.findOneAndUpdate({_id}, {arrived_table: false}, {new: true}).exec();
		},
		ensurePartyExistsInRestaurant(restaurant_id, party_id) {
			// returns resolve(false) if either id is invalid
			const isValidId = mongoose.Types.ObjectId.isValid;
			if (!isValidId(restaurant_id) || !isValidId(party_id)) {
				return Promise.resolve(false);
			}
			return Party.findOne().where({_id: party_id}).exec().then(party => {
				if (!party) {
					return false;
				}
				// use .equals method to compare Object ID's
				// https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
				if (!party.restaurant_id.equals(restaurant_id)) {
					return false;
				}
				return true;
			});
		},
		getUser(_id) {
			// first checks restaurant user type (can add customer search later if user == null)
			return RestaurantUser.findById({_id}).exec();
		}
	}, // end of dbHelperPrototype
	// factory function for creating dbHelper object
	createDatabaseHelper() {
		return Object.create(yqh.dbHelperPrototype);
	}, // end of yqh.createDatabaseHelper()
	// factory function for creating YouQueueSMS helper object
	createYouQueueSMS() {
		// ======== 1: CONFIGURE TEXTMAGIC API ========
		let client;
		//first check to see if username and apikey exist in production environment
		if (process.env.TEXTMAGIC_USERNAME && process.env.TEXTMAGIC_APIKEY) {
		  //if so, configure TMClient accordingly
		  console.log('CONFIGURING TEXTMAGIC IN PRODUCTION MODE');
		  const { TEXTMAGIC_USERNAME, TEXTMAGIC_APIKEY } = process.env;
		  client = new TMClient(TEXTMAGIC_USERNAME, TEXTMAGIC_APIKEY);
		} // else check to see if config.json has TextMagic credentials
		else if (fs.existsSync('./config/config.json')){
		  //configure TMClient using development-mode data
		  console.log('CONFIGURING TEXTMAGIC IN DEVELOPMENT MODE');
		  const { username, apikey } = require('../config/config.json')["textmagic"];
		  client = new TMClient(username, apikey);
		} else {
		  // if none of the above work then throws an error
		  throw new Error('ERROR: SMS API UNABLE TO CONFIGURE.');
		}
		// ======== 2: SET UP YOUQUEUE-SMS PROTOTYPE ========
		youQueueSMSPrototype = {
			send(message, phone_number) {
				return new Promise( (resolve, reject) => {
					client.Messages.send({text: message, phones: 1 + phone_number}, (err, res_sms) => {
						if (err) {
							return reject(err);
						}
						resolve(res_sms);
					});
				});
			}
		};
		// ======== 3: RETURN SMS HELPER OBJECT ========
		return Object.create(youQueueSMSPrototype);
	}, // end of yqh.createYouQueueSMS()
	// user login authentication helper function
	loginAuth(email, password, usertype) {
		// returns a promise that resolves w/ status and user object, or rejects w/ error
		return new Promise( (resolve, reject) => {
			// declares query as mongoose promise that depends on usertype
			let query;
			if (usertype === 'restaurant') {
				query = RestaurantUser.where({email}).findOne().exec();
			} else {
				// early returns a promise rejection if usertype doesn't match
				return reject('Error: no usertype specified, or usertype does not match');
			}
			// executes query
			query.then(user => {				
				// if no result is found, early returns resolve with data object
				if (user == null) {
					return resolve({emailMatch: false, pwMatch: false, user: null});
				}
				// saves db's encrypted password as locally scoped constable
				const hash = user.password;
				// uses bcrypt to see if password matches hash. if so, resolves with user
				if (bcrypt.compareSync(password, hash)) {
					return resolve({emailMatch: true, pwMatch: true, user: user});
				}
				// if loginAuth reaches this point, it must mean the password doesn't match
				resolve({emailMatch: true, pwMatch: false, user: null});
			}).catch(err => {
				reject(err);
			}); // end of .findOne callback
		}); // end of returned promise
	}, // end of yqh.loginAuth
	// user signup authentication helper function
	signupRestaurantAuth(email, password, userInput) {
		// returns a promise that resolves w/ status & new user object, or rejects w/ error
		return new Promise( (resolve, reject) => {
			// first searches to see if username exists in database
			RestaurantUser.where({email}).findOne().exec().then(user => {
				// if user exists, resolve with null user and response msg
				if (user != null) {
					return resolve({accountExists: true, user: null});
				}
				// instantiates locally scoped userData from userInput; encrypts password
				const hash = bcrypt.hashSync(password, 8);
				const userData = {
					email: email,
					password: hash,
					first_name: userInput.first_name,
					last_name: userInput.last_name,
					restaurant_name: userInput.restaurant_name,
					phone_number: userInput.phone_number,
					default_sms: userInput.default_sms
				};
				const newRestaurantUser = new RestaurantUser(userData);
				// saves new user into database
				return newRestaurantUser.save();
			}).then(userDoc => {
				resolve({accountExists: false, user: userDoc});
			}).catch(err => {
				reject(err);
			});
		}); // end of returned promise
	} // end of yqh.signupRestaurantAuth
}; // end of yqh

// exports youqueue helpers object
module.exports = yqh;