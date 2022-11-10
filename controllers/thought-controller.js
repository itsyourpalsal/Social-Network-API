const { Thought, User } = require('../models');

const thoughtController = {
    // create a new thought using the the body of the request
    createThought({ body }, res) {
        Thought.create(body)
            // the promise will return the thought that was created
            .then(({ _id }) => {
                // use the id of the thought 
                return User.findOneAndUpdate( // attached the thought to user
                    // find the user by their id
                    { _id: body.userId },
                    // update the user with the thought id
                    { $push: { thoughts: _id } },
                    // return the user that was updated
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id! in create thought route' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id! in get thought by id route' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id! in update route' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id! in delete route' });
                    return;
                }
                return User.findOneAndUpdate({ thoughts: params.id }, { $pull: { thoughts: params.id } }, { new: true })
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'thought deleted, but no user associated with this thought in delete thought route' });
                            return;
                        }
                        res.json(dbUserData);
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: body } }, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id! in create reaction route' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { _id: params.reactionId } } }, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id! in delete reaction route' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
}


module.exports = thoughtController;