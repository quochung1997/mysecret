const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionEvent = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "No Location"
    },
    description: {
        type: String,
        default: "No Description"
    },
    start: {
        type: Number,
        default: 0
    },
    end: {
        type: Number,
        default: 0
    },
    allDay: {
        type: Boolean,
        default: false
    },
    timeZone: {
        type: String,
        default: "VN"
    },
    ownerSubscriptionId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('subscription_event', SubscriptionEvent);
