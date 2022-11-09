const router = require('express').Router();
// object to hold all the routes
const { getAllThoughts, createThought, getThoughtById, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thought-controller');

//  create thought /api/thoughts
router.route('/').post(createThought);

// get all thoughts /api/thoughts
router.route('/').get(getAllThoughts);

// get thought by id /api/thoughts/<thought_id>
router.route('/:id').get(getThoughtById);

// update thought /api/thoughts/<thought_id>
router.route('/:id').put(updateThought);

// delete thought /api/thoughts/<thought_id>
router.route('/:id').delete(deleteThought);

//  get reactions for thoughts  /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// delete reaction for thoughts  /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;