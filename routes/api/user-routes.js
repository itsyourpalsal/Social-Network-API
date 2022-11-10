		const router = require('express').Router();
		// object to hold all the routes
		const { getAllUsers, createUser, getUserById, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user-controller');


		//  /api/users
		router.route('/')
			.get(getAllUsers)
			.post(createUser);

		//  /api/users/:id
		router.route('/:id')
			.get(getUserById)
			.put(updateUser)
			.delete(deleteUser);

		// add a new friend /api/users/:userId/friends/:friendId
		router.route('/:id/friends/:friendsId')
			.post(addFriend)
			.delete(removeFriend);




		module.exports = router;