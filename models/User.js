const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    // purpose of this is to define the username field
    username: {
        // type is a a mongoose data type
        type: String,
        // unique is a mongoose validator ensuring a username is unique
        unique: true,
        // required is a mongoose validator ensuring a username is required
        required: true,
        // trim is a mongoose middleware to remove whitespace
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate is a mongoose validator to define constraints
        validate: {
            // validator is a function that takes in a value
            validator: function(v) {
                // returns true if the value is a valid email using regex
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            }
        }
    },
    thoughts: [{
        // grabs the id of the schema's data type 
        type: Schema.Types.ObjectId,
        // references the Thought model
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    // toJSON is a mongoose middleware to define how the data is returned
    toJSON: {
        // virtuals is a mongoose option to include virtuals
        virtuals: true,
        // getters is a mongoose option to include getters
        getters: true
    },
    // prevent virtual from creating dublicate of _id as 'id'
    id: false
});

// virtual is a mongoose middleware to define virtuals
UserSchema.virtual('friendCount').get(function() {
    // returns the length of the friends array
    return this.friends.length;
})

// creates a variable to hold the User model
const User = model('User', UserSchema);

module.exports = User;