const Account = require('../models/Account');
const Subscription = require('../models/Subscription');
const SubscriptionEvent = require('../models/SubscriptionEvent');

module.exports.checkEventWrite = async (eventId, accountId) => {
    try {
        const event = await SubscriptionEvent.findById({ _id: eventId });
        const subsciption = await Subscription.findById({ _id: event.ownerSubscriptionId });

        if (subsciption.ownerAccountId == accountId) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

module.exports.checkEventCreate = async (subsciptionId, accountId) => {
    console.log(subsciptionId);
    try {
        const subscription = await Subscription.findById({ _id: subsciptionId });
        console.log(subscription);
        if (subscription.ownerAccountId == accountId) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}
