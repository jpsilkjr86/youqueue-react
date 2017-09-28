// imports youqueue helpers object (yqh = youqueue helpers)
const yqh = require('../helpers/youqueue-helpers.js');
// creates youqueue helper objects: for db management and sms messaging
const dbHelper = yqh.createDatabaseHelper();
const youQueueSMS = yqh.createYouQueueSMS();

console.log(youQueueSMS);

// exports as function which takes in app as parameter
module.exports = app => {
	// get route for retrieving all active parties for a restaurant by its id
	app.get('/restaurant/:id/parties/all', (req, res) => {
		console.log('FINDING ALL PARTIES FOR RESTAURANT ID ' + req.params.id);
		// if (req.user._id !== req.params.id) {
			// console.log('ACCESS DENIED - RESTAURANT ID DOES NOT MATCH USER ID')
			// return res.send('Permission denied.');
		// }
		dbHelper.getAllParties(req.params.id).then(results => {
			console.log(results.length + ' PARTIES FOUND. SENDING BACK TO USER...');
			res.json(results);
		}).catch(err => {
			console.log('ERROR RETRIEVING PARTIES (SEE LOG)');
			res.send('Server error: unable to retrive parties data');
		});
	});

	// route for seeding parties for testing & development
	app.get('/test/seedparties', (req, res) => {
		dbHelper.seedParties('test').then(data => {
			res.json(data);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});

	// route for getting party data by id
	app.get('/party/:id', (req, res) => {
		dbHelper.getPartyData(req.params.id).then(partyData => {
			res.json(partyData);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});

	// route for posting arrived_table = true
	app.post('/party/:id/arrive_table', (req, res) => {
		dbHelper.arrivedTable(req.params.id).then(newDoc => {
			res.json(newDoc);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});

	// route for alerting sms
	app.post('/party/:id/alert_sms', (req, res) => {
		dbHelper.alertedSMS(req.params.id).then(newDoc => {
			res.json(newDoc);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});

	// route for posting is_active = false
	app.post('/party/:id/deactivate', (req, res) => {
		dbHelper.deactivateParty(req.params.id).then(newDoc => {
			res.json(newDoc);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});

	// route for undoing deactivate
	app.post('/party/:id/deactivate/undo', (req, res) => {
		dbHelper.undoDeactivate(req.params.id).then(newDoc => {
			res.json(newDoc);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});

	// route for undoing arrived table
	app.post('/party/:id/arrive_table/undo', (req, res) => {
		dbHelper.undoArrived(req.params.id).then(newDoc => {
			res.json(newDoc);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});

	// route for adding the party***********
	app.post('/restaurant/:id/parties/add', (req, res) => {
		dbHelper.addParty(req.body).then(newDoc => {
			res.json(newDoc);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});

	// route for testing SMS
	app.post('/test/sms', (req, res) => {
		// test text message method
		youQueueSMS.send('test test', '14803885693').then(response => {
			console.log(response);
			res.json(response);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});
	});
};