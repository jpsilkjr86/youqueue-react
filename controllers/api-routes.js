// imports yqh helper object
const yqh = require('../helpers/youqueue-helpers.js');

// exports as function which takes in app as parameter
module.exports = app => {
	// get route for retrieving all active parties for a restaurant by its id
	app.get('/restaurant/:id/parties/all', (req, res) => {
		console.log('FINDING ALL PARTIES FOR RESTAURANT ID ' + req.params.id);
		// if (req.user._id !== req.params.id) {
			// console.log('ACCESS DENIED - RESTAURANT ID DOES NOT MATCH USER ID')
			// return res.send('Permission denied.');
		// }
		yqh.db.getAllParties(req.params.id).then(results => {
			console.log(results.length + ' PARTIES FOUND. SENDING BACK TO USER...');
			res.json(results);
		}).catch(err => {
			console.log('ERROR RETRIEVING PARTIES (SEE LOG)');
			res.send('Server error: unable to retrive parties data');
		});
	});

	app.get('/test/seedparties', (req, res) => {
		yqh.db.seedParties('test').then(data => {
			res.json(data);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});
};