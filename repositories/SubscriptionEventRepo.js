const SubscriptionEvent = require('../models/SubscriptionEvent');


module.exports.getMany = kw => new Promise( async (resolve, reject) => {
    try {
        const subscriptionEvents = await SubscriptionEvent.find({
            $or: [
                {
                    title: {
                        $regex: kw,
                        $options: 'i'
                    }
                },
                {
                    location: {
                        $regex: kw,
                        $options: 'i'
                    }
                },
                {
                    desciption: {
                        $regex: kw,
                        $options: 'i'
                    }
                },
            ]
        });

        resolve(subscriptionEvents);
    } catch (err) {
        reject(err);
    }
});

module.exports.getOne = _id => new Promise( async (resolve, reject) => {
    try {
        const subscriptionEvent = await SubscriptionEvent.findOne({_id});

        if (subscriptionEvent) {
            resolve(subscriptionEvent);
        } else {
            reject("No Subscription Event found");
        }
    } catch(err) {
        reject("Wrong id");
    }
});

module.exports.getManyBySubscription = subscriptionId => new Promise( async (resolve, reject) => {
    try {
        const subscriptionEvent = await SubscriptionEvent.find({
            ownerSubscriptionId: subscriptionId
        });

        if (subscriptionEvent) {
            resolve(subscriptionEvent);
        } else {
            reject("No Subscription Event found");
        }
    } catch(err) {
        reject("Wrong id");
    }
});
