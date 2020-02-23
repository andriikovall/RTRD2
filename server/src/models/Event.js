const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const eventSchema = new Schema({
    name: String,
    bio: String,
    author: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },
    vote: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    sponsors: [{
        user: {
            ref: 'users',
            type: Schema.Types.ObjectId,
        },
        cost: {
            type: Number,
            default: 0,
        },
    }],
    region: String,
    date: String,
});

module.exports = mongoose.model('events', eventSchema);