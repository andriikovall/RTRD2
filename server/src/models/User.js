const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    visitedEvents: [{
        ref: 'events',
        type: Schema.Types.ObjectId,
        default: [],
    }],
    email: String,
    firstName: String,
    lastName: String,
    telegram: String,
    role: String,
    totalDonation: Number,
});

module.exports = mongoose.model('users', userSchema);