// imports textmagic for promisified (thenable) server requests
const TMClient = require('textmagic-rest-client'),
			fs = require('fs');	

// imports database models
const Party = require('../models/Party.js');

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
					client.Messages.send({text: message, phones: phone_number}, (err, res_sms) => {
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
	} // end of yqh.createYouQueueSMS()
}; // end of yqh

// exports youqueue helpers object
module.exports = yqh;