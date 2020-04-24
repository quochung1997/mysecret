const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    birth: {
        type: Date,
    },
    listSubscriptionIds: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('account', Account);
