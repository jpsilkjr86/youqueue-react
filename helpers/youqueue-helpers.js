// imports axios for promisified (thenable) server requests
const axios = require('axios');

// imports database models
const Party = require('../models/Party.js');

// instantiates object to be exported
const yqh = {
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
		deactivateParty(_id) {
			return Party.findOneAndUpdate({_id}, {is_active: false}, {new: true}).exec();
		},
		arrivedTable(_id) {
			return Party.findOneAndUpdate({_id}, {arrived_table: true}, {new: true}).exec();
		},
		alertedSMS(_id) {
			return Party.findOneAndUpdate({_id}, {alerted_sms: true}, {new: true}).exec();
		}
	}, // end of dbHelperPrototype
	// factory function for creating dbHelper object
	createDatabaseHelper() {
		return Object.create(yqh.dbHelperPrototype);
	} // end of yqh.createDatabaseHelper()
}; // end of yqh

// exports youqueue helpers object
module.exports = yqh;