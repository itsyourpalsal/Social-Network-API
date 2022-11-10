	// modules required for this controller
	const { User } = require('../models');

	// controller holding all the logic for the routes
	const userController = {
		// create a new user using the the body of the request
		createUser({ body }, res) {
			// create a new user using the body of the request
			User.create(body)
				// the promise will return the user that was created
				.then(dbUserData => res.json(dbUserData))
				// if an error log it to the console and send it to the client
				.catch(err => {
					console.log(err);
					res.status(500).json(err);
				})
		},

		// get all the users
		getAllUsers(req, res) {
			// method that will find all the users
			User.find({})
				// the promise will return the users that were found
				.then(dbUserData => res.json(dbUserData))
				// if an error log it to the console and send it to the client
				.catch(err => {
					console.log(err);
					res.status(500).json(err);
				})
		},
		// get a user by their id using the params of the request
		getUserById({ params }, res) {
			// method that will find a user by their id using the params of the request
			User.findOne({ _id: params.id })
				// populate the friends of the user
				.populate('friends')
				// populate the thoughts of the user
				.populate({
					// the path is the name of the model that we want to populate
					path: 'thoughts',
					// the select is the fields that we want to return
					select: '-__v', // -__v is the field that we want to exclude
				})
				// .select will return the fields that we want to return
				.select('-__v')
				// the promise will return the user that was found
				.then(dbUserData => {
					// if there is no user with this id
					if (!dbUserData) {
						// send a 404 status code and a message to the client
						res.status(404).json({ message: 'No user found with this id! in get user by id route' });
						// stop the function
						return;
					}
					// send the user data to the client
					res.json(dbUserData);
				})
				// if an error log it to the console and send it to the client
				.catch(err => {
					console.log(err);
					res.status(500).json(err);
				})
		},
		// update the user using the body and params of the request
		updateUser({ params, body }, res) {
			// new: true will return the updated user 
			User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }) // runValidators: true will run the validators on the model
				.then(dbUserData => {
					if (!dbUserData) {
						res.status(404).json({ message: 'No user found with this id! in update route' });
						return;
					}
					res.json(dbUserData);
				})
				.catch(err => {
					console.log(err);
					res.status(500).json(err);
				})
		},

		deleteUser({ params }, res) {
			User.findOneAndDelete({ _id: params.id })
				.then(dbUserData => {
					if (!dbUserData) {
						res.status(404).json({ message: 'No user found with this id! in delete route' });
						return;
					}
					res.json(dbUserData);
				})
				.catch(err => {
					console.log(err);
					res.status(500).json(err);
				})
		},

		addFriend({ params }, res) {
			// $addToSet will add the friend to the array if it doesn't already exist
			User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendsId } }, { new: true })
				.then(dbUserData => {
					if (!dbUserData) {
						res.status(404).json({ message: 'No user found with this id! in add friend route' });
						return;
					}
					res.json(dbUserData);
				})
				.catch(err => {
					console.log(err);
					res.status(500).json(err);
				})
		},

		removeFriend({ params }, res) {
			// $pull will remove the friend from the array if it exists
			User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendsId } }, { new: true })
				.then(dbUserData => {
					if (!dbUserData) {
						res.status(404).json({ message: 'No user found with this id! in remove friend route' });
						return;
					}
					res.json(dbUserData);
				})
				.catch(err => {
					console.log(err);
					res.status(500).json(err);
				})
		}
	}

	module.exports = userController;