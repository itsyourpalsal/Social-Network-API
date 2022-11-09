	// modules to require
	const express = require('express');
	const mongoose = require('mongoose');


	const app = express();
	const PORT = process.env.PORT || 5001;

	// express middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// use the routes folder for routing
	app.use(require('./routes'));

	// connect to mongoose
	mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {

		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	// ('debug', true) logs  the mongoose queries to the console
	mongoose.set('debug', true);

	// listen on the port
	app.listen(PORT, () => console.log(`Connected to Social-Network-API on http://localhost:${PORT}/`));