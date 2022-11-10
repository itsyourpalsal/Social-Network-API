const { Schema, model, Types } = require('mongoose');
// helper fundtion to format the date
const dateFormat = require('../utils/dateFormat');


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        // mongoose types of date
        type: Date,
        // sets the default value to the current date 
        default: Date.now,
        // get is a mongoose virtual, this one is set to format the date
        get: createdAtVal => dateFormat(createdAtVal)
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});


const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        // min is a mongoose validator to define constraints
        min: 1,
        // max is a mongoose validator to define constraints
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;