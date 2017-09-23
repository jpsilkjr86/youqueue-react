// imports axios for promisified (thenable) server requests
const axios = require('axios');

// imports database models
const Party = require('../models/Party.js');

// instantiates object to be exported
const yqh = {
	// database sub-object
	db: {
		// gets all active parties that match a restaurant ID
		getAllParties: restaurant_id => {
			// returns thenable promise that resolves with retrieved parties
			return Party.find({restaurant_id: restaurant_id, is_active: true}).exec();

			// // returns thenable promise that resolves with retrieved parties
			// return new Promise ( (resolve, reject) => {
			// 	Party.find({restaurant_id: restaurant_id, is_active: true}).exec
			// 	.then(results => {
			// 		resolve(results);
			// 	}).catch(err => {
			// 		reject(err);
			// 	})
			// end of returned promise
		}, // end of yqh.db.getAllParties
		seedParties: restaurant_id => {
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
		}
	} // end of yqh.db
};

module.exports = yqh;