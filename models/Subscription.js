const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subscription = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    ownerAccountId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('subscription', Subscription);
